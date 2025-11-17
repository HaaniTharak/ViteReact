import { Percent, Heart, Clock, User } from 'lucide-react';

export type TabType = 'deals' | 'favorites' | 'history' | 'account';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'deals' as TabType, icon: Percent, label: 'Deals' },
    { id: 'favorites' as TabType, icon: Heart, label: 'Favorites' },
    { id: 'history' as TabType, icon: Clock, label: 'History' },
    { id: 'account' as TabType, icon: User, label: 'Account' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors duration-200"
            >
              <IconComponent 
                className={`w-6 h-6 mb-1 ${
                  isActive 
                    ? 'text-primary fill-current' 
                    : 'text-muted-foreground'
                }`}
              />
              <span 
                className={`text-xs leading-none ${
                  isActive 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}