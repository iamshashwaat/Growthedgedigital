export function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Radiating lines (top half, fan pattern) */}
      {Array.from({ length: 13 }).map((_, i) => {
        const angle = -90 + (i - 6) * 10;
        const rad = (angle * Math.PI) / 180;
        const x1 = 70 + Math.cos(rad) * 42;
        const y1 = 60 + Math.sin(rad) * 42;
        const x2 = 70 + Math.cos(rad) * 62;
        const y2 = 60 + Math.sin(rad) * 62;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F5A623"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      {/* Eye shape */}
      <path
        d="M20 75 C20 75 45 45 70 45 C95 45 120 75 120 75 C120 75 95 105 70 105 C45 105 20 75 20 75Z"
        fill="#F5A623"
      />
      {/* Pupil */}
      <circle cx="70" cy="75" r="16" fill="white" />
      <circle cx="70" cy="75" r="9" fill="#F5A623" />
    </svg>
  );
}
