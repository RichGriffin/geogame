import { useEffect, useRef } from 'react';
import type { Coords, Pin } from '../types/game';
import { loadMapsApi } from '../utils/mapsLoader';
import { DARK_MAP_STYLE } from '../utils/mapStyle';

type MiniMapProps = {
  pin: Pin;
  onPinPlace: (coords: Coords) => void;
};

export function MiniMap({ pin, onPinPlace }: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const onPinPlaceRef = useRef(onPinPlace);

  useEffect(() => {
    onPinPlaceRef.current = onPinPlace;
  }, [onPinPlace]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    let cancelled = false;

    loadMapsApi().then((maps) => {
      if (cancelled || !containerRef.current) return;

      const map = new maps.Map(containerRef.current, {
        center: { lat: 20, lng: 0 },
        zoom: 2,
        minZoom: 1,
        maxZoom: 8,
        styles: DARK_MAP_STYLE,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: 'greedy',
        backgroundColor: '#1a1f2c',
      });

      mapRef.current = map;

      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          onPinPlaceRef.current({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!pin) {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      return;
    }

    const position = { lat: pin.lat, lng: pin.lng };

    if (markerRef.current) {
      markerRef.current.setPosition(position);
    } else {
      markerRef.current = new google.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: '#f97316',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });
    }
  }, [pin]);

  return (
    <div className="w-[340px] h-[170px] overflow-hidden rounded-2xl bg-[#1a1f2c] shadow-2xl">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
