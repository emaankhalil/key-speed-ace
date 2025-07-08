
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Lock, CheckCircle, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LessonsProps {
  onBack: () => void;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  keys: string;
  text: string;
  completed: boolean;
  locked: boolean;
}

const lessonData: Lesson[] = [
  {
    id: 1,
    title: "Home Row Basics",
    description: "Learn the foundation keys: A, S, D, F, J, K, L, ;",
    level: "Beginner",
    keys: "ASDF JKL;",
    text: "aaa sss ddd fff jjj kkk lll ;;; asdf jkl; fdsa ;lkj",
    completed: false,
    locked: false
  },
  {
    id: 2,
    title: "Top Row Introduction",
    description: "Master the top row: Q, W, E, R, T, Y, U, I, O, P",
    level: "Beginner", 
    keys: "QWERTY UIOP",
    text: "qqq www eee rrr ttt yyy uuu iii ooo ppp qwert yuiop",
    completed: false,
    locked: true
  },
  {
    id: 3,
    title: "Bottom Row Basics",
    description: "Practice the bottom row: Z, X, C, V, B, N, M",
    level: "Beginner",
    keys: "ZXCVBNM",
    text: "zzz xxx ccc vvv bbb nnn mmm zxcv bnm cvbn",
    completed: false,
    locked: true
  },
  {
    id: 4,
    title: "Simple Words",
    description: "Combine letters to form common words",
    level: "Beginner",
    keys: "All letters",
    text: "the and for are but not you all can had her was one our out day get has him his how",
    completed: false,
    locked: true
  },
  {
    id: 5,
    title: "Numbers Row",
    description: "Learn to type numbers 1-0 efficiently",
    level: "Intermediate",
    keys: "1234567890",
    text: "111 222 333 444 555 666 777 888 999 000 12345 67890",
    completed: false,
    locked: true
  },
  {
    id: 6,
    title: "Punctuation Practice",
    description: "Master common punctuation marks",
    level: "Intermediate",
    keys: ".,;:!?",
    text: "Hello, world! How are you? I am fine. This is great; let's continue.",
    completed: false,
    locked: true
  },
  {
    id: 7,
    title: "Capital Letters",
    description: "Practice using shift keys for capitalization",
    level: "Intermediate",
    keys: "Shift + letters",
    text: "The Quick Brown Fox Jumps Over The Lazy Dog. This Is A Sample Text.",
    completed: false,
    locked: true
  },
  {
    id: 8,
    title: "Speed Building",
    description: "Focus on increasing typing speed with common phrases",
    level: "Advanced",
    keys: "All keys",
    text: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
    completed: false,
    locked: true
  }
];

export const Lessons = ({ onBack }: LessonsProps) => {
  const [lessons, setLessons] = useState<Lesson[]>(lessonData);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const startLesson = (lesson: Lesson) => {
    if (!lesson.locked) {
      setActiveLesson(lesson);
    }
  };

  const completeLesson = (lessonId: number) => {
    setLessons(prev => prev.map(lesson => {
      if (lesson.id === lessonId) {
        return { ...lesson, completed: true };
      }
      // Unlock next lesson
      if (lesson.id === lessonId + 1) {
        return { ...lesson, locked: false };
      }
      return lesson;
    }));
    setActiveLesson(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (activeLesson) {
    return (
      <LessonPractice 
        lesson={activeLesson} 
        onComplete={() => completeLesson(activeLesson.id)}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Typing Lessons</h1>
          <p className="text-gray-600">
            Follow our structured curriculum to master touch typing from basic finger placement to advanced speed techniques.
          </p>
        </div>

        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                lesson.locked ? 'opacity-50' : ''
              } ${lesson.completed ? 'border-green-200 bg-green-50' : ''}`}
              onClick={() => startLesson(lesson)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-600">#{lesson.id}</span>
                      {lesson.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {lesson.locked && <Lock className="h-5 w-5 text-gray-400" />}
                      {!lesson.locked && !lesson.completed && <BookOpen className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div>
                      <CardTitle className="text-left">{lesson.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getLevelColor(lesson.level)}>
                      {lesson.level}
                    </Badge>
                    {!lesson.locked && (
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <strong>Focus keys:</strong> {lesson.keys}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Progress Tips</h3>
              <p className="text-sm text-gray-600">
                Complete lessons in order to unlock advanced content. Focus on accuracy first, then gradually increase speed.
                Practice regularly for best results!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface LessonPracticeProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

const LessonPractice = ({ lesson, onComplete, onBack }: LessonPracticeProps) => {
  const [userInput, setUserInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= lesson.text.length) {
      setUserInput(value);
      if (value === lesson.text) {
        setIsComplete(true);
      }
    }
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === lesson.text[i]) correct++;
    }
    return Math.round((correct / userInput.length) * 100);
  };

  const renderText = () => {
    return lesson.text.split('').map((char, index) => {
      let className = 'text-gray-400';
      if (index < userInput.length) {
        className = userInput[index] === char ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
      } else if (index === userInput.length) {
        className = 'text-gray-800 bg-blue-200 border-l-2 border-blue-500';
      }
      
      return (
        <span key={index} className={`${className} px-0.5`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lessons
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
            <p className="text-gray-600">{lesson.description}</p>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{Math.round((userInput.length / lesson.text.length) * 100)}%</div>
              <p className="text-sm text-gray-600">Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{calculateAccuracy()}%</div>
              <p className="text-sm text-gray-600">Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">{userInput.length}</div>
              <p className="text-sm text-gray-600">Characters</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Practice Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg font-mono text-lg leading-relaxed">
              {renderText()}
            </div>
            <textarea
              value={userInput}
              onChange={handleInputChange}
              placeholder="Start typing the text above..."
              className="w-full h-32 p-4 border rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </CardContent>
        </Card>

        {isComplete && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Lesson Complete!</h3>
              <p className="text-green-700 mb-4">Great job! You've mastered this lesson.</p>
              <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                Continue to Next Lesson
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
