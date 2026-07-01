import { useEffect, useRef, useState } from 'react';
import type { Coords } from '../types/game';
import { loadMapsApi } from '../utils/mapsLoader';
import { DARK_MAP_STYLE } from '../utils/mapStyle';
import { coordsToPercent } from '../utils/mapProjection';
import { WorldMap } from './WorldMap';

type ResultMapProps = Readonly<{
  answer: Coords;
  guess: Coords | null;
}>;

export function ResultMap({ answer, guess }: ResultMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const answerMarkerRef = useRef<google.maps.Marker | null>(null);
  const guessMarkerRef = useRef<google.maps.Marker | null>(null);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const [fallbackActive, setFallbackActive] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    setIsMapLoading(true);
    const electronWindow = globalThis as Window & typeof globalThis;
    if (!electronWindow.electronAPI?.mapsApiKey) {
      setFallbackActive(true);
      setIsMapLoading(false);
      return;
    }

    let cancelled = false;
    let tileReady = false;
    let watchdog: ReturnType<typeof setTimeout> | null = null;
    let tilesListener: google.maps.MapsEventListener | null = null;

    void loadMapsApi()
      .then((maps) => {
        if (cancelled || !containerRef.current) return;
        setFallbackActive(false);

        if (!mapRef.current) {
          mapRef.current = new maps.Map(containerRef.current, {
            center: { lat: answer.lat, lng: answer.lng },
            zoom: 4,
            disableDefaultUI: true,
            gestureHandling: 'none',
            styles: DARK_MAP_STYLE,
            backgroundColor: '#1a1f2c',
          });
        }

        const map = mapRef.current;
        if (tilesListener) {
          tilesListener.remove();
          tilesListener = null;
        }
        tilesListener = map.addListener('tilesloaded', () => {
          tileReady = true;
          setFallbackActive(false);
          setIsMapLoading(false);
          if (watchdog) {
            clearTimeout(watchdog);
            watchdog = null;
          }
        });
        watchdog = setTimeout(() => {
          if (!cancelled && !tileReady) {
            setFallbackActive(true);
            setIsMapLoading(false);
          }
        }, 3000);

        // Clear previous markers and polyline
        if (answerMarkerRef.current) {
          answerMarkerRef.current.setMap(null);
          answerMarkerRef.current = null;
        }
        if (guessMarkerRef.current) {
          guessMarkerRef.current.setMap(null);
          guessMarkerRef.current = null;
        }
        if (polylineRef.current) {
          polylineRef.current.setMap(null);
          polylineRef.current = null;
        }

        // Answer marker (green)
        answerMarkerRef.current = new maps.Marker({
          position: { lat: answer.lat, lng: answer.lng },
          map,
          icon: {
            path: maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#22c55e',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        if (guess) {
          // Guess marker (orange)
          guessMarkerRef.current = new maps.Marker({
            position: { lat: guess.lat, lng: guess.lng },
            map,
            icon: {
              path: maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#f97316',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          // Polyline from guess to answer
          polylineRef.current = new maps.Polyline({
            path: [
              { lat: guess.lat, lng: guess.lng },
              { lat: answer.lat, lng: answer.lng },
            ],
            map,
            strokeColor: '#ffffff',
            strokeOpacity: 0.5,
            strokeWeight: 2,
          });

          // Fit bounds to show both points
          const bounds = new maps.LatLngBounds();
          bounds.extend({ lat: answer.lat, lng: answer.lng });
          bounds.extend({ lat: guess.lat, lng: guess.lng });
          map.fitBounds(bounds, 60);
        } else {
          map.setCenter({ lat: answer.lat, lng: answer.lng });
          map.setZoom(4);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFallbackActive(true);
          setIsMapLoading(false);
        }
      });

    return () => {
      cancelled = true;
      if (watchdog) {
        clearTimeout(watchdog);
      }
      if (tilesListener) {
        tilesListener.remove();
      }
    };
  }, [answer, guess]);

  if (fallbackActive) {
    const answerPos = coordsToPercent(answer);
    const guessPos = guess ? coordsToPercent(guess) : null;

    return (
      <div className="relative h-full w-full overflow-hidden bg-resultBg">
        <WorldMap className="opacity-90" />
        <div
          className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{ left: `${answerPos.x}%`, top: `${answerPos.y}%` }}
        />
        {guessPos ? (
          <>
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              <line
                x1={`${guessPos.x}%`}
                y1={`${guessPos.y}%`}
                x2={`${answerPos.x}%`}
                y2={`${answerPos.y}%`}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
            </svg>
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${guessPos.x}%`, top: `${guessPos.y}%` }}
            >
              <div className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-guess/30" />
              <div className="relative h-3 w-3 rounded-full bg-guess ring-2 ring-guess/50" />
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-[#1a1f2c]">
      <div ref={containerRef} className="h-full w-full" />
      {isMapLoading ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45">
          <div className="flex items-center gap-3 rounded-lg bg-black/45 px-4 py-3 text-sm text-slate-100">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
            <span>Loading results map...</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
