export function GlobeLogo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden
      >
        <circle cx="20" cy="20" r="18" stroke="#4ADE80" strokeWidth="2" />
        <ellipse cx="20" cy="20" rx="8" ry="18" stroke="#4ADE80" strokeWidth="1.5" />
        <line x1="2" y1="20" x2="38" y2="20" stroke="#4ADE80" strokeWidth="1.5" />
        <path
          d="M4 12c6 4 12 6 16 6s10-2 16-6M4 28c6-4 12-6 16-6s10 2 16 6"
          stroke="#4ADE80"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <span className="text-4xl font-bold tracking-tight text-white">GeoQuest</span>
    </div>
  );
}
