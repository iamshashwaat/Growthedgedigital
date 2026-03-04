export function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Rays */}
      <line x1="90" y1="10" x2="90" y2="30" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="30" x2="52" y2="45" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
      <line x1="140" y1="30" x2="128" y2="45" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="70" x2="38" y2="72" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="70" x2="142" y2="72" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="110" x2="45" y2="100" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
      <line x1="150" y1="110" x2="135" y2="100" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" />
      {/* Short diagonal rays */}
      <line x1="55" y1="20" x2="62" y2="35" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="125" y1="20" x2="118" y2="35" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="25" y1="50" x2="40" y2="55" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="155" y1="50" x2="140" y2="55" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bulb body */}
      <ellipse cx="90" cy="90" rx="45" ry="48" fill="#F5A623" />
      {/* Bulb highlight */}
      <ellipse cx="78" cy="78" rx="15" ry="18" fill="#FFD166" opacity="0.6" />
      {/* Base / screw */}
      <rect x="72" y="135" width="36" height="8" rx="2" fill="#8B8B8B" />
      <rect x="74" y="143" width="32" height="6" rx="2" fill="#737373" />
      <rect x="76" y="149" width="28" height="6" rx="2" fill="#8B8B8B" />
      <rect x="80" y="155" width="20" height="5" rx="2.5" fill="#737373" />
      {/* Filament lines inside */}
      <path d="M82 105 Q85 85 82 70" stroke="#D4890A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M98 105 Q95 85 98 70" stroke="#D4890A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M82 70 Q90 60 98 70" stroke="#D4890A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
