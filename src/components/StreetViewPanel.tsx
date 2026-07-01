import { useEffect, useRef, useState } from 'react';
import type { Coords } from '../types/game';
import { loadMapsApi } from '../utils/mapsLoader';

type NavigationDirection = 'up' | 'down' | 'left' | 'right' | 'center';
type NavigationCommand = { direction: NavigationDirection; sequence: number } | null;
type Pov = { heading: number; pitch: number };

type StreetViewPanelProps = Readonly<{
  position: Coords;
  panoramaId?: string;
  defaultPov?: Pov;
  navigationCommand?: NavigationCommand;
  onReady?: () => void;
  onUnavailableChange?: (isUnavailable: boolean) => void;
}>;

function normalizeHeading(heading: number): number {
  return ((heading % 360) + 360) % 360;
}

function angularDistance(a: number, b: number): number {
  const delta = Math.abs(normalizeHeading(a) - normalizeHeading(b));
  return Math.min(delta, 360 - delta);
}

function resolveInitialPov(position: Coords, defaultPov?: Pov): Pov {
  if (defaultPov) return defaultPov;
  return {
    heading: normalizeHeading(position.lng * 10),
    pitch: 0,
  };
}

export function StreetViewPanel({
  position,
  panoramaId,
  defaultPov,
  navigationCommand,
  onReady,
  onUnavailableChange,
}: StreetViewPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const defaultPovRef = useRef<Pov>(resolveInitialPov(position, defaultPov));
  const lastSequenceRef = useRef<number>(0);
  const hasAutoFocusedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let listeners: google.maps.MapsEventListener[] = [];

    const getPanorama = (request: google.maps.StreetViewLocationRequest | google.maps.StreetViewPanoRequest) =>
      new Promise<{ data: google.maps.StreetViewPanoramaData | null; status: google.maps.StreetViewStatus }>(
        (resolve) => {
          const service = new google.maps.StreetViewService();
          service.getPanorama(request, (data, status) => {
            resolve({ data, status });
          });
        }
      );

    async function setupPanorama() {
      const container = containerRef.current;
      if (!container) return;

      setIsReady(false);
      setHasError(false);
      onUnavailableChange?.(false);
      defaultPovRef.current = resolveInitialPov(position, defaultPov);
      lastSequenceRef.current = 0;
      hasAutoFocusedRef.current = false;

      try {
        await loadMapsApi();
        if (cancelled) return;

        let targetPanoId: string | undefined = panoramaId;

        if (targetPanoId) {
          const panoResult = await getPanorama({ pano: targetPanoId });
          if (cancelled) return;
          if (panoResult.status !== google.maps.StreetViewStatus.OK || !panoResult.data?.location?.pano) {
            targetPanoId = undefined;
          } else {
            targetPanoId = panoResult.data.location.pano;
          }
        }

        if (!targetPanoId) {
          const coordinateResult = await getPanorama({ location: position });
          if (cancelled) return;
          if (coordinateResult.status !== google.maps.StreetViewStatus.OK || !coordinateResult.data?.location?.pano) {
            setHasError(true);
            onUnavailableChange?.(true);
            return;
          }
          targetPanoId = coordinateResult.data.location.pano;
        }

        const panorama = new google.maps.StreetViewPanorama(container, {
          pano: targetPanoId,
          pov: defaultPovRef.current,
          disableDefaultUI: true,
          keyboardShortcuts: true,
          clickToGo: true,
          linksControl: false,
          addressControl: false,
          fullscreenControl: false,
          motionTracking: false,
        });

        panoramaRef.current = panorama;
        listeners = [
          panorama.addListener('status_changed', () => {
            if (cancelled) return;
            const status = panorama.getStatus();
            const ok = status === google.maps.StreetViewStatus.OK;
            setIsReady(ok);
            setHasError(!ok);
            if (ok) {
              if (!hasAutoFocusedRef.current && containerRef.current) {
                containerRef.current.focus({ preventScroll: true });
                hasAutoFocusedRef.current = true;
              }
              onUnavailableChange?.(false);
              onReady?.();
            } else {
              onUnavailableChange?.(true);
            }
          }),
        ];
      } catch {
        if (cancelled) return;
        setHasError(true);
        onUnavailableChange?.(true);
      }
    }

    void setupPanorama();

    return () => {
      cancelled = true;
      for (const listener of listeners) {
        listener.remove();
      }
      panoramaRef.current = null;
    };
  }, [defaultPov, onReady, onUnavailableChange, panoramaId, position]);

  useEffect(() => {
    if (!navigationCommand) return;
    if (navigationCommand.sequence <= lastSequenceRef.current) return;
    lastSequenceRef.current = navigationCommand.sequence;

    const panorama = panoramaRef.current;
    if (!panorama) return;

    const currentPov = panorama.getPov();
    const heading = normalizeHeading(currentPov.heading ?? defaultPovRef.current.heading);
    const pitch = currentPov.pitch ?? defaultPovRef.current.pitch;

    const rotate = (delta: number) => {
      panorama.setPov({ heading: normalizeHeading(heading + delta), pitch });
    };

    const move = (targetHeading: number) => {
      const links = panorama.getLinks();
      if (!links.length) return;

      let bestLink = links[0];
      let smallestDiff = angularDistance(bestLink.heading ?? 0, targetHeading);

      for (const link of links) {
        const diff = angularDistance(link.heading ?? 0, targetHeading);
        if (diff < smallestDiff) {
          bestLink = link;
          smallestDiff = diff;
        }
      }

      if (bestLink.pano) {
        panorama.setPano(bestLink.pano);
      }
    };

    switch (navigationCommand.direction) {
      case 'up':
        move(heading);
        return;
      case 'down':
        move(heading + 180);
        return;
      case 'left':
        rotate(-25);
        return;
      case 'right':
        rotate(25);
        return;
      case 'center':
        panorama.setPov(defaultPovRef.current);
        return;
      default:
        return;
    }
  }, [navigationCommand]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full outline-none" tabIndex={-1} />
      {!isReady && !hasError ? (
        <div className="absolute inset-0 bg-black/30" />
      ) : null}
      {hasError ? (
        <div className="absolute inset-0 bg-black/70" />
      ) : null}
    </div>
  );
}
