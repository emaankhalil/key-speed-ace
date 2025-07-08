
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, User, Moon, Sun, Type } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl">
                <User className="h-5 w-5 mr-2" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl">
                <Moon className="h-5 w-5 mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
                <div className="flex items-center space-x-2 self-start sm:self-center">
                  <Sun className="h-4 w-4" />
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleTheme}
                  />
                  <Moon className="h-4 w-4" />
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <Label className="text-base font-medium">Font Size</Label>
                  <span className="text-sm text-muted-foreground">{fontSize}px</span>
                </div>
                <Slider
                  value={[fontSize]}
                  onValueChange={handleFontSizeChange}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>12px</span>
                  <span>24px</span>
                </div>
              </div>

              {/* Font Family */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preview */}
              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-sm font-medium mb-2 block">Preview</Label>
                <p 
                  style={{ 
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily === 'mono' ? 'monospace' : fontFamily
                  }}
                  className="text-foreground leading-relaxed"
                >
                  The quick brown fox jumps over the lazy dog. This is how your text will appear during typing tests.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center sm:justify-end">
            <Button onClick={handleSaveSettings} size="lg" className="w-full sm:w-auto">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
