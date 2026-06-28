'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Loader } from '@react-three/drei';
import Experience from '@/components/canvas/Experience';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {!started && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <div className="text-center space-y-6 max-w-2xl px-6">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl md:text-8xl font-bold text-white tracking-tighter"
              >
                THE CORE
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase"
              >
                Lead Systems Architect
              </motion.p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={() => setStarted(true)}
                  className="px-12 py-4 border border-blue-500/50 bg-blue-500/10 text-white rounded-full hover:bg-blue-500/20 transition-all duration-300 backdrop-blur-sm group"
                >
                  <span className="group-hover:tracking-widest transition-all">ENTER FACILITY</span>
                </button>
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 text-xs font-mono">
              SYSTEM STATUS: ONLINE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full absolute inset-0 bg-[#020202]">
        <Canvas
          shadows
          camera={{ position: [0, 0, 15], fov: 45 }}
          gl={{ 
            antialias: true, 
            alpha: false,
            powerPreference: "high-performance"
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#050505');
          }}
        >
          {/* Using a clear fallback to avoid hidden canvas during loading */}
          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.2}>
              <Experience started={started} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
      
      <Loader />
    </main>
  );
}