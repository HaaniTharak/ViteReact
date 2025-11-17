import { DealCard } from './DealCard';
import { Heart } from 'lucide-react';

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

interface FavoritesScreenProps {
  deals: FoodDeal[];
  onDealSelect: (deal: FoodDeal) => void;
  favoriteIds: Set<string>;
  onToggleFavorite: (dealId: string) => void;
}

export function FavoritesScreen({ deals, onDealSelect, favoriteIds, onToggleFavorite }: FavoritesScreenProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-medium text-foreground">Your Favorites</h1>
          <p className="text-muted-foreground">Food deals you've saved</p>
        </div>
      </div>

      <div className="px-4 py-4">
        {deals.length > 0 ? (
          <div className="space-y-4">
            {deals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onTap={onDealSelect}
                isFavorite={favoriteIds.has(deal.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No favorite deals yet</h3>
            <p className="text-muted-foreground">Save food deals you love to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}