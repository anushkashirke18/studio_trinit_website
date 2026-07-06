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
    <main className="h-screen w-full bg-black overflow-hidden font-mono">
      {/* Cinematic UI Overlay */}
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
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center space-y-12"
            >
              <div className="space-y-2">
                <h1 className="text-6xl md:text-9xl font-headline font-black tracking-tighter uppercase leading-none">
                  THE <span className="text-blue-600">CORE</span>
                </h1>
                <div className="h-1 w-24 bg-blue-600 mx-auto" />
              </div>
              
              <div className="space-y-1 opacity-40 text-[10px] tracking-[0.4em] uppercase">
                <p>Advanced Portfolio Interface</p>
                <p>System Version 4.0.1 // Secure Connection Established</p>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="group relative px-16 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-sm overflow-hidden transition-all hover:bg-blue-600 hover:text-white"
              >
                <span className="relative z-10">Access System</span>
                <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Facility Canvas */}
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 80]} />
        
        <Suspense fallback={null}>
          {/* ScrollControls: 8 pages for the full Z-depth journey */}
          <ScrollControls pages={10} damping={0.25}>
            <CameraRig started={started} />
            <Experience started={started} />
            
            <Scroll html>
              {/* Overlay elements if needed */}
            </Scroll>
          </ScrollControls>
        </Suspense>

        {/* High-Fidelity Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 15, 10]} intensity={2.5} color="#4488ff" />
        <spotLight
          position={[0, 20, 5]}
          angle={0.2}
          penumbra={0.5}
          intensity={5}
          castShadow
        />
        
        {/* Fill Lights for Sections */}
        <pointLight position={[0, 5, -25]} intensity={2} color="#ffffff" distance={20} />
        <pointLight position={[0, 5, -55]} intensity={2} color="#ffffff" distance={30} />
        <pointLight position={[0, 5, -85]} intensity={2} color="#ffffff" distance={30} />
      </Canvas>

      {/* Persistent HUD */}
      {started && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-12 left-12 z-40 flex items-center gap-6 text-white/30 font-mono text-[9px] tracking-[0.5em] uppercase pointer-events-none"
        >
          <div className="h-[1px] w-16 bg-white/20" />
          <span>Scroll to Navigate Facility</span>
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        </motion.div>
      )}
    </main>
  );
}
