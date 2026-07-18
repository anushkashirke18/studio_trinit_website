
'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Main landing page featuring the TRINIT logo in the center of the hero section,
 * followed by a high-impact typography section with character-level scroll reveal.
 * Characters slide in from the left into their final positions for a premium boutique feel.
 * The animation re-triggers every time the section enters the viewport.
 */
export default function Home() {
  const rows = [
    { items: [{ word: "CRAFTING", overlay: "designing" }] },
    { items: [{ word: "UNFORGETTABLE", overlay: "premium - luxury" }] },
    { items: [{ word: "DIGITAL", overlay: "web - mobile" }] },
    { items: [{ word: "EXPERIENCES", overlay: "brands & websites" }] },
    { items: [{ word: "FOR", overlay: null }, { word: "AMBITIOUS", overlay: "extraordinary" }] },
    { items: [{ word: "CLIENTS", overlay: "people" }] }
  ];

  const FONT_SIZE_MAX = "260.48px";
  const LINE_HEIGHT_MAX = "248.832px";

  const getOverlaySize = (overlay: string) => {
    switch (overlay) {
      case 'premium - luxury': return 'clamp(22px, 8vw, 135px)';
      case 'designing': return 'clamp(20px, 7.5vw, 130px)';
      case 'extraordinary': return 'clamp(16px, 6.5vw, 110px)';
      default: return 'clamp(18px, 7vw, 105px)';
    }
  };

  // Character animation variants
  const charVariants = {
    hidden: { 
      opacity: 0, 
      x: -100,
    },
    visible: (i: number) => ({
      opacity: 1, 
      x: 0,
      transition: {
        delay: i * 0.03, // Stagger for characters
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
  };

  // Overlay animation variants (revealing after characters)
  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.03 + 0.4, // Reveal slightly after characters in the word
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  // Pre-calculate global character indices for smooth staggering across lines
  let globalCharCounter = 0;
  const processedRows = rows.map(row => ({
    ...row,
    items: row.items.map(item => {
      const chars = item.word.split('').map(char => ({
        char,
        globalIndex: globalCharCounter++
      }));
      return { ...item, chars };
    })
  }));

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
        
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,25,47,0.03)_0%,transparent_100%)] pointer-events-none" />
        
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

      {/* High-Impact Character Reveal Section */}
      <section className="w-full py-24 md:py-40 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="flex flex-col gap-0 items-center w-full max-w-[100vw]">
          {processedRows.map((row, i) => (
            <div
              key={i}
              className="relative w-full flex flex-row flex-wrap justify-center items-center gap-x-4 md:gap-x-12"
            >
              {row.items.map((item, itemIndex) => (
                <div key={itemIndex} className="relative inline-block py-2">
                  <div className="flex">
                    {item.chars.map((charData, charIndex) => (
                      <motion.span
                        key={charIndex}
                        custom={charData.globalIndex}
                        variants={charVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-10%" }}
                        style={{ 
                          fontSize: `clamp(32px, 16vw, ${FONT_SIZE_MAX})`,
                          lineHeight: `clamp(28px, 15vw, ${LINE_HEIGHT_MAX})`
                        }}
                        className="font-bold font-thunder uppercase tracking-tight text-foreground select-none inline-block"
                      >
                        {charData.char}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Static Editorial Overlays */}
                  {item.overlay && (
                    <motion.div 
                      custom={item.chars[0].globalIndex}
                      variants={overlayVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                      <span
                        style={{
                          fontSize: getOverlaySize(item.overlay),
                        }}
                        className="font-playground italic lowercase text-accent whitespace-nowrap"
                      >
                        {item.overlay}
                      </span>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
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
