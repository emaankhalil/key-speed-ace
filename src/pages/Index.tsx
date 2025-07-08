
import React, { useState } from 'react';
import { TypingTest } from '@/components/typing/TypingTest';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Lessons } from '@/components/lessons/Lessons';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Settings } from '@/components/settings/Settings';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, Trophy, BookOpen, TrendingUp, Settings as SettingsIcon } from 'lucide-react';

type ActiveSection = 'home' | 'test' | 'lessons' | 'dashboard' | 'leaderboard' | 'settings';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'test':
        return <TypingTest onBack={() => setActiveSection('home')} />;
      case 'lessons':
        return <Lessons onBack={() => setActiveSection('home')} />;
      case 'dashboard':
        return <Dashboard onBack={() => setActiveSection('home')} />;
      case 'leaderboard':
        return <Leaderboard onBack={() => setActiveSection('home')} />;
      case 'settings':
        return <Settings onBack={() => setActiveSection('home')} />;
      default:
        return <HomePage onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      {renderActiveSection()}
    </div>
  );
};

const HomePage = ({ onNavigate }: { onNavigate: (section: ActiveSection) => void }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Master Your Typing Skills
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Improve your typing speed and accuracy with our interactive lessons, real-time tests, and comprehensive progress tracking.
        </p>
        <Button 
          onClick={() => onNavigate('test')} 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
        >
          Start Typing Test
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('test')}>
          <CardHeader>
            <Keyboard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Typing Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Test your speed and accuracy with timed challenges and instant feedback.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('lessons')}>
          <CardHeader>
            <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>Interactive Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Learn proper technique with structured lessons from beginner to advanced.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <CardHeader>
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <CardTitle>Progress Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Monitor your improvement with detailed statistics and performance graphs.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('leaderboard')}>
          <CardHeader>
            <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Compete with other users and climb the global typing speed rankings.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Why Choose Typing Master?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <p className="text-gray-600">Interactive Lessons</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">Real-time</div>
            <p className="text-gray-600">Performance Feedback</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <p className="text-gray-600">Free to Use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
