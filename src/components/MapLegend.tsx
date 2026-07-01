type MapLegendProps = {
  location: string;
};

export function MapLegend({ location }: MapLegendProps) {
  return (
    <div className="absolute left-6 top-6 z-10 rounded-xl bg-black/60 px-4 py-3 backdrop-blur-sm">
      <div className="flex flex-col gap-2 text-sm text-white">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-guess" />
          <span>Your guess</span>
        </div>
      </div>
    </div>
  );
}
