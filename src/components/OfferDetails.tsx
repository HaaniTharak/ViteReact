import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Phone, Heart, Share, Globe, ArrowLeft, Plus, Minus } from 'lucide-react';
import { CommentsSection } from './CommentsSection';
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

interface OfferDetailsProps {
  deal: FoodDeal;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  usageCount: number;
  onIncrementUsage: () => void;
  onDecrementUsage: () => void;
}

export function OfferDetails({ 
  deal, 
  onBack, 
  isFavorite, 
  onToggleFavorite,
  usageCount,
  onIncrementUsage,
  onDecrementUsage
}: OfferDetailsProps) {
  const handleShareClick = async () => {
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

  const handleDirectionsClick = () => {
    // Open directions in default maps app
    const mapsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(deal.address + ', Mission District, San Francisco')}`;
    window.open(mapsUrl, '_blank');
  };

  const handleWebsiteClick = () => {
    // Open restaurant website - using a placeholder URL since we don't have actual restaurant websites
    const websiteUrl = `https://www.${deal.restaurantName.toLowerCase().replace(/\s+/g, '')}.com`;
    window.open(websiteUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <ImageWithFallback
          src={deal.image}
          alt={deal.dealName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white/90 backdrop-blur-sm"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-black/70 rounded-lg px-2 py-1 backdrop-blur-sm">
            <p className="text-white text-xs font-medium">Ending in {deal.daysUntilExpiration} days</p>
            <p className="text-white text-xs">Expires {deal.expirationDate}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white/90 backdrop-blur-sm"
            onClick={handleShareClick}
          >
            <Share className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white/90 backdrop-blur-sm"
            onClick={onToggleFavorite}
          >
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </Button>
        </div>
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm">
            {deal.priceLevel}
          </Badge>
        </div>
      </div>
      
      <div className="px-4 py-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-medium text-foreground mb-2">{deal.dealName}</h1>
            <p className="text-muted-foreground mb-1">{deal.restaurantName}</p>
            <p className="text-muted-foreground text-sm">{deal.cuisine} cuisine</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-medium text-foreground">${deal.discountedPrice}</p>
            <p className="text-muted-foreground line-through">${deal.originalPrice}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <DrumstickRating 
            rating={deal.rating} 
            size="md" 
            showValue={true}
          />
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{deal.distance} miles away • {deal.address}</span>
          </div>
        </div>
        
        <p className="text-foreground mb-8 leading-relaxed">{deal.description}</p>
        
        <div className="flex gap-3 items-center">
          <div className="flex-1 flex items-center justify-center gap-3 p-3 border border-border rounded-lg">
            <span className="text-muted-foreground text-sm">Times used:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 rounded-full"
                onClick={onDecrementUsage}
                disabled={usageCount === 0}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="font-medium text-foreground min-w-8 text-center">{usageCount}</span>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 rounded-full"
                onClick={onIncrementUsage}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <Button 
            className="flex-1 rounded-full"
            onClick={handleDirectionsClick}
          >
            Get me Directions
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Phone className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={handleWebsiteClick}
          >
            <Globe className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CommentsSection dealId={deal.id} />
    </div>
  );
}