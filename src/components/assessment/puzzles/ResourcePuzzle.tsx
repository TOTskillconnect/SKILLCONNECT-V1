import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Resource {
  id: string;
  name: string;
  amount: number;
  color: string;
  icon: string;
  allocated: { taskId: string; amount: number }[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  requirements: { resourceId: string; amount: number }[];
  reward: number;
  priority: 'low' | 'medium' | 'high';
  deadline: number;
  completed: boolean;
}

interface ResourcePuzzleProps {
  onComplete: (success: boolean, timeSpent: number) => void;
}

export function ResourcePuzzle({ onComplete }: ResourcePuzzleProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [startTime] = useState(Date.now());
  const [score, setScore] = useState(0);
  const [resources, setResources] = useState<Resource[]>([
    { 
      id: 'time', 
      name: 'Time', 
      amount: 100, 
      color: 'emerald', 
      icon: '⏰',
      allocated: []
    },
    { 
      id: 'energy', 
      name: 'Energy', 
      amount: 100, 
      color: 'blue', 
      icon: '⚡',
      allocated: []
    },
    { 
      id: 'focus', 
      name: 'Focus', 
      amount: 100, 
      color: 'purple', 
      icon: '🎯',
      allocated: []
    },
    { 
      id: 'budget', 
      name: 'Budget', 
      amount: 1000, 
      color: 'amber', 
      icon: '💰',
      allocated: []
    }
  ]);
  
  const [tasks] = useState<Task[]>([
    {
      id: 't1',
      name: 'Critical Bug Fix',
      description: 'Deploy urgent security patches and system upgrades',
      requirements: [
        { resourceId: 'time', amount: 40 },
        { resourceId: 'energy', amount: 30 },
        { resourceId: 'focus', amount: 50 },
        { resourceId: 'budget', amount: 300 }
      ],
      reward: 40,
      priority: 'high',
      deadline: 45,
      completed: false
    },
    {
      id: 't2',
      name: 'Team Training Program',
      description: 'Implement new skill development initiative',
      requirements: [
        { resourceId: 'time', amount: 30 },
        { resourceId: 'energy', amount: 40 },
        { resourceId: 'focus', amount: 20 },
        { resourceId: 'budget', amount: 200 }
      ],
      reward: 25,
      priority: 'medium',
      deadline: 60,
      completed: false
    },
    {
      id: 't3',
      name: 'Client Project Delivery',
      description: 'Complete and deliver major client deliverables',
      requirements: [
        { resourceId: 'time', amount: 50 },
        { resourceId: 'energy', amount: 45 },
        { resourceId: 'focus', amount: 40 },
        { resourceId: 'budget', amount: 400 }
      ],
      reward: 35,
      priority: 'high',
      deadline: 30,
      completed: false
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [manualAllocation, setManualAllocation] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!showInstructions && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showInstructions, timeLeft]);

  const handleAllocationChange = (taskId: string, resourceId: string, amount: number) => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;

    // Calculate current allocations for this resource excluding the current task
    const otherAllocations = resource.allocated
      .filter(a => a.taskId !== taskId)
      .reduce((sum, a) => sum + a.amount, 0);

    // Check if we have enough resources available
    const availableAmount = resource.amount - otherAllocations;
    if (amount > availableAmount) return;

    setManualAllocation(prev => ({
      ...prev,
      [`${taskId}-${resourceId}`]: amount
    }));
  };

  const handleSubmit = () => {
    // Apply all manual allocations
    const updatedResources = resources.map(resource => {
      const newAllocated = tasks.map(task => {
        const allocationKey = `${task.id}-${resource.id}`;
        const amount = manualAllocation[allocationKey] || 0;
        return { taskId: task.id, amount };
      }).filter(a => a.amount > 0);

      return {
        ...resource,
        allocated: newAllocated
      };
    });

    // Check which tasks are completed
    const completedTasks = tasks.map(task => {
      const isComplete = task.requirements.every(req => {
        const resource = updatedResources.find(r => r.id === req.resourceId);
        const allocation = resource?.allocated.find(a => a.taskId === task.id);
        return allocation && allocation.amount >= req.amount;
      });

      if (isComplete) {
        setScore(prev => prev + task.reward);
      }

      return {
        ...task,
        completed: isComplete
      };
    });

    const success = completedTasks.filter(t => t.completed).length >= 2;
    const timeSpent = (Date.now() - startTime) / 1000;
    onComplete(success, timeSpent);
  };

  if (showInstructions) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Welcome to the Allocation Arena
        </h2>
        <div className="space-y-4 text-gray-600">
          <p className="font-medium text-gray-800">Master the art of resource allocation:</p>
          <div className="pl-4">
            <p>• Select tasks and allocate resources using the sliders</p>
            <p>• Monitor resource levels and task requirements</p>
            <p>• Complete high-priority tasks within the time limit</p>
            <p>• Submit your allocations when ready</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Success Criteria</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Complete at least 2 tasks</li>
              <li>• Prioritize high-priority tasks</li>
              <li>• Finish within 5 minutes</li>
              <li>• Optimize resource allocation</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setShowInstructions(false)}
          className="w-full mt-6 py-3 px-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          Start Challenge
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">Challenge Progress</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{score}</span>
              <span className="text-sm text-gray-500">Points</span>
            </div>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg text-lg font-medium ${
          timeLeft > 180 ? 'bg-emerald-100 text-emerald-700' :
          timeLeft > 60 ? 'bg-amber-100 text-amber-700' :
          'bg-red-100 text-red-700'
        }`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Resources Panel */}
        <div className="col-span-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Resources</h3>
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={`p-4 rounded-lg border transition-all
                ${selectedTask ? 'cursor-pointer hover:border-gray-300 hover:shadow-md' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{resource.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{resource.name}</span>
                    <span className={`text-${resource.color}-600 font-medium`}>
                      {resource.amount - resource.allocated.reduce((sum, a) => sum + a.amount, 0)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-${resource.color}-500`}
                      initial={{ width: '100%' }}
                      animate={{ 
                        width: `${((resource.amount - resource.allocated.reduce((sum, a) => sum + a.amount, 0)) / 
                          (resource.id === 'budget' ? 1000 : 100)) * 100}%` 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tasks Panel */}
        <div className="col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Submit Allocations
            </button>
          </div>
          
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-6 rounded-xl border transition-all ${
                  task.completed ? 'bg-emerald-50 border-emerald-200' :
                  selectedTask === task.id ? 'border-accent shadow-md' :
                  'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        task.priority === 'high' 
                          ? 'bg-red-100 text-red-700'
                          : task.priority === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {task.priority} priority
                      </span>
                    </div>
                    <p className="text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Reward:</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      +{task.reward}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {task.requirements.map((requirement) => {
                    const resource = resources.find(r => r.id === requirement.resourceId);
                    if (!resource) return null;

                    const allocation = manualAllocation[`${task.id}-${requirement.resourceId}`] || 0;
                    const progress = (allocation / requirement.amount) * 100;

                    return (
                      <div key={`${task.id}-${requirement.resourceId}`} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{resource.icon}</span>
                            <span className="text-sm font-medium text-gray-900">{resource.name}</span>
                          </div>
                          <span className={`text-sm font-medium text-${resource.color}-600`}>
                            {allocation}/{requirement.amount}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={requirement.amount * 2}
                          value={allocation}
                          onChange={(e) => handleAllocationChange(task.id, requirement.resourceId, parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-accent"
                        />
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-${resource.color}-500`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>Deadline: {task.deadline}s</span>
                  <span>Progress: {Math.round(
                    (task.requirements.reduce((acc, req) => {
                      const allocation = manualAllocation[`${task.id}-${req.resourceId}`] || 0;
                      return acc + (allocation / req.amount);
                    }, 0) / task.requirements.length) * 100
                  )}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 