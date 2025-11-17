import { DrumstickIcon } from './DrumstickIcon';

interface DrumstickRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function DrumstickRating({ 
  rating, 
  maxRating = 4, 
  size = 'md', 
  showValue = true, 
  className = "" 
}: DrumstickRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const iconSize = sizeClasses[size];
  
  // Convert 5-star rating to 4-drumstick rating
  const drumstickRating = Math.round((rating / 5) * maxRating);
  const clampedRating = Math.max(0, Math.min(drumstickRating, maxRating));

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => (
          <DrumstickIcon
            key={index}
            className={`${iconSize} ${index < clampedRating ? 'text-amber-500' : 'text-gray-300'}`}
            filled={index < clampedRating}
          />
        ))}
      </div>
      {showValue && (
        <span className={`${size === 'sm' ? 'text-sm' : 'text-sm'} ml-1`}>
          {rating}
        </span>
      )}
    </div>
  );
}