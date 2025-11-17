import { useState } from "react";
import {
  BottomNavigation,
  TabType,
} from "./components/BottomNavigation";
import { DealsScreen } from "./components/DealsScreen";
import { FavoritesScreen } from "./components/FavoritesScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { AccountScreen } from "./components/AccountScreen";
import { OfferDetails } from "./components/OfferDetails";
import { Toaster } from "./components/ui/sonner";

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
  expirationDate: string; // Format: "8/10/2025"
  daysUntilExpiration: number;
}

// Helper function to determine price level based on discounted price
export function getPriceLevel(price: number): string {
  if (price < 15) return "$";
  if (price < 25) return "$$";
  if (price < 35) return "$$$";
  return "$$$$";
}

const mockDeals: FoodDeal[] = [
  {
    id: "1",
    dealName: "Truffle Mushroom Risotto",
    restaurantName: "Bella Italia",
    cuisine: "Italian",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    rating: 4.5,
    distance: 0.5,
    offer: "30% OFF",
    originalPrice: 24.99,
    discountedPrice: 17.49,
    description:
      "Creamy Arborio rice cooked with wild mushrooms, black truffle oil, and aged Parmesan cheese. A rich and indulgent Italian classic.",
    category: "Main Course",
    priceLevel: "$$",
    address: "1423 Valencia St",
    expirationDate: "8/7/2025",
    daysUntilExpiration: 3,
  },
  {
    id: "2",
    dealName: "Dragon Roll & Miso Soup Combo",
    restaurantName: "Sushi Master",
    cuisine: "Japanese",
    image:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop",
    rating: 4.8,
    distance: 0.7,
    offer: "Buy 2 Get 1 Free",
    originalPrice: 32.0,
    discountedPrice: 21.33,
    description:
      "Fresh dragon roll with tempura shrimp, avocado, and eel sauce, served with traditional miso soup. Made with the finest sushi-grade fish.",
    category: "Sushi Set",
    priceLevel: "$$",
    address: "2847 24th St",
    expirationDate: "8/6/2025",
    daysUntilExpiration: 2,
  },
  {
    id: "3",
    dealName: "Wagyu Cheese Burger Deluxe",
    restaurantName: "Burger Palace",
    cuisine: "American",
    image:
      "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop",
    rating: 4.3,
    distance: 0.3,
    offer: "25% OFF",
    originalPrice: 18.99,
    discountedPrice: 14.24,
    description:
      "Premium Wagyu beef patty with aged cheddar, caramelized onions, and garlic aioli on a brioche bun. Served with truffle fries.",
    category: "Burger",
    priceLevel: "$",
    address: "3201 16th St",
    expirationDate: "8/9/2025",
    daysUntilExpiration: 5,
  },
  {
    id: "4",
    dealName: "Butter Chicken & Naan Feast",
    restaurantName: "Spice Garden",
    cuisine: "Indian",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    rating: 4.6,
    distance: 0.9,
    offer: "40% OFF",
    originalPrice: 22.5,
    discountedPrice: 13.5,
    description:
      "Tender chicken in a rich, creamy tomato-based curry with aromatic spices. Served with fresh garlic naan and basmati rice.",
    category: "Curry",
    priceLevel: "$",
    address: "1901 Mission St",
    expirationDate: "8/5/2025",
    daysUntilExpiration: 1,
  },
  {
    id: "5",
    dealName: "Street Tacos Trio",
    restaurantName: "Taco Fiesta",
    cuisine: "Mexican",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    rating: 4.4,
    distance: 0.6,
    offer: "Free Delivery",
    originalPrice: 16.99,
    discountedPrice: 16.99,
    description:
      "Three authentic street tacos with carnitas, carne asada, and al pastor. Topped with fresh cilantro, onions, and homemade salsas.",
    category: "Tacos",
    priceLevel: "$$",
    address: "2550 Mission St",
    expirationDate: "8/11/2025",
    daysUntilExpiration: 7,
  },
  {
    id: "6",
    dealName: "Szechuan Beef & Rice Bowl",
    restaurantName: "Dragon Wok",
    cuisine: "Chinese",
    image:
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
    rating: 4.2,
    distance: 1.1,
    offer: "35% OFF",
    originalPrice: 28.0,
    discountedPrice: 18.2,
    description:
      "Tender beef strips in spicy Szechuan sauce with bell peppers and onions, served over steamed jasmine rice with crispy vegetables.",
    category: "Stir Fry",
    priceLevel: "$$",
    address: "1234 Polk St",
    expirationDate: "8/8/2025",
    daysUntilExpiration: 4,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("deals");
  const [selectedDeal, setSelectedDeal] =
    useState<FoodDeal | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    new Set(["1", "2"]),
  ); // Pre-populate with some favorites
  const [dealUsageCounts, setDealUsageCounts] = useState<
    Map<string, number>
  >(
    new Map([
      ["1", 2], // Pre-populate with some usage data
      ["3", 1],
      ["4", 3],
    ]),
  );

  const handleDealSelect = (deal: FoodDeal) => {
    setSelectedDeal(deal);
  };

  const handleBackFromDetails = () => {
    setSelectedDeal(null);
  };

  const handleToggleFavorite = (dealId: string) => {
    setFavoriteIds((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dealId)) {
        newFavorites.delete(dealId);
      } else {
        newFavorites.add(dealId);
      }
      return newFavorites;
    });
  };

  const handleIncrementDealUsage = (dealId: string) => {
    setDealUsageCounts((prev) => {
      const newCounts = new Map(prev);
      const currentCount = newCounts.get(dealId) || 0;
      newCounts.set(dealId, currentCount + 1);
      return newCounts;
    });
  };

  const handleDecrementDealUsage = (dealId: string) => {
    setDealUsageCounts((prev) => {
      const newCounts = new Map(prev);
      const currentCount = newCounts.get(dealId) || 0;
      if (currentCount > 0) {
        newCounts.set(dealId, currentCount - 1);
      }
      return newCounts;
    });
  };

  const favoriteDeals = mockDeals.filter((deal) =>
    favoriteIds.has(deal.id),
  );

  // Render the appropriate screen based on active tab
  const renderActiveScreen = () => {
    // Show deal details if a deal is selected
    if (selectedDeal) {
      return (
        <OfferDetails
          deal={selectedDeal}
          onBack={handleBackFromDetails}
          isFavorite={favoriteIds.has(selectedDeal.id)}
          onToggleFavorite={() =>
            handleToggleFavorite(selectedDeal.id)
          }
          usageCount={dealUsageCounts.get(selectedDeal.id) || 0}
          onIncrementUsage={() =>
            handleIncrementDealUsage(selectedDeal.id)
          }
          onDecrementUsage={() =>
            handleDecrementDealUsage(selectedDeal.id)
          }
        />
      );
    }

    switch (activeTab) {
      case "deals":
        return (
          <DealsScreen
            deals={mockDeals}
            onDealSelect={handleDealSelect}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            username="FoodieExplorer"
            userPoints={2450}
          />
        );
      case "favorites":
        return (
          <FavoritesScreen
            deals={favoriteDeals}
            onDealSelect={handleDealSelect}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case "history":
        return (
          <HistoryScreen onDealSelect={handleDealSelect} />
        );
      case "account":
        return <AccountScreen />;
      default:
        return (
          <DealsScreen
            deals={mockDeals}
            onDealSelect={handleDealSelect}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            username="FoodieExplorer"
            userPoints={2450}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderActiveScreen()}

      {!selectedDeal && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}