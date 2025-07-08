
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Target, Clock, Trophy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DashboardProps {
  onBack: () => void;
}

// Sample data - in a real app, this would come from a database
const progressData = [
  { date: '2024-01-01', wpm: 25, accuracy: 85 },
  { date: '2024-01-02', wpm: 28, accuracy: 87 },
  { date: '2024-01-03', wpm: 30, accuracy: 89 },
  { date: '2024-01-04', wpm: 32, accuracy: 91 },
  { date: '2024-01-05', wpm: 35, accuracy: 93 },
  { date: '2024-01-06', wpm: 38, accuracy: 94 },
  { date: '2024-01-07', wpm: 42, accuracy: 96 },
];

const recentTests = [
  { id: 1, date: '2024-01-07', wpm: 42, accuracy: 96, duration: 60 },
  { id: 2, date: '2024-01-06', wpm: 38, accuracy: 94, duration: 180 },
  { id: 3, date: '2024-01-05', wpm: 35, accuracy: 93, duration: 60 },
  { id: 4, date: '2024-01-04', wpm: 32, accuracy: 91, duration: 300 },
  { id: 5, date: '2024-01-03', wpm: 30, accuracy: 89, duration: 60 },
];

export const Dashboard = ({ onBack }: DashboardProps) => {
  const currentStats = {
    averageWPM: 35,
    bestWPM: 42,
    averageAccuracy: 92,
    testsCompleted: 15,
    lessonsCompleted: 4,
    totalPracticeTime: 125 // minutes
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Progress Dashboard</h1>
          <p className="text-gray-600">Track your typing improvement over time</p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{currentStats.averageWPM}</div>
                  <p className="text-sm text-gray-600">Avg WPM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{currentStats.bestWPM}</div>
                  <p className="text-sm text-gray-600">Best WPM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{currentStats.averageAccuracy}%</div>
                  <p className="text-sm text-gray-600">Avg Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{currentStats.totalPracticeTime}</div>
                  <p className="text-sm text-gray-600">Min Practiced</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>WPM Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value) => [`${value} WPM`, 'Speed']}
                  />
                  <Line type="monotone" dataKey="wpm" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accuracy Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                  <YAxis domain={[80, 100]} />
                  <Tooltip 
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Trophy className="h-6 w-6 text-green-600 mr-3" />
                    <span className="font-medium">First Test Completed</span>
                  </div>
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Target className="h-6 w-6 text-blue-600 mr-3" />
                    <span className="font-medium">25 WPM Milestone</span>
                  </div>
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <Trophy className="h-6 w-6 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-500">50 WPM Milestone</span>
                  </div>
                  <span className="text-gray-400 text-sm">○</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTests.slice(0, 5).map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{test.wpm} WPM • {test.accuracy}% Accuracy</div>
                      <div className="text-sm text-gray-600">{new Date(test.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-sm text-gray-500">{test.duration}s</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Speed Goal: 50 WPM</h4>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentStats.averageWPM / 50) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{currentStats.averageWPM}/50 WPM ({Math.round((currentStats.averageWPM / 50) * 100)}%)</p>
              </div>
              <div>
                <h4 className="font-medium mb-3">Accuracy Goal: 95%</h4>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentStats.averageAccuracy / 95) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{currentStats.averageAccuracy}/95% ({Math.round((currentStats.averageAccuracy / 95) * 100)}%)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
