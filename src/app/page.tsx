
'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Main landing page featuring the TRINIT logo in the center.
 * Uses Framer Motion for a smooth entry animation.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 space-y-4"
      >
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.25em] text-foreground font-headline uppercase select-none">
          TRINIT
        </h1>
        
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
          className="flex items-center justify-center gap-8"
        >
          <div className="h-[1px] w-12 md:w-20 bg-foreground/20" />
          <p className="text-xs md:text-sm uppercase tracking-[0.8em] text-muted-foreground font-body font-light whitespace-nowrap">
            Digital Excellence
          </p>
          <div className="h-[1px] w-12 md:w-20 bg-foreground/20" />
        </motion.div>
      </motion.div>
      
      {/* Subtle background glow to enhance the logo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--foreground),0.03)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
