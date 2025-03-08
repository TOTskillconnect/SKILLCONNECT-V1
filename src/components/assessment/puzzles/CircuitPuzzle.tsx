import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  x: number;
  y: number;
  type: 'input' | 'output' | 'gate';
  connections: string[];
  isActive: boolean;
}

interface Connection {
  from: string;
  to: string;
  isValid: boolean;
}

interface CircuitPuzzleProps {
  onComplete: (success: boolean, timeSpent: number) => void;
}

export function CircuitPuzzle({ onComplete }: CircuitPuzzleProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'in1', x: 20, y: 30, type: 'input', connections: [], isActive: true },
    { id: 'in2', x: 20, y: 70, type: 'input', connections: [], isActive: true },
    { id: 'gate1', x: 50, y: 50, type: 'gate', connections: [], isActive: false },
    { id: 'gate2', x: 80, y: 50, type: 'gate', connections: [], isActive: false },
    { id: 'out1', x: 120, y: 50, type: 'output', connections: [], isActive: false },
  ]);
  
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Check if circuit is complete
  useEffect(() => {
    const isCircuitComplete = nodes.every(node => node.isActive) && 
      connections.every(conn => conn.isValid);
    
    if (isCircuitComplete && !isComplete) {
      setIsComplete(true);
      const timeSpent = (Date.now() - startTime) / 1000;
      onComplete(true, timeSpent);
    }
  }, [nodes, connections, isComplete, onComplete, startTime]);

  const handleNodeClick = (nodeId: string) => {
    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else if (selectedNode !== nodeId) {
      // Create connection
      const newConnection: Connection = {
        from: selectedNode,
        to: nodeId,
        isValid: true
      };
      
      setConnections(prev => [...prev, newConnection]);
      
      // Update nodes
      setNodes(prev => prev.map(node => {
        if (node.id === nodeId || node.id === selectedNode) {
          return {
            ...node,
            connections: [...node.connections, node.id === selectedNode ? nodeId : selectedNode],
            isActive: true
          };
        }
        return node;
      }));
      
      setSelectedNode(null);
    } else {
      setSelectedNode(null);
    }
  };

  return (
    <div className="relative w-full h-[400px] bg-gray-900 rounded-xl p-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Nodes */}
      <div className="relative z-10">
        <svg className="w-full h-full">
          {/* Connections */}
          {connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <motion.line
                key={`${conn.from}-${conn.to}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={conn.isValid ? '#22c55e' : '#ef4444'}
                strokeWidth="2"
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Selected Node Connection Preview */}
          {selectedNode && (
            <motion.line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              x1={`${nodes.find(n => n.id === selectedNode)?.x}%`}
              y1={`${nodes.find(n => n.id === selectedNode)?.y}%`}
              x2="50%"
              y2="50%"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4"
              className="transition-all duration-100"
              style={{
                cursor: 'none'
              }}
            />
          )}
        </svg>

        {/* Node Elements */}
        {nodes.map(node => (
          <motion.button
            key={node.id}
            onClick={() => handleNodeClick(node.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full 
              ${node.isActive ? 'bg-emerald-500' : 'bg-gray-600'} 
              ${selectedNode === node.id ? 'ring-4 ring-blue-500' : ''} 
              hover:ring-2 hover:ring-blue-400 transition-all duration-200`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">{node.type} node</span>
            <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 
              text-xs font-medium ${node.isActive ? 'text-emerald-400' : 'text-gray-400'}`}>
              {node.type}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
        text-center text-gray-400 text-sm bg-gray-800/80 px-4 py-2 rounded-lg">
        Click nodes to create connections. Complete the circuit to proceed.
      </div>
    </div>
  );
} 