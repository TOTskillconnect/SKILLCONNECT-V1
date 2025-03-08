import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'customer';
  sentiment?: 'positive' | 'neutral' | 'negative';
  timestamp: number;
}

interface ResponseOption {
  id: string;
  text: string;
  style: 'empathetic' | 'direct' | 'professional';
  impact: {
    satisfaction: number;
    resolution: number;
  };
}

interface ConversationPuzzleProps {
  onComplete: (success: boolean, timeSpent: number, responses: string[]) => void;
}

export function ConversationPuzzle({ onComplete }: ConversationPuzzleProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      text: "I've been waiting for a response for days about my refund request. This is unacceptable!",
      sender: 'customer',
      sentiment: 'negative',
      timestamp: Date.now()
    }
  ]);

  const [currentOptions, setCurrentOptions] = useState<ResponseOption[]>([
    {
      id: 'r1',
      text: "I completely understand your frustration. Let me look into this right away and make it a priority.",
      style: 'empathetic',
      impact: { satisfaction: 8, resolution: 6 }
    },
    {
      id: 'r2',
      text: "I'll check the status of your refund request now. What's your order number?",
      style: 'direct',
      impact: { satisfaction: 5, resolution: 8 }
    },
    {
      id: 'r3',
      text: "Our standard processing time for refunds is 5-7 business days. I can assist you with checking the status.",
      style: 'professional',
      impact: { satisfaction: 4, resolution: 7 }
    }
  ]);

  const [customerSatisfaction, setCustomerSatisfaction] = useState(50);
  const [resolutionProgress, setResolutionProgress] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [startTime] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else {
      const success = customerSatisfaction >= 70 && resolutionProgress >= 80;
      const timeSpent = (Date.now() - startTime) / 1000;
      onComplete(success, timeSpent, responses);
    }
  }, [timeLeft, customerSatisfaction, resolutionProgress, responses, onComplete, startTime]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionSelect = (option: ResponseOption) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: option.text,
      sender: 'user',
      timestamp: Date.now()
    }]);

    // Update metrics
    setCustomerSatisfaction(prev => Math.min(100, prev + option.impact.satisfaction));
    setResolutionProgress(prev => Math.min(100, prev + option.impact.resolution));
    setResponses(prev => [...prev, option.text]);

    // Simulate customer response after a delay
    setTimeout(() => {
      let response: Message;
      if (resolutionProgress + option.impact.resolution >= 80) {
        response = {
          id: Date.now().toString(),
          text: "Thank you for your help. I appreciate you taking care of this so quickly.",
          sender: 'customer',
          sentiment: 'positive',
          timestamp: Date.now()
        };
      } else {
        response = {
          id: Date.now().toString(),
          text: "I'm still not entirely satisfied with this situation.",
          sender: 'customer',
          sentiment: 'neutral',
          timestamp: Date.now()
        };
      }
      setMessages(prev => [...prev, response]);
    }, 1000);

    // Update available options
    setCurrentOptions(getNextOptions(option.style));
  };

  const getNextOptions = (previousStyle: string): ResponseOption[] => {
    // This would be more sophisticated in a real implementation
    return [
      {
        id: 'follow1',
        text: "I've expedited your refund request. You should see it processed within 24 hours.",
        style: 'empathetic',
        impact: { satisfaction: 7, resolution: 9 }
      },
      {
        id: 'follow2',
        text: "Let me explain the next steps in the refund process.",
        style: 'professional',
        impact: { satisfaction: 5, resolution: 7 }
      },
      {
        id: 'follow3',
        text: "Is there anything else you need assistance with?",
        style: 'direct',
        impact: { satisfaction: 4, resolution: 5 }
      }
    ];
  };

  return (
    <div className="relative w-full min-h-[400px] bg-gray-900 rounded-xl p-8">
      {/* Header Metrics */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-sm font-medium text-gray-300 mb-1">Customer Satisfaction</div>
            <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: '50%' }}
                animate={{ width: `${customerSatisfaction}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-300 mb-1">Resolution Progress</div>
            <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500"
                initial={{ width: '0%' }}
                animate={{ width: `${resolutionProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-lg text-sm font-medium
          ${timeLeft > 60 ? 'bg-emerald-500/20 text-emerald-300' :
            timeLeft > 30 ? 'bg-amber-500/20 text-amber-300' :
            'bg-red-500/20 text-red-300'}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4 h-48 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}>
                <p className="text-sm">{message.text}</p>
                {message.sentiment && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs opacity-75">
                      {message.sentiment === 'positive' ? '😊' :
                       message.sentiment === 'negative' ? '😠' : '😐'}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Response Options */}
      <div className="space-y-2">
        {currentOptions.map(option => (
          <motion.button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className="w-full p-3 text-left bg-gray-800 hover:bg-gray-700 
              rounded-lg text-gray-200 text-sm transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {option.text}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">
                {option.style === 'empathetic' ? '💭 Empathetic' :
                 option.style === 'direct' ? '⚡ Direct' : '👔 Professional'}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
        text-center text-gray-400 text-sm bg-gray-800/80 px-4 py-2 rounded-lg">
        Choose responses carefully to resolve the customer's concern while maintaining satisfaction.
      </div>
    </div>
  );
} 