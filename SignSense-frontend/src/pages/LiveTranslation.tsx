import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createWebSocketClient, PredictionResult } from '@/lib/websocket';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, VideoOff, Loader2, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@stomp/stompjs';

export default function LiveTranslation() {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const clientRef = useRef<Client | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      stopStreaming();
      if (clientRef.current?.connected) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const connectWebSocket = () => {
    const client = createWebSocketClient();
    
    client.onConnect = () => {
      setIsConnected(true);
      const newSessionId = Math.floor(Math.random() * 10000);
      setSessionId(newSessionId);
      
      client.subscribe(`/topic/session/${newSessionId}`, (message) => {
        const result: PredictionResult = JSON.parse(message.body);
        setPrediction(result);
      });

      client.publish({
        destination: `/app/session/${newSessionId}/join`,
        body: JSON.stringify({ userId: user?.id }),
      });

      toast({
        title: "Connected",
        description: "WebSocket connection established",
      });
    };

    client.onDisconnect = () => {
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "WebSocket connection closed",
        variant: "destructive",
      });
    };

    client.activate();
    clientRef.current = client;
  };

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;
      setIsStreaming(true);

      if (!isConnected) {
        connectWebSocket();
      }

      toast({
        title: "Camera started",
        description: "Sign detection is now active",
      });
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use sign detection",
        variant: "destructive",
      });
    }
  };

  const stopStreaming = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);

    if (clientRef.current?.connected && sessionId) {
      clientRef.current.publish({
        destination: `/app/session/${sessionId}/end`,
        body: JSON.stringify({ userId: user?.id }),
      });
    }

    toast({
      title: "Camera stopped",
      description: "Sign detection has been paused",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Live Sign Translation</h1>
        <p className="text-muted-foreground">Real-time ASL to text translation using AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Camera Feed</CardTitle>
                  <CardDescription>Position your hands clearly in the frame</CardDescription>
                </div>
                <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
                  <Activity className={`h-3 w-3 ${isConnected ? 'animate-pulse' : ''}`} />
                  {isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!isStreaming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center space-y-4">
                      <VideoOff className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Camera is off</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-3">
                {!isStreaming ? (
                  <Button onClick={startStreaming} size="lg" className="gradient-primary flex-1">
                    <Video className="mr-2 h-5 w-5" />
                    Start Detection
                  </Button>
                ) : (
                  <Button onClick={stopStreaming} size="lg" variant="destructive" className="flex-1">
                    <VideoOff className="mr-2 h-5 w-5" />
                    Stop Detection
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Prediction</CardTitle>
              <CardDescription>Real-time sign recognition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {prediction ? (
                <>
                  <div className="text-center p-6 bg-gradient-primary rounded-lg">
                    <p className="text-sm text-primary-foreground/80 mb-2">Detected Sign</p>
                    <p className="text-4xl font-bold text-primary-foreground">
                      {prediction.prediction}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-semibold">
                        {(prediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={prediction.confidence * 100} />
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  {isStreaming ? (
                    <>
                      <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary mb-4" />
                      <p className="text-muted-foreground">Waiting for signs...</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      Start detection to see predictions
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session ID:</span>
                <span className="font-mono">{sessionId || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={isStreaming ? "default" : "secondary"}>
                  {isStreaming ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User:</span>
                <span>{user?.username}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
