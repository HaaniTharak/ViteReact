import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { DrumstickRating } from './DrumstickRating';

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

interface HistoryItem extends FoodDeal {
  orderedDate: string;
  orderTotal: number;
  quantity: number;
  userRating: number; // User's personal rating for this order
}

interface HistoryScreenProps {
  onDealSelect: (deal: FoodDeal) => void;
}

const mockHistory: HistoryItem[] = [
  {
    id: '3',
    dealName: 'Wagyu Cheese Burger Deluxe',
    restaurantName: 'Burger Palace',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop',
    rating: 4.3,
    distance: 0.3,
    offer: '25% OFF',
    originalPrice: 18.99,
    discountedPrice: 14.24,
    description: 'Premium Wagyu beef patty with aged cheddar, caramelized onions, and garlic aioli.',
    category: 'Burger',
    priceLevel: '$',
    address: '3201 16th St',
    expirationDate: '8/9/2025',
    daysUntilExpiration: 5,
    orderedDate: 'August 1, 2025',
    orderTotal: 28.48,
    quantity: 2,
    userRating: 4.0
  },
  {
    id: '4',
    dealName: 'Butter Chicken & Naan Feast',
    restaurantName: 'Spice Garden',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    rating: 4.6,
    distance: 0.9,
    offer: '40% OFF',
    originalPrice: 22.50,
    discountedPrice: 13.50,
    description: 'Tender chicken in a rich, creamy tomato-based curry with aromatic spices.',
    category: 'Curry',
    priceLevel: '$',
    address: '1901 Mission St',
    expirationDate: '8/5/2025',
    daysUntilExpiration: 1,
    orderedDate: 'July 28, 2025',
    orderTotal: 27.00,
    quantity: 2,
    userRating: 5.0
  },
  {
    id: '5',
    dealName: 'Street Tacos Trio',
    restaurantName: 'Taco Fiesta',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
    rating: 4.4,
    distance: 0.6,
    offer: 'Free Delivery',
    originalPrice: 16.99,
    discountedPrice: 16.99,
    description: 'Authentic Mexican tacos with fresh ingredients.',
    category: 'Tacos',
    priceLevel: '$$',
    address: '2550 Mission St',
    expirationDate: '8/11/2025',
    daysUntilExpiration: 7,
    orderedDate: 'July 25, 2025',
    orderTotal: 33.98,
    quantity: 2,
    userRating: 3.5
  }
];

export function HistoryScreen({ onDealSelect }: HistoryScreenProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-medium text-foreground">Deal History</h1>
          <p className="text-muted-foreground">Food deals you've used recently</p>
        </div>
      </div>

      <div className="px-4 py-4">
        {mockHistory.length > 0 ? (
          <div className="space-y-4">
            {mockHistory.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-lg overflow-hidden shadow-sm border border-border cursor-pointer transition-all duration-200 active:scale-95"
                onClick={() => onDealSelect(item)}
              >
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.dealName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{item.dealName}</h3>
                        <p className="text-muted-foreground text-sm">{item.restaurantName} • {item.cuisine}</p>
                        <p className="text-muted-foreground text-xs">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-foreground font-medium">${item.orderTotal}</p>
                        <p className="text-muted-foreground text-xs">{item.orderedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                          <DrumstickRating 
                            rating={item.rating} 
                            size="sm" 
                            showValue={true}
                          />
                          <div className="text-foreground font-medium">
                            {item.priceLevel}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.distance} miles • {item.address}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-muted-foreground text-xs mb-1">Your Rating:</p>
                        <DrumstickRating 
                          rating={item.userRating} 
                          size="sm" 
                          showValue={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No order history</h3>
            <p className="text-muted-foreground">Your past food orders will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}