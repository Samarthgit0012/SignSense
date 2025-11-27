import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, CheckCircle2, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const modules = [
  {
    id: 1,
    title: 'Gujarati Alphabets',
    description: 'Learn the complete Gujarati alphabet in sign language',
    lessons: 36,
    completed: 24,
    difficulty: 'Beginner',
    locked: false,
  },
  {
    id: 2,
    title: 'Common Words',
    description: 'Essential everyday vocabulary in ASL',
    lessons: 50,
    completed: 12,
    difficulty: 'Beginner',
    locked: false,
  },
  {
    id: 3,
    title: 'Mathematics Signs',
    description: 'Numbers, operations, and mathematical concepts',
    lessons: 40,
    completed: 0,
    difficulty: 'Intermediate',
    locked: false,
  },
  {
    id: 4,
    title: 'Science Principles',
    description: 'Scientific terminology and concepts',
    lessons: 45,
    completed: 0,
    difficulty: 'Intermediate',
    locked: true,
  },
];

export default function Learn() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success text-success-foreground';
      case 'Intermediate':
        return 'bg-accent text-accent-foreground';
      case 'Advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Learning Modules</h1>
        <p className="text-muted-foreground">
          Structured courses to master sign language step by step
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Modules</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => {
              const progress = (module.completed / module.lessons) * 100;

              return (
                <Card
                  key={module.id}
                  className={`transition-all hover:shadow-medium ${
                    module.locked ? 'opacity-60' : 'cursor-pointer'
                  }`}
                  onClick={() => !module.locked && setSelectedModule(module.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="rounded-lg bg-gradient-primary p-3">
                        <BookOpen className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {module.title}
                      {module.locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                          {module.completed} / {module.lessons} lessons
                        </span>
                      </div>
                      <Progress value={progress} />
                    </div>

                    {!module.locked ? (
                      <Button className="w-full gradient-primary">
                        {module.completed > 0 ? (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Continue Learning
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Start Module
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button className="w-full" variant="secondary" disabled>
                        <Lock className="mr-2 h-4 w-4" />
                        Complete Previous Modules
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules
              .filter((m) => m.completed > 0 && m.completed < m.lessons)
              .map((module) => {
                const progress = (module.completed / module.lessons) * 100;

                return (
                  <Card key={module.id} className="hover:shadow-medium transition-all">
                    <CardHeader>
                      <CardTitle>{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={progress} />
                      <Button className="w-full gradient-primary">
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-12">
            <CheckCircle2 className="h-16 w-16 mx-auto text-success mb-4" />
            <h3 className="text-xl font-semibold mb-2">Great Progress!</h3>
            <p className="text-muted-foreground">
              You haven't completed any modules yet. Keep learning!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
