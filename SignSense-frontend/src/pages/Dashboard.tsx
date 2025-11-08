import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Activity, BookOpen, Video, TrendingUp, Award, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface UserStats {
  totalSessions: number;
  avgAccuracy: number;
  learningHours: number;
  completedLessons: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalSessions: 0,
    avgAccuracy: 0,
    learningHours: 0,
    completedLessons: 0,
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [sessionsRes] = await Promise.all([
        api.get(`/sessions/user/${user?.id}`),
      ]);
      
      setRecentSessions(sessionsRes.data.slice(0, 5));
      
      // Calculate stats from sessions
      setStats({
        totalSessions: sessionsRes.data.length,
        avgAccuracy: 85.5, // Mock data
        learningHours: Math.floor(sessionsRes.data.length * 0.5),
        completedLessons: 12, // Mock data
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.username}! 👋</h1>
        <p className="text-muted-foreground">Here's your learning progress overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalSessions}</div>
            <p className="text-xs text-muted-foreground mt-1">Practice sessions completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.avgAccuracy}%</div>
            <Progress value={stats.avgAccuracy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.learningHours}h</div>
            <p className="text-xs text-muted-foreground mt-1">Time invested in learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Done</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.completedLessons}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed successfully</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump right back into learning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/learn">
              <Button className="w-full justify-start" variant="outline" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Continue Learning
              </Button>
            </Link>
            <Link to="/translate">
              <Button className="w-full justify-start gradient-primary" size="lg">
                <Video className="mr-2 h-5 w-5" />
                Start Live Translation
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest practice sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSessions.length > 0 ? (
              <div className="space-y-3">
                {recentSessions.map((session: any) => (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">Session #{session.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(session.startTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-success">{session.status}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No sessions yet. Start your first session!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
