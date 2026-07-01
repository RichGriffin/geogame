import { useMemo } from 'react';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, Objects } from 'topojson-specification';
import countries from '../assets/countries-110m.json';
import { createProjection, MAP_HEIGHT, MAP_WIDTH } from '../utils/mapProjection';

type WorldMapProps = {
  className?: string;
};

type WorldTopology = Topology<{ countries: Objects<GeoJSON.GeometryCollection> }>;

export function WorldMap({ className = '' }: WorldMapProps) {
  const landPath = useMemo(() => {
    const projection = createProjection(MAP_WIDTH, MAP_HEIGHT);
    const path = geoPath(projection);
    const topology = countries as WorldTopology;
    const land = feature(topology, topology.objects.countries);
    if (!land) return '';
    return path(land) ?? '';
  }, []);

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#1a1f2c" />
      <path d={landPath} fill="#3d4f63" stroke="#526173" strokeWidth={0.35} />
    </svg>
  );
}
