
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Timer } from 'lucide-react';
import { TestResults } from './TestResults';

interface TypingTestProps {
  onBack: () => void;
}

interface TestStats {
  wpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  totalChars: number;
  timeElapsed: number;
}

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.",
  "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole.",
  "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future.",
  "Practice makes perfect when it comes to typing. Regular exercise and proper finger placement will significantly improve your speed and accuracy over time."
];

export const TypingTest = ({ onBack }: TypingTestProps) => {
  const [testText, setTestText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [testDuration, setTestDuration] = useState(60);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [testStats, setTestStats] = useState<TestStats | null>(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const resetTest = useCallback(() => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setTestText(randomText);
    setUserInput('');
    setIsActive(false);
    setTimeLeft(testDuration);
    setStartTime(null);
    setShowResults(false);
    setTestStats(null);
  }, [testDuration]);

  const startTest = () => {
    if (!isActive) {
      setIsActive(true);
      setStartTime(Date.now());
    }
  };

  const finishTest = () => {
    if (isActive && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      const totalChars = userInput.length;
      const correctChars = calculateCorrectChars();
      const errors = totalChars - correctChars;
      const wpm = Math.round((correctChars / 5) / (timeElapsed / 60));
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

      const stats: TestStats = {
        wpm,
        accuracy,
        errors,
        correctChars,
        totalChars,
        timeElapsed
      };

      setTestStats(stats);
      setIsActive(false);
      setShowResults(true);
    }
  };

  const calculateCorrectChars = () => {
    let correct = 0;
    for (let i = 0; i < Math.min(userInput.length, testText.length); i++) {
      if (userInput[i] === testText[i]) {
        correct++;
      }
    }
    return correct;
  };

  const getCurrentWPM = () => {
    if (!startTime) return 0;
    const timeElapsed = (Date.now() - startTime) / 1000;
    const correctChars = calculateCorrectChars();
    return Math.round((correctChars / 5) / (timeElapsed / 60)) || 0;
  };

  const getCurrentAccuracy = () => {
    if (userInput.length === 0) return 100;
    const correctChars = calculateCorrectChars();
    return Math.round((correctChars / userInput.length) * 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!isActive && value.length > 0) {
      startTest();
    }
    if (value.length <= testText.length) {
      setUserInput(value);
    }
  };

  const renderText = () => {
    return testText.split('').map((char, index) => {
      let className = 'text-gray-400';
      if (index < userInput.length) {
        className = userInput[index] === char ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
      } else if (index === userInput.length) {
        className = 'text-gray-800 bg-blue-200 border-l-2 border-blue-500';
      }
      
      return (
        <span key={index} className={`${className} px-0.5 transition-colors duration-150`}>
          {char}
        </span>
      );
    });
  };

  if (showResults && testStats) {
    return <TestResults stats={testStats} onRestart={resetTest} onBack={onBack} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Test Controls */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Timer className="h-5 w-5 mr-2" />
                Typing Test
              </CardTitle>
              <div className="flex items-center space-x-4">
                <select 
                  value={testDuration} 
                  onChange={(e) => setTestDuration(Number(e.target.value))}
                  className="border rounded px-3 py-1"
                  disabled={isActive}
                >
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={180}>3 minutes</option>
                  <option value={300}>5 minutes</option>
                </select>
                <Button onClick={resetTest} variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
              <p className="text-sm text-gray-600">Time Left</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{getCurrentWPM()}</div>
              <p className="text-sm text-gray-600">WPM</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">{getCurrentAccuracy()}%</div>
              <p className="text-sm text-gray-600">Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">{userInput.length - calculateCorrectChars()}</div>
              <p className="text-sm text-gray-600">Errors</p>
            </CardContent>
          </Card>
        </div>

        {/* Typing Area */}
        <Card>
          <CardHeader>
            <CardTitle>Type the text below:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg font-mono text-lg leading-relaxed">
              {renderText()}
            </div>
            <textarea
              value={userInput}
              onChange={handleInputChange}
              placeholder={isActive ? "" : "Start typing to begin the test..."}
              className="w-full h-32 p-4 border rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={timeLeft === 0}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
