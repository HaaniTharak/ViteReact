import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';

interface RestaurantOffer {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  distance: number;
  deliveryTime: string;
  offer: string;
  originalPrice: number;
  discountedPrice: number;
  description: string;
}

interface RestaurantCardProps {
  offer: RestaurantOffer;
  onTap: (offer: RestaurantOffer) => void;
}

export function RestaurantCard({ offer, onTap }: RestaurantCardProps) {
  return (
    <div 
      className="bg-card rounded-lg overflow-hidden shadow-sm border border-border cursor-pointer transition-all duration-200 active:scale-95"
      onClick={() => onTap(offer)}
    >
      <div className="relative">
        <ImageWithFallback
          src={offer.image}
          alt={offer.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-destructive text-destructive-foreground">
            {offer.offer}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm">{offer.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-foreground mb-1">{offer.name}</h3>
            <p className="text-muted-foreground text-sm">{offer.cuisine}</p>
          </div>
          <div className="text-right">
            <p className="text-foreground font-medium">${offer.discountedPrice}</p>
            <p className="text-muted-foreground text-sm line-through">${offer.originalPrice}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{offer.description}</p>
        
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{offer.distance}km</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{offer.deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}