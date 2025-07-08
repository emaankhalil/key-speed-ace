
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Trophy, Target, Clock, AlertCircle } from 'lucide-react';

interface TestStats {
  wpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

interface TestResultsProps {
  stats: TestStats;
  onRestart: () => void;
  onBack: () => void;
}

export const TestResults = ({ stats, onRestart, onBack }: TestResultsProps) => {
  const getPerformanceMessage = () => {
    if (stats.wpm >= 60 && stats.accuracy >= 95) return "Excellent! You're a typing master!";
    if (stats.wpm >= 40 && stats.accuracy >= 90) return "Great job! Keep up the good work!";
    if (stats.wpm >= 25 && stats.accuracy >= 85) return "Good progress! Practice makes perfect!";
    return "Keep practicing to improve your speed and accuracy!";
  };

  const getWPMLevel = () => {
    if (stats.wpm >= 60) return "Expert";
    if (stats.wpm >= 40) return "Advanced";
    if (stats.wpm >= 25) return "Intermediate";
    return "Beginner";
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
        {/* Results Header */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center justify-center">
              <Trophy className="h-8 w-8 mr-3 text-yellow-600" />
              Test Complete!
            </CardTitle>
            <p className="text-lg text-gray-600">{getPerformanceMessage()}</p>
          </CardHeader>
        </Card>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Target className="h-5 w-5 mr-2" />
                Typing Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.wpm} WPM</div>
              <p className="text-blue-700 font-medium">{getWPMLevel()} Level</p>
              <p className="text-sm text-gray-600 mt-2">
                Words per minute (adjusted for errors)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Target className="h-5 w-5 mr-2" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.accuracy}%</div>
              <p className="text-green-700 font-medium">
                {stats.accuracy >= 95 ? "Excellent" : stats.accuracy >= 90 ? "Good" : "Needs Work"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {stats.correctChars} correct out of {stats.totalChars} characters
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">{Math.round(stats.timeElapsed)}s</div>
                <p className="text-sm text-gray-600">Time Elapsed</p>
              </div>
              <div className="text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold text-red-600">{stats.errors}</div>
                <p className="text-sm text-gray-600">Errors</p>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{stats.correctChars}</div>
                <p className="text-sm text-gray-600">Correct Characters</p>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">{Math.round((stats.correctChars / 5) * 60 / stats.timeElapsed)}</div>
                <p className="text-sm text-gray-600">Gross WPM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button onClick={onRestart} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Take Another Test
          </Button>
          <Button onClick={onBack} variant="outline" size="lg">
            Back to Home
          </Button>
        </div>

        {/* Performance Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tips to Improve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">For Speed:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Practice touch typing regularly</li>
                  <li>• Focus on rhythm and flow over speed</li>
                  <li>• Use all fingers, not just index fingers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For Accuracy:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Slow down and focus on correctness first</li>
                  <li>• Practice proper finger placement</li>
                  <li>• Use our structured lessons</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
