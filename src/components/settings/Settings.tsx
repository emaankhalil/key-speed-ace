
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, User, Sun, Moon, Type } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsProps {
  onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const { isDarkMode, toggleTheme, fontSize, setFontSize, fontFamily, setFontFamily } = useTheme();
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    // Load user settings from localStorage
    const savedUsername = localStorage.getItem('username');
    const savedAge = localStorage.getItem('age');
    
    if (savedUsername) setUsername(savedUsername);
    if (savedAge) setAge(savedAge);
  }, []);

  const fontOptions = [
    { value: 'inter', label: 'Inter' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'opensans', label: 'Open Sans' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'mono', label: 'Roboto Mono' },
    { value: 'serif', label: 'Times New Roman' },
  ];

  const handleSaveSettings = () => {
    // Save user settings to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('age', age);
    
    console.log('Settings saved:', {
      username,
      age,
      isDarkMode,
      fontSize,
      fontFamily
    });
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-2 sm:mr-4 p-2 sm:p-3"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Settings</h1>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {/* Profile Settings */}
            <Card className="transition-colors duration-300">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm sm:text-base">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm sm:text-base">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter your age"
                      min="1"
                      max="120"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="transition-colors duration-300">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Theme Toggle */}
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm sm:text-base font-medium">Theme</Label>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Switch between light and dark theme
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start space-x-3 bg-muted/50 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-orange-500" />
                      <span className="text-xs sm:text-sm">Light</span>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={toggleTheme}
                      className="mx-2"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm">Dark</span>
                      <Moon className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Font Size */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                    <Label className="text-sm sm:text-base font-medium">Font Size</Label>
                    <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                      {fontSize}px
                    </span>
                  </div>
                  <div className="px-2">
                    <Slider
                      value={[fontSize]}
                      onValueChange={handleFontSizeChange}
                      max={24}
                      min={12}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>12px</span>
                      <span>18px</span>
                      <span>24px</span>
                    </div>
                  </div>
                </div>

                {/* Font Family */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base font-medium">Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          <span className={`font-${font.value}`}>{font.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preview */}
                <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25">
                  <Label className="text-xs sm:text-sm font-medium mb-2 block">Preview</Label>
                  <p 
                    style={{ 
                      fontSize: `${fontSize}px`,
                    }}
                    className={`text-foreground leading-relaxed font-${fontFamily} transition-all duration-200`}
                  >
                    The quick brown fox jumps over the lazy dog. This is how your text will appear during typing tests.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-center sm:justify-end pt-2">
              <Button 
                onClick={handleSaveSettings} 
                size="lg" 
                className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
