import { useState } from 'react';
import { DealCard } from './DealCard';
import { SearchBar } from './SearchBar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

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

interface DealsScreenProps {
  deals: FoodDeal[];
  onDealSelect: (deal: FoodDeal) => void;
  favoriteIds: Set<string>;
  onToggleFavorite: (dealId: string) => void;
  username?: string;
  userPoints?: number;
}

type SortOption = 'nearest' | 'best-deal' | 'highest-rated' | 'expiring-soon';

export function DealsScreen({ deals, onDealSelect, favoriteIds, onToggleFavorite, username = 'FoodieExplorer', userPoints = 2450 }: DealsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('nearest');
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Mission District, San Francisco');

  const handleChangeLocation = () => {
    setIsLocationDialogOpen(true);
  };

  const handleSaveLocation = () => {
    if (locationInput.trim()) {
      setCurrentLocation(locationInput.trim());
      setIsLocationDialogOpen(false);
      setLocationInput('');
    }
  };

  const handleCancelLocation = () => {
    setIsLocationDialogOpen(false);
    setLocationInput('');
  };

  // Filter and sort deals
  const filteredDeals = deals
    .filter(deal => {
      const matchesSearch = deal.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deal.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deal.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nearest':
          return a.distance - b.distance;
        case 'best-deal':
          // Sort by highest discount percentage
          const discountA = ((a.originalPrice - a.discountedPrice) / a.originalPrice) * 100;
          const discountB = ((b.originalPrice - b.discountedPrice) / b.originalPrice) * 100;
          return discountB - discountA;
        case 'highest-rated':
          return b.rating - a.rating;
        case 'expiring-soon':
          return a.daysUntilExpiration - b.daysUntilExpiration;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-medium text-foreground">Food Deals</h1>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">Near {currentLocation}</p>
                <button 
                  onClick={handleChangeLocation}
                  className="text-foreground text-sm underline hover:no-underline transition-all"
                >
                  change location
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-foreground font-medium">{username}</p>
              <p className="text-muted-foreground text-sm">{userPoints.toLocaleString()} pts</p>
            </div>
          </div>
          
          <SearchBar
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="Search food deals..."
          />

          {/* Filter Buttons */}
          <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSortBy('nearest')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                sortBy === 'nearest'
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              Nearest
            </button>
            <button
              onClick={() => setSortBy('best-deal')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                sortBy === 'best-deal'
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              Best Deal
            </button>
            <button
              onClick={() => setSortBy('highest-rated')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                sortBy === 'highest-rated'
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              Highest Rated
            </button>
            <button
              onClick={() => setSortBy('expiring-soon')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                sortBy === 'expiring-soon'
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              Expiring Soon
            </button>
          </div>
        </div>
      </div>

      {/* Deal Cards */}
      <div className="px-4 py-4">
        {filteredDeals.length > 0 ? (
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
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
            <h3 className="text-lg font-medium text-foreground mb-2">No deals found</h3>
            <p className="text-muted-foreground">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Location Change Dialog */}
      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Location</DialogTitle>
            <DialogDescription>
              Enter an address, zip code, or city to update your location.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter address, zip code, or city"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveLocation();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelLocation}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveLocation}
              disabled={!locationInput.trim()}
            >
              Save Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}