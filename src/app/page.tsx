
'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Main landing page featuring the TRINIT logo in the center of the hero section,
 * followed by a high-impact typography section with "Thunder" styling and editorial overlays.
 * Proportions and colors are tuned for an elegant, editorial agency aesthetic.
 */
export default function Home() {
  const rows = [
    { items: [{ word: "CRAFTING", overlay: "designing" }] },
    { items: [{ word: "UNFORGETTABLE", overlay: "premium - luxury" }] },
    { items: [{ word: "DIGITAL", overlay: "web - mobile" }] },
    { items: [{ word: "EXPERIENCES", overlay: "brands & websites" }] },
    { items: [{ word: "FOR" }, { word: "AMBITIOUS", overlay: "extraordinary" }] },
    { items: [{ word: "CLIENTS", overlay: "people" }] }
  ];

  const FONT_SIZE_MAX = "260.48px";
  const LINE_HEIGHT_MAX = "248.832px";

  const getOverlaySize = (overlay: string) => {
    switch (overlay) {
      case 'premium - luxury': return 'clamp(18px, 6.5vw, 92px)';
      case 'designing': return 'clamp(17px, 6.2vw, 88px)';
      case 'extraordinary': return 'clamp(14px, 5.5vw, 80px)';
      case 'web - mobile': return 'clamp(16px, 6vw, 84px)';
      case 'brands & websites': return 'clamp(16px, 6vw, 84px)';
      case 'people': return 'clamp(16px, 6vw, 84px)';
      default: return 'clamp(16px, 6vw, 78px)';
    }
  };

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger each row
      },
    },
  };

  const rowVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger words within a row (for "FOR" and "AMBITIOUS")
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      
      {/* Hero Section - The Brand Mark */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.35em] text-foreground font-headline uppercase select-none mr-[-0.35em]">
            TRINIT
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
            className="flex items-center justify-center gap-6 mt-8 overflow-hidden"
          >
            <div className="h-[1px] flex-1 bg-foreground/20" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-muted-foreground font-body font-light whitespace-nowrap mr-[-0.8em]">
              Digital Excellence
            </p>
            <div className="h-[1px] flex-1 bg-foreground/20" />
          </motion.div>
        </motion.div>
        
        {/* Subtle background texture/glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--foreground),0.02)_0%,transparent_100%)] pointer-events-none" />
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <p className="text-[9px] uppercase tracking-[0.6em] text-muted-foreground ml-[0.6em]">Explore</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-foreground/40 to-transparent" />
        </motion.div>
      </section>

      {/* High-Impact Statement Section */}
      <section className="w-full py-24 md:py-40 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div 
          className="flex flex-col gap-0 items-center w-full max-w-[100vw]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {rows.map((row, i) => (
            <motion.div
              key={i}
              className="relative w-full flex flex-row flex-wrap justify-center items-center gap-x-4 md:gap-x-12"
              variants={rowVariants}
            >
              {row.items.map((item, itemIndex) => (
                <motion.div 
                  key={itemIndex} 
                  className="relative inline-block"
                  variants={itemVariants}
                >
                  <h2 
                    style={{ 
                      fontSize: `clamp(32px, 16vw, ${FONT_SIZE_MAX})`,
                      lineHeight: `clamp(28px, 15vw, ${LINE_HEIGHT_MAX})`
                    }}
                    className="font-bold font-thunder uppercase tracking-tight text-foreground whitespace-nowrap select-none"
                  >
                    {item.word}
                  </h2>
                  
                  {/* Overlays for specific words */}
                  {item.overlay && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <span
                        style={{
                          fontSize: getOverlaySize(item.overlay),
                        }}
                        className="font-playground italic lowercase text-accent whitespace-nowrap"
                      >
                        {item.overlay}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="w-full max-w-7xl px-6 py-32 md:py-48 flex flex-col md:flex-row gap-16 items-start justify-between">
        <div className="w-full md:w-1/2 space-y-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-semibold">01 / The Narrative</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
            We build digital artifacts <br/> that resonate globally.
          </h2>
        </div>
        <div className="max-w-md w-full md:w-1/2 mt-4">
          <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed font-light">
            TRINIT is an boutique studio where code meets canvas. We specialize in the intersection of high-end aesthetics and technical precision. Every pixel is a decision.
          </p>
        </div>
      </section>

      {/* Capability Grid */}
      <section className="w-full bg-foreground/[0.02] border-y border-foreground/5 py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          <div className="space-y-6">
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Capabilities . 01</span>
            <h3 className="text-2xl font-headline font-bold">Innovation</h3>
            <p className="text-muted-foreground font-body leading-relaxed text-sm">
              Architecting solutions that leverage the latest in GenAI and web performance to give you a competitive edge.
            </p>
          </div>
          <div className="space-y-6">
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Capabilities . 02</span>
            <h3 className="text-2xl font-headline font-bold">Visual Language</h3>
            <p className="text-muted-foreground font-body leading-relaxed text-sm">
              Creating bespoke design systems that speak your brand's truth with clarity and intentionality.
            </p>
          </div>
          <div className="space-y-6">
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Capabilities . 03</span>
            <h3 className="text-2xl font-headline font-bold">Strategy</h3>
            <p className="text-muted-foreground font-body leading-relaxed text-sm">
              Data-driven insights meet creative intuition to ensure your digital roadmap leads to tangible growth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-foreground/5 py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="text-xl font-headline font-bold tracking-tighter">TRINIT.</h4>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">© 2024 All Rights Reserved</p>
          </div>
          
          <div className="flex gap-10">
            {['Instagram', 'LinkedIn', 'Twitter', 'Email'].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-[10px] uppercase tracking-[0.4em] font-medium hover:text-accent transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
          
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Digital Ether / Global</p>
        </div>
      </footer>

    </div>
  );
}
