
import React from 'react';
import { Button } from '@/components/ui/button';
import { Keyboard, Home, BookOpen, TrendingUp, Trophy } from 'lucide-react';

type ActiveSection = 'home' | 'test' | 'lessons' | 'dashboard' | 'leaderboard';

interface HeaderProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
}

export const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'test' as const, label: 'Typing Test', icon: Keyboard },
    { id: 'lessons' as const, label: 'Lessons', icon: BookOpen },
    { id: 'dashboard' as const, label: 'Progress', icon: TrendingUp },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Keyboard className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Typing Master
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
