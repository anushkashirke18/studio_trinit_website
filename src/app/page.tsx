
'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Main landing page featuring the TRINIT logo in the center of the hero section,
 * followed by a high-impact typography section and other scrollable content.
 */
export default function Home() {
  const statement = [
    "CRAFTING",
    "UNFORGETTABLE",
    "DIGITAL",
    "EXPERIENCES",
    "FOR",
    "AMBITIOUS",
    "CLIENTS"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 text-center">
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
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Scroll</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
        </motion.div>
      </section>

      {/* High-Impact Statement Section */}
      <section className="w-full py-32 md:py-48 px-6 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col gap-2">
          {statement.map((word, i) => (
            <motion.h2 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase leading-[0.85] tracking-tighter text-foreground"
            >
              {word}
            </motion.h2>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full max-w-7xl px-6 py-32 md:py-48 flex flex-col md:flex-row gap-12 items-start justify-between">
        <div className="w-full md:w-1/2 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">01 / Vision</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
            Crafting the future of <br/> digital interactions.
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-md">
            We believe in the intersection of aesthetics and utility. TRINIT is dedicated to building experiences that feel natural, intuitive, and strikingly beautiful.
          </p>
        </div>
      </section>

      {/* Expertise / Services Section */}
      <section className="w-full bg-foreground/5 py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="text-xs font-code text-muted-foreground">02.1</span>
            <h3 className="text-2xl font-headline font-bold">Innovation</h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Pushing the boundaries of what's possible with modern web technologies and AI-driven interfaces.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-xs font-code text-muted-foreground">02.2</span>
            <h3 className="text-2xl font-headline font-bold">Design</h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Minimalist principles combined with powerful visual storytelling to create memorable brands.
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-xs font-code text-muted-foreground">02.3</span>
            <h3 className="text-2xl font-headline font-bold">Performance</h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Engineered for speed and accessibility, ensuring your digital presence is felt everywhere instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="w-full border-t border-foreground/5 py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Based in the Digital Ether</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase tracking-widest hover:text-muted-foreground transition-colors">Twitter</a>
            <a href="#" className="text-xs uppercase tracking-widest hover:text-muted-foreground transition-colors">LinkedIn</a>
            <a href="#" className="text-xs uppercase tracking-widest hover:text-muted-foreground transition-colors">Email</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
