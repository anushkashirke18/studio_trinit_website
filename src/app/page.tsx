'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Experience from '@/components/canvas/Experience';
import CameraRig from '@/components/canvas/CameraRig';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <main className="h-screen w-full bg-black overflow-hidden">
      {/* UI Overlay */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-8"
            >
              <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter uppercase">
                The <span className="text-white/20">Core</span>
              </h1>
              <p className="max-w-md mx-auto text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
                Advanced Portfolio Interface // System Version 3.4.0
              </p>
              <button
                onClick={() => setStarted(true)}
                className="group relative px-12 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:pr-16"
              >
                <span className="relative z-10">Access System</span>
                <div className="absolute top-0 right-0 h-full w-0 bg-white/20 transition-all group-hover:w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Environment */}
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 50]} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.2}>
            <CameraRig started={started} />
            <Experience started={started} />
            
            <Scroll html>
              {/* Optional: Add HTML markers or secondary UI here */}
            </Scroll>
          </ScrollControls>
        </Suspense>

        {/* Global Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4488ff" />
        <spotLight
          position={[0, 10, 5]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />
      </Canvas>

      {/* Persistent HUD */}
      {started && (
        <div className="fixed bottom-8 left-8 z-40 flex items-center gap-4 text-white/20 font-mono text-[10px] tracking-widest uppercase pointer-events-none">
          <div className="h-[1px] w-12 bg-white/20" />
          <span>Scroll to Navigate Facility</span>
        </div>
      )}
    </main>
  );
}
