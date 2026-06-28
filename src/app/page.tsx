
'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
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
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <div className="text-center space-y-8 max-w-2xl px-6 relative">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
              >
                <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-2">
                  THE CORE
                </h1>
                <p className="text-blue-500 font-mono text-sm tracking-[0.5em] uppercase">
                  Lead Systems Architect // Port: 8080
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <button
                  onClick={() => setStarted(true)}
                  className="mt-8 px-16 py-5 border border-blue-500/40 bg-blue-500/5 text-white rounded-full hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-500 backdrop-blur-md group relative overflow-hidden"
                >
                  <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-500 font-mono uppercase text-xs">
                    Access System
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 w-full px-12 flex justify-between items-end">
              <div className="font-mono text-[10px] text-blue-500/40 space-y-1">
                <p>LATENCY: 14MS</p>
                <p>ENCRYPTION: AES-256</p>
              </div>
              <div className="font-mono text-[10px] text-blue-500/40">
                SYSTEM_STATUS: <span className="text-blue-400">NOMINAL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">Scroll to Navigate</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
          </div>
        </motion.div>
      )}

      <div className="w-full h-full absolute inset-0 bg-[#020202]">
        <Canvas
          shadows
          camera={{ position: [0, 5, 30], fov: 45 }}
          gl={{ antialias: true, stencil: false, depth: true }}
        >
          <Suspense fallback={null}>
            <ScrollControls pages={7} damping={0.3} infinite={false}>
              <Experience started={started} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
