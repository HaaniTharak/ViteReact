import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Heart, Share } from 'lucide-react';
import { DrumstickRating } from './DrumstickRating';
import { toast } from 'sonner@2.0.3';

interface FoodDeal {
  id: string;
  dealName: string;
  restaurantName: string;
  cuisine: string;
  image: string;
  rating: number;
  distance: number;
  offer: string;
  originalPrice: number;
  discountedPrice: number;
  description: string;
  ingredients?: string[];
  category: string;
  priceLevel: string;
  address: string;
  expirationDate: string;
  daysUntilExpiration: number;
}

interface DealCardProps {
  deal: FoodDeal;
  onTap: (deal: FoodDeal) => void;
  isFavorite: boolean;
  onToggleFavorite: (dealId: string) => void;
}

export function DealCard({ deal, onTap, isFavorite, onToggleFavorite }: DealCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    onToggleFavorite(deal.id);
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking share
    
    const shareData = {
      title: `${deal.dealName} - ${deal.restaurantName}`,
      text: `Check out this amazing deal: ${deal.dealName} for $${deal.discountedPrice} (originally $${deal.originalPrice}) at ${deal.restaurantName}!`,
      url: `${window.location.origin}/deal/${deal.id}`
    };

    const shareText = `${shareData.text} ${shareData.url}`;
    
    try {
      // Use modern Clipboard API
      await navigator.clipboard.writeText(shareText);
      
      // Show success toast
      toast('Link Copied!', {
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        textArea.remove();
        
        toast('Link Copied!', {
          duration: 2000,
        });
      } catch (fallbackError) {
        textArea.remove();
        console.error('Fallback copy failed:', fallbackError);
        toast('Failed to copy link', {
          duration: 2000,
        });
      }
    }
  };

  const handleCardClick = () => {
    onTap(deal);
  };

  return (
    <div 
      className="bg-card rounded-lg overflow-hidden shadow-sm border border-border cursor-pointer transition-all duration-200 active:scale-95"
      onClick={handleCardClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={deal.image}
          alt={deal.dealName}
          className="w-full h-48 object-cover"
        />
        
        {/* Expiration info in top left */}
        <div className="absolute top-3 left-3">
          <div className="bg-black/70 rounded-lg px-2 py-1 backdrop-blur-sm">
            <p className="text-white text-xs font-medium">Ending in {deal.daysUntilExpiration} days</p>
            <p className="text-white text-xs">Expires {deal.expirationDate}</p>
          </div>
        </div>
        
        {/* Rating and price level in top right */}
        <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2 py-1 flex items-center gap-2">
          <DrumstickRating 
            rating={deal.rating} 
            size="sm" 
            showValue={true}
            className="text-white"
          />
          <div className="text-white text-sm font-medium">
            {deal.priceLevel}
          </div>
        </div>
        
        {/* Share and Heart buttons in bottom right */}
        <div className="absolute bottom-3 right-3 flex gap-2 z-10">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full w-8 h-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white/100 pointer-events-auto"
            onClick={handleShareClick}
          >
            <Share className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full w-8 h-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white/100 pointer-events-auto"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-foreground mb-1">{deal.dealName}</h3>
            <p className="text-muted-foreground text-sm">{deal.restaurantName} • {deal.cuisine}</p>
          </div>
          <div className="text-right">
            <p className="text-foreground font-medium">${deal.discountedPrice}</p>
            <p className="text-muted-foreground text-sm line-through">${deal.originalPrice}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{deal.description}</p>
        
        <div className="flex items-center text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{deal.distance} miles • {deal.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}