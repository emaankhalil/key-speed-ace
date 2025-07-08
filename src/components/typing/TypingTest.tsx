import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Timer, Target, Gauge } from 'lucide-react';
import { TestResults } from './TestResults';
import { useTheme } from '@/contexts/ThemeContext';

interface TypingTestProps {
  onBack: () => void;
}

interface TestResultsData {
  wpm: number;
  accuracy: number;
  duration: number;
}

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Coding is a superpower that allows you to create amazing things.",
  "Practice makes perfect, so keep typing and improving your skills.",
  "The best way to learn is by doing, so start coding today!",
  "Hello, world! This is a simple typing test to get you started."
];

export const TypingTest = ({ onBack }: TypingTestProps) => {
  const { fontSize, fontFamily } = useTheme();
  const [sampleText, setSampleText] = useState(sampleTexts[0]);
  const [userInput, setUserInput] = useState('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [accuracy, setAccuracy] = useState(100);
  const [currentWPM, setCurrentWPM] = useState(0);
  const [testResults, setTestResults] = useState<TestResultsData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [testDuration, setTestDuration] = useState(60);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTestActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTest();
    }

    return () => clearInterval(intervalId);
  }, [isTestActive, timeLeft]);

  const calculateAccuracy = () => {
    const correctChars = sampleText.split('').reduce((count, char, index) => {
      return count + (char === userInput[index] ? 1 : 0);
    }, 0);
    return sampleText.length > 0 ? Math.round((correctChars / sampleText.length) * 100) : 100;
  };

  const calculateWPM = () => {
    const wordsTyped = userInput.split(' ').length;
    const minutesTaken = (testDuration - timeLeft) / 60;
    return minutesTaken > 0 ? Math.round(wordsTyped / minutesTaken) : 0;
  };

  const startTest = () => {
    setIsTestActive(true);
    setTimeLeft(testDuration);
    setUserInput('');
    setShowResults(false);
    inputRef?.current?.focus();
  };

  const endTest = () => {
    setIsTestActive(false);
    const accuracy = calculateAccuracy();
    const wpm = calculateWPM();
    setAccuracy(accuracy);
    setCurrentWPM(wpm);
    setTestResults({ wpm, accuracy, duration: testDuration });
    setShowResults(true);
  };

  const resetTest = () => {
    setIsTestActive(false);
    setTimeLeft(testDuration);
    setUserInput('');
    setAccuracy(100);
    setCurrentWPM(0);
    setShowResults(false);
    setSampleText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    inputRef?.current?.focus();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isTestActive) {
      setUserInput(event.target.value);
      setAccuracy(calculateAccuracy());
      setCurrentWPM(calculateWPM());
    }
  };

  const getFontFamilyStyle = () => {
    switch (fontFamily) {
      case 'mono':
        return 'monospace';
      case 'serif':
        return 'serif';
      default:
        return fontFamily;
    }
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
          <h1 className="text-2xl md:text-3xl font-bold">Typing Test</h1>
        </div>
        
        {!showResults ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Typing Test</span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    {Math.max(0, timeLeft)}s
                  </div>
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 mr-1" />
                    {currentWPM} WPM
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {accuracy}%
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Test Duration Selection */}
              {!isTestActive && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium">Duration:</span>
                  {[15, 30, 60, 120].map((duration) => (
                    <Button
                      key={duration}
                      variant={testDuration === duration ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTestDuration(duration)}
                    >
                      {duration}s
                    </Button>
                  ))}
                </div>
              )}

              {/* Typing Area */}
              <div className="space-y-4">
                <div 
                  className="p-6 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 min-h-[200px] text-lg leading-relaxed select-none"
                  style={{ 
                    fontSize: `${fontSize}px`,
                    fontFamily: getFontFamilyStyle()
                  }}
                >
                  {sampleText.split('').map((char, index) => {
                    let className = '';
                    if (index < userInput.length) {
                      className = userInput[index] === char ? 'text-green-600' : 'text-red-600 bg-red-100';
                    } else if (index === userInput.length) {
                      className = 'bg-blue-200 animate-pulse';
                    }
                    
                    return (
                      <span key={index} className={className}>
                        {char}
                      </span>
                    );
                  })}
                </div>

                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  className="w-full h-24 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isTestActive && timeLeft === 0}
                  style={{ 
                    fontSize: `${fontSize}px`,
                    fontFamily: getFontFamilyStyle()
                  }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap gap-2">
                {!isTestActive && timeLeft === testDuration && (
                  <Button onClick={startTest}>Start Test</Button>
                )}
                {isTestActive && (
                  <Button onClick={resetTest} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <TestResults
            results={testResults!}
            onRetry={resetTest}
            onBack={onBack}
          />
        )}
      </div>
    </div>
  );
};
