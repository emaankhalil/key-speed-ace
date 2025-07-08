
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Trophy, Medal, Award, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LeaderboardProps {
  onBack: () => void;
}

interface LeaderboardEntry {
  id: number;
  username: string;
  wpm: number;
  accuracy: number;
  testsCompleted: number;
  avatar: string;
  rank: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { id: 1, username: "SpeedTyper", wpm: 85, accuracy: 98, testsCompleted: 150, avatar: "🎯", rank: 1 },
  { id: 2, username: "KeyboardMaster", wpm: 82, accuracy: 97, testsCompleted: 200, avatar: "⚡", rank: 2 },
  { id: 3, username: "TypeNinja", wpm: 78, accuracy: 96, testsCompleted: 120, avatar: "🥷", rank: 3 },
  { id: 4, username: "QuickFingers", wpm: 75, accuracy: 95, testsCompleted: 180, avatar: "👆", rank: 4 },
  { id: 5, username: "TypingPro", wpm: 72, accuracy: 94, testsCompleted: 160, avatar: "💪", rank: 5 },
  { id: 6, username: "FastTypist", wpm: 68, accuracy: 93, testsCompleted: 140, avatar: "🚀", rank: 6 },
  { id: 7, username: "SpeedDemon", wpm: 65, accuracy: 92, testsCompleted: 110, avatar: "😈", rank: 7 },
  { id: 8, username: "KeyStroke", wpm: 62, accuracy: 91, testsCompleted: 130, avatar: "⌨️", rank: 8 },
  { id: 9, username: "TypeKing", wpm: 58, accuracy: 90, testsCompleted: 100, avatar: "👑", rank: 9 },
  { id: 10, username: "FingerFlash", wpm: 55, accuracy: 89, testsCompleted: 90, avatar: "⚡", rank: 10 },
];

export const Leaderboard = ({ onBack }: LeaderboardProps) => {
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('all-time');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-300";
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Trophy className="h-8 w-8 mr-3 text-yellow-600" />
            Global Leaderboard
          </h1>
          <p className="text-gray-600">Compete with typists from around the world</p>
        </div>

        {/* Time Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center space-x-2">
              {(['daily', 'weekly', 'monthly', 'all-time'] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={timeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter(filter)}
                  className="capitalize"
                >
                  {filter.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {leaderboardData.slice(0, 3).map((entry, index) => (
            <Card key={entry.id} className={`text-center ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="text-4xl mb-2">{entry.avatar}</div>
                <h3 className="font-bold text-lg mb-2">{entry.username}</h3>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">{entry.wpm} WPM</div>
                  <div className="text-sm text-gray-600">{entry.accuracy}% accuracy</div>
                  <Badge className={getRankBadgeColor(entry.rank)}>
                    {entry.testsCompleted} tests
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                    entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className="text-2xl">{entry.avatar}</div>
                    <div>
                      <div className="font-semibold">{entry.username}</div>
                      <div className="text-sm text-gray-600">{entry.testsCompleted} tests completed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">{entry.wpm}</div>
                      <div className="text-sm text-gray-600">WPM</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">{entry.accuracy}%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Ranking */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Your Current Ranking</h3>
              <div className="flex items-center justify-center space-x-8">
                <div>
                  <div className="text-2xl font-bold text-blue-600">#47</div>
                  <div className="text-sm text-gray-600">Global Rank</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">35 WPM</div>
                  <div className="text-sm text-gray-600">Best Speed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-gray-600">Best Accuracy</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Keep practicing to climb the rankings! You're only 10 WPM away from the top 20.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips to Improve Ranking */}
        <Card>
          <CardHeader>
            <CardTitle>Climb the Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">How Rankings Work</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Based on your highest WPM score</li>
                  <li>• Minimum 90% accuracy required</li>
                  <li>• Must complete at least 5 tests</li>
                  <li>• Updated in real-time</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Tips to Improve</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Practice daily for consistency</li>
                  <li>• Focus on accuracy before speed</li>
                  <li>• Complete typing lessons</li>
                  <li>• Take longer tests for better scores</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
