import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { 
  User, 
  MapPin, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings,
  Utensils,
  Clock,
  DollarSign,
  Target,
  AlertCircle,
  Globe
} from 'lucide-react';
import { DrumstickIcon } from './DrumstickIcon';

export function AccountScreen() {
  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', hasAction: true },
        { icon: MapPin, label: 'Location & Delivery Areas', hasAction: true },
        { icon: DrumstickIcon, label: 'My Reviews & Ratings', hasAction: true },
      ]
    },
    {
      title: 'Deal Preferences',
      items: [
        { icon: Target, label: 'Deal Alerts & Notifications', hasAction: true },
        { icon: DollarSign, label: 'Price Range Preferences', hasAction: true },
        { icon: Utensils, label: 'Cuisine & Dietary Preferences', hasAction: true },
        { icon: Clock, label: 'Meal Time Preferences', hasAction: true },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { icon: Bell, label: 'Push Notifications', hasSwitch: true, enabled: true },
        { icon: AlertCircle, label: 'New Deal Alerts', hasSwitch: true, enabled: true },
        { icon: Clock, label: 'Deal Expiration Reminders', hasSwitch: true, enabled: false },
        { icon: DrumstickIcon, label: 'Favorite Restaurant Updates', hasSwitch: true, enabled: true },
      ]
    },
    {
      title: 'App Settings',
      items: [
        { icon: Globe, label: 'Language & Region', hasAction: true },
        { icon: Settings, label: 'General Settings', hasAction: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', hasAction: true },
        { icon: Shield, label: 'Privacy Policy', hasAction: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-medium text-foreground">Account</h1>
          <p className="text-muted-foreground">Manage your profile and deal preferences</p>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Profile Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground">FoodieExplorer</h3>
                <Badge variant="secondary" className="text-xs">2,450 pts</Badge>
              </div>
              <p className="text-muted-foreground text-sm">john.doe@email.com</p>
              <p className="text-muted-foreground text-sm">Mission District, San Francisco</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center">
            <div className="text-lg font-medium text-foreground mb-1">47</div>
            <div className="text-xs text-muted-foreground">Deals Used</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-medium text-foreground mb-1">$340</div>
            <div className="text-xs text-muted-foreground">Total Saved</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-medium text-foreground mb-1">23</div>
            <div className="text-xs text-muted-foreground">Favorites</div>
          </Card>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            <h3 className="font-medium text-foreground mb-3 px-2">{section.title}</h3>
            
            <Card className="divide-y divide-border">
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                
                return (
                  <div key={item.label} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {item.hasSwitch && (
                        <Switch defaultChecked={item.enabled} />
                      )}
                      {item.hasAction && (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        ))}

        {/* Sign Out */}
        <Button 
          variant="outline" 
          className="w-full justify-center gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}