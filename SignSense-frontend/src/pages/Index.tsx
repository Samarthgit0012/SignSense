import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hand, Video, BookOpen, TrendingUp, Users, Award, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="rounded-2xl bg-gradient-primary p-4 animate-float">
                <Hand className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Bridge Communication
              <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                Through Sign Language
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered real-time translation between ASL, English, and Gujarati. 
              Learn, communicate, and break barriers with cutting-edge deep learning technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/register">
                <Button size="lg" className="gradient-primary shadow-glow text-lg px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span>Real-time Translation</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-accent" />
                <span>85%+ Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span>500+ Learners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Learn & Communicate
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive platform combining translation, education, and practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-medium">
              <CardHeader>
                <div className="rounded-lg bg-gradient-primary p-3 w-fit mb-4">
                  <Video className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Live Translation</CardTitle>
                <CardDescription>
                  Real-time bidirectional translation between sign language and text using 
                  advanced computer vision and deep learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    MediaPipe pose estimation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Sub-500ms latency
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    3D avatar visualization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary/50 transition-all hover:shadow-medium">
              <CardHeader>
                <div className="rounded-lg bg-gradient-secondary p-3 w-fit mb-4">
                  <BookOpen className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>Interactive Learning</CardTitle>
                <CardDescription>
                  Structured modules for Gujarati alphabets, common words, mathematics, 
                  and science principles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                    150+ lessons available
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                    Self-paced learning
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                    Visual demonstrations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-medium">
              <CardHeader>
                <div className="rounded-lg bg-gradient-accent p-3 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Comprehensive analytics and assessments to monitor your learning journey 
                  and improve accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                    Detailed performance metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                    Practice assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                    Achievement badges
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="border-2 bg-gradient-primary text-primary-foreground">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Journey?
              </h2>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Join hundreds of learners breaking communication barriers and building an inclusive future
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Create Free Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
