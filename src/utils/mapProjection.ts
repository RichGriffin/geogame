import { geoEquirectangular } from 'd3-geo';
import type { Coords } from '../types/game';
import { MAP_HEIGHT, MAP_WIDTH, WORLD_MAP_ASPECT } from './mapConstants';

function createProjection(width: number, height: number) {
  return geoEquirectangular().fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    { type: 'Sphere' },
  );
}

function mapContentRect(rect: DOMRect) {
  const containerAspect = rect.width / rect.height;

  if (containerAspect > WORLD_MAP_ASPECT) {
    const height = rect.height;
    const width = height * WORLD_MAP_ASPECT;
    return {
      left: rect.left + (rect.width - width) / 2,
      top: rect.top,
      width,
      height,
    };
  }

  const width = rect.width;
  const height = width / WORLD_MAP_ASPECT;
  return {
    left: rect.left,
    top: rect.top + (rect.height - height) / 2,
    width,
    height,
  };
}

export function coordsToPercent(coords: Coords): { x: number; y: number } {
  const projection = createProjection(MAP_WIDTH, MAP_HEIGHT);
  const point = projection([coords.lng, coords.lat]);
  if (!point) return { x: 0, y: 0 };
  return {
    x: (point[0] / MAP_WIDTH) * 100,
    y: (point[1] / MAP_HEIGHT) * 100,
  };
}

export function percentToCoords(x: number, y: number): Coords {
  const projection = createProjection(MAP_WIDTH, MAP_HEIGHT);
  const coords = projection.invert?.([(x / 100) * MAP_WIDTH, (y / 100) * MAP_HEIGHT]);
  if (!coords) return { lat: 0, lng: 0 };
  return { lat: coords[1], lng: coords[0] };
}

export function clickToCoords(
  clientX: number,
  clientY: number,
  rect: DOMRect,
): Coords {
  const map = mapContentRect(rect);
  const x = ((clientX - map.left) / map.width) * 100;
  const y = ((clientY - map.top) / map.height) * 100;
  return percentToCoords(
    Math.max(0, Math.min(100, x)),
    Math.max(0, Math.min(100, y)),
  );
}

export { createProjection, MAP_HEIGHT, MAP_WIDTH };
