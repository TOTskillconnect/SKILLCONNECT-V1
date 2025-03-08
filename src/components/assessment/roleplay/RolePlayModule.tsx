'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from '@/components/common/Timer';
import { Stage, DialogueNode, DialogueOption } from '@/types/roleplay';
import { sprintConflictScenario, dialogueNodes, characters } from '@/data/rolePlayScenarios';

interface RolePlayModuleProps {
  candidateId: string;
  role: string;
}

interface DialogueState {
  currentNode: DialogueNode;
  history: {
    node: DialogueNode;
    selectedOption?: DialogueOption;
  }[];
  scores: {
    communication: number;
    problemSolving: number;
    competency: number;
  };
}

export function RolePlayModule({ candidateId, role }: RolePlayModuleProps) {
  const [stage, setStage] = useState<Stage>('preparation');
  const [isReady, setIsReady] = useState(false);
  const [dialogue, setDialogue] = useState<DialogueState>({
    currentNode: dialogueNodes['start'],
    history: [],
    scores: {
      communication: 0,
      problemSolving: 0,
      competency: 0
    }
  });

  // Handle stage transitions
  const handleStageComplete = () => {
    switch (stage) {
      case 'preparation':
        setStage('execution');
        setIsReady(false); // Reset ready state for next stage
        break;
      case 'execution':
        setStage('reflection');
        break;
      case 'reflection':
        // Handle assessment completion
        console.log('Assessment completed', dialogue.scores);
        break;
    }
  };

  // Handle ready button click
  const handleReadyClick = () => {
    setIsReady(true);
    handleStageComplete();
  };

  const handleOptionSelect = (option: DialogueOption) => {
    const nextNode = dialogueNodes[option.nextNodeId];
    
    if (!nextNode) {
      console.error('Next node not found:', option.nextNodeId);
      return;
    }
    
    setDialogue(prev => ({
      currentNode: nextNode,
      history: [...prev.history, { node: prev.currentNode, selectedOption: option }],
      scores: {
        communication: prev.scores.communication + option.impacts.communication,
        problemSolving: prev.scores.problemSolving + option.impacts.problemSolving,
        competency: prev.scores.competency + option.impacts.competency
      }
    }));

    // If this was the last node (no more options), prepare to move to reflection
    if (nextNode.options.length === 0) {
      setTimeout(() => {
        handleStageComplete();
      }, 2000); // Give user time to read the final response
    }
  };

  const renderStageContent = () => {
    switch (stage) {
      case 'preparation':
        return (
          <div className="space-y-6">
            <div className="bg-[#f3f4f6] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#714b67] mb-2">Scenario Brief</h3>
              <p className="text-[#714b67]/80">{sprintConflictScenario.context}</p>
            </div>
            <div className="bg-[#f3f4f6] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#714b67] mb-2">Key Stakeholders</h3>
              <div className="grid grid-cols-2 gap-4">
                {characters.map(character => (
                  <div key={character.id} className="flex items-center gap-3 p-3 bg-[#ffffff] rounded-lg">
                    <span className="text-2xl">{character.avatar}</span>
                    <div>
                      <div className="font-medium text-[#714b67]">{character.name}</div>
                      <div className="text-sm text-[#714b67]/80">{character.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleReadyClick}
              className="w-full py-3 px-4 bg-[#fbb130] text-white rounded-lg hover:bg-[#fbb130]/90 transition-colors"
            >
              I'm Ready to Begin
            </button>
          </div>
        );

      case 'execution':
        return (
          <div className="space-y-6">
            {/* Dialogue History */}
            <div className="space-y-4">
              {dialogue.history.map(({ node, selectedOption }, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-3 bg-[#f3f4f6] rounded-lg p-4">
                    <span className="text-2xl">{node.speaker.avatar}</span>
                    <div>
                      <div className="font-medium text-[#714b67]">{node.speaker.name}</div>
                      <div className="text-[#714b67]/80">{node.text}</div>
                    </div>
                  </div>
                  {selectedOption && (
                    <div className="ml-12 bg-[#1ad3bb]/10 text-[#1ad3bb] rounded-lg p-4">
                      {selectedOption.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Current Node */}
            <AnimatePresence mode="wait">
              <motion.div
                key={dialogue.currentNode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-3 bg-[#f3f4f6] rounded-lg p-4">
                  <span className="text-2xl">{dialogue.currentNode.speaker.avatar}</span>
                  <div>
                    <div className="font-medium text-[#714b67]">{dialogue.currentNode.speaker.name}</div>
                    <div className="text-[#714b67]/80">{dialogue.currentNode.text}</div>
                  </div>
                </div>

                {dialogue.currentNode.options.length > 0 ? (
                  <div className="space-y-2">
                    {dialogue.currentNode.options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className="w-full p-4 text-left bg-[#ffffff] border rounded-lg hover:border-[#714b67] hover:shadow-md transition-all"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-[#714b67]/80 py-4">
                    Concluding conversation...
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        );

      case 'reflection':
        return (
          <div className="space-y-6">
            <div className="bg-[#f3f4f6] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#714b67] mb-4">Performance Summary</h3>
              <div className="space-y-4">
                {Object.entries(dialogue.scores).map(([category, score]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#714b67]/80 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-[#714b67]">{score} points</span>
                    </div>
                    <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1ad3bb] transition-all duration-500"
                        style={{ width: `${((score + 10) / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleStageComplete}
              className="w-full py-3 px-4 bg-[#fbb130] text-white rounded-lg hover:bg-[#fbb130]/90 transition-colors"
            >
              Complete Assessment
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Stage Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-[#714b67]">
            {stage === 'preparation' ? 'Preparation' :
             stage === 'execution' ? 'Role Play Exercise' :
             'Reflection'}
          </h2>
          <Timer
            timeLeft={
              stage === 'preparation' ? (isReady ? 0 : sprintConflictScenario.stages.preparation) :
              stage === 'execution' ? sprintConflictScenario.stages.execution :
              sprintConflictScenario.stages.reflection
            }
            onComplete={handleStageComplete}
            className="text-sm font-medium text-[#714b67]/80"
          />
        </div>
        <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1ad3bb] transition-all duration-300"
            style={{
              width: stage === 'preparation' ? '33%' :
                     stage === 'execution' ? '66%' :
                     '100%'
            }}
          />
        </div>
      </div>

      {/* Stage Content */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {renderStageContent()}
      </div>
    </div>
  );
} 