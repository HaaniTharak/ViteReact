interface DrumstickIconProps {
  className?: string;
  filled?: boolean;
}

export function DrumstickIcon({ className = "w-4 h-4", filled = false }: DrumstickIconProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="1.5"
      className={className}
    >
      <path d="M8.5 14.5L7 16c-.7.7-1.5 1.3-2.5 1.3s-1.5-.5-1.5-1.5.6-1.8 1.3-2.5L6 11.5"/>
      <path d="M12.207 8.793a3 3 0 1 0-4.243 4.243l8.5 8.5a3 3 0 1 0 4.243-4.243l-8.5-8.5z"/>
      <circle cx="16" cy="8" r="2" fill={filled ? "currentColor" : "none"}/>
    </svg>
  );
}