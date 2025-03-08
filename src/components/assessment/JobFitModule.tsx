'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  ClockIcon,
  ChartBarIcon,
  ArrowPathIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/outline';

// Using a stock video of a business meeting/presentation for MVP
const DEMO_SCENARIO = {
  title: "Onboarding a New Client Under Pressure",
  videoUrl: "/videos/scenario.mp4", // Updated to point to videos directory
  checkpoints: [
    {
      id: 1,
      timestamp: 15,
      question: "The client requests a feature outside the agreed scope. How do you respond?",
      options: [
        { 
          id: "1a", 
          text: "Accommodate the request immediately to maintain client satisfaction", 
          approach: "flexible" 
        },
        { 
          id: "1b", 
          text: "Negotiate a balanced solution considering timeline and resources", 
          approach: "balanced" 
        },
        { 
          id: "1c", 
          text: "Maintain scope and suggest addressing changes in next sprint", 
          approach: "structured" 
        }
      ]
    },
    {
      id: 2,
      timestamp: 30,
      question: "Your teammate is swamped, and the client's deadline is approaching. What's your strategy?",
      options: [
        {
          id: "2a",
          text: "Take on extra tasks yourself to meet the deadline",
          approach: "proactive"
        },
        {
          id: "2b",
          text: "Collaborate with the team to redistribute workload",
          approach: "collaborative"
        },
        {
          id: "2c",
          text: "Renegotiate the timeline with the client",
          approach: "pragmatic"
        }
      ]
    },
    {
      id: 3,
      timestamp: 45,
      question: "It's time to present progress to the CEO. What do you highlight?",
      options: [
        {
          id: "3a",
          text: "Focus on team collaboration and problem-solving approach",
          approach: "team-oriented"
        },
        {
          id: "3b",
          text: "Emphasize quick wins and immediate value delivered",
          approach: "results-focused"
        },
        {
          id: "3c",
          text: "Present honest assessment of challenges and solutions",
          approach: "transparent"
        }
      ]
    }
  ]
};

interface JobFitModuleProps {
  candidateId: string;
  role: string;
}

interface Checkpoint {
  id: number;
  timestamp: number;
  question: string;
  options: Array<{
    id: string;
    text: string;
    approach: string;
  }>;
}

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error: string | null;
}

export function JobFitModule({ candidateId, role }: JobFitModuleProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'scenario' | 'summary'>('intro');
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isLoading: true,
    error: null
  });
  const [currentCheckpoint, setCurrentCheckpoint] = useState<Checkpoint | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video state management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initialize video
    video.load();
    
    const updateVideoState = () => {
      if (!video) return;
      setVideoState(prev => ({
        ...prev,
        isPlaying: !video.paused,
        currentTime: video.currentTime || 0,
        duration: video.duration || 0,
        isLoading: video.readyState < 4
      }));
    };

    const handleError = (e: Event) => {
      console.error('Video Error:', e);
      const videoElement = e.target as HTMLVideoElement;
      console.log('Video error details:', {
        error: videoElement.error,
        networkState: videoElement.networkState,
        readyState: videoElement.readyState,
        src: videoElement.src,
        currentSrc: videoElement.currentSrc
      });
      setVideoState(prev => ({
        ...prev,
        error: videoElement.error?.message || 'Error loading video',
        isLoading: false
      }));
    };

    const handleLoaded = () => {
      console.log('Video loaded successfully');
      console.log('Video details:', {
        duration: video.duration,
        readyState: video.readyState,
        networkState: video.networkState,
        src: video.src,
        currentSrc: video.currentSrc
      });
      updateVideoState();
    };

    const handleLoadStart = () => {
      console.log('Video load started');
      setVideoState(prev => ({ ...prev, isLoading: true, error: null }));
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoState(prev => ({ ...prev, isLoading: false }));
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', updateVideoState);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', updateVideoState);
    };
  }, []);

  // Checkpoint detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkForCheckpoint = () => {
      const currentTime = video.currentTime;
      
      // Find the next unaddressed checkpoint
      const nextCheckpoint = DEMO_SCENARIO.checkpoints.find(cp => {
        const hasBeenAnswered = choices.some(choice => 
          cp.options.some(opt => opt.id === choice)
        );
        const isInTimeRange = Math.abs(currentTime - cp.timestamp) < 0.5;
        return !hasBeenAnswered && isInTimeRange;
      });

      if (nextCheckpoint) {
        video.pause();
        setCurrentCheckpoint(nextCheckpoint);
        setShowOverlay(true);
        setTimeRemaining(30);
      }
    };

    const handleTimeUpdate = () => {
      checkForCheckpoint();
    };

    const handlePlay = () => {
      setShowOverlay(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
    };
  }, [choices]);

  // Timer management
  useEffect(() => {
    if (!timeRemaining || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleTimeUp = () => {
    if (!currentCheckpoint) return;
    const middleOption = currentCheckpoint.options[1];
    handleOptionSelect(middleOption.id);
  };

  const handleStartScenario = () => {
    setCurrentStep('scenario');
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
        setVideoState(prev => ({
          ...prev,
          error: 'Failed to start video playback',
          isLoading: false
        }));
      });
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (!currentCheckpoint) return;

    setChoices(prev => [...prev, optionId]);
    setTimeRemaining(null);
    setShowOverlay(false);
    setCurrentCheckpoint(null);

    const isLastCheckpoint = currentCheckpoint.id === DEMO_SCENARIO.checkpoints[DEMO_SCENARIO.checkpoints.length - 1].id;

    if (isLastCheckpoint) {
      setCurrentStep('summary');
    } else {
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    return `0:${seconds.toString().padStart(2, '0')}`;
  };

  const getCurrentApproach = () => {
    const approaches = choices.map(choiceId => {
      const checkpoint = DEMO_SCENARIO.checkpoints.find(cp => 
        cp.options.some(opt => opt.id === choiceId)
      );
      const option = checkpoint?.options.find(opt => opt.id === choiceId);
      return option?.approach || '';
    });

    // Simple analysis of approach style
    const uniqueApproaches = Array.from(new Set(approaches));
    if (uniqueApproaches.length === 1) {
      return `You showed a consistent ${uniqueApproaches[0]} approach`;
    }
    return 'You demonstrated a balanced mix of different approaches';
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoState(prev => ({
        ...prev,
        currentTime: Math.floor(videoRef.current?.currentTime || 0),
        duration: Math.floor(videoRef.current?.duration || 0)
      }));
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {currentStep === 'intro' && (
        <div className="text-center p-8 bg-[#ffffff] rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-[#714b67] mb-4">{DEMO_SCENARIO.title}</h2>
          <p className="text-[#714b67]/80 mb-8">
            Experience a real-world client onboarding scenario. You'll face three key decisions 
            that will reveal your natural approach to client management and problem-solving.
          </p>
          <button
            onClick={handleStartScenario}
            className="px-6 py-3 bg-[#fbb130] text-white rounded-lg hover:bg-[#fbb130]/90 transition-colors"
          >
            Start Scenario
          </button>
        </div>
      )}

      {currentStep === 'scenario' && (
        <div className="relative aspect-video bg-[#f3f4f6] rounded-xl overflow-hidden">
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => videoRef.current?.play()}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <PlayIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => videoRef.current?.pause()}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <PauseIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm font-medium">
                {videoState.currentTime}s / {videoState.duration}s
              </div>
            </div>
          </div>

          {/* Loading State */}
          {videoState.isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f3f4f6]">
              <div className="text-[#714b67]">Loading scenario...</div>
            </div>
          )}

          {/* Error State */}
          {videoState.error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f3f4f6]">
              <div className="text-[#fbb130]">{videoState.error}</div>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadStart={() => setVideoState(prev => ({ ...prev, isLoading: true }))}
            onLoadedData={() => setVideoState(prev => ({ ...prev, isLoading: false }))}
            onError={() => setVideoState(prev => ({
              ...prev,
              error: 'Failed to load video',
              isLoading: false
            }))}
          >
            <source src="/demo-scenario.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {currentStep === 'summary' && (
        <div className="space-y-6">
          <div className="bg-[#ffffff] rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#714b67] mb-6">Scenario Complete</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#f3f4f6] rounded-lg">
                <span className="text-[#714b67]/80">Decision Style</span>
                <span className="text-lg font-semibold text-[#714b67]">
                  {getCurrentApproach()}
                </span>
              </div>
              <div className="space-y-4">
                {DEMO_SCENARIO.checkpoints.map((checkpoint, index) => {
                  const selectedOption = checkpoint.options.find(opt => 
                    choices[index] === opt.id
                  );
                  return (
                    <div key={checkpoint.id} className="bg-[#f3f4f6] rounded-lg p-4">
                      <h3 className="font-medium text-[#714b67] mb-2">
                        {checkpoint.question}
                      </h3>
                      {selectedOption && (
                        <div className="bg-[#ffffff] rounded-lg p-3 text-[#714b67]/80">
                          {selectedOption.text}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 