'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail } from 'lucide-react';

/**
 * Word component for the horizontal scroll section.
 * Handles the individual color transition from grey to full color based on scroll progress.
 */
function Word({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  const color = useTransform(
    progress, 
    range, 
    ["hsl(240 3.8% 46.1%)", "hsl(311 35% 15%)"]
  );

  return (
    <motion.span 
      style={{ opacity, color }} 
      className="inline-block"
    >
      {children}&nbsp;
    </motion.span>
  );
}

/**
 * A refined, rounded scalloped badge with rotating text.
 */
function ScallopedBadge() {
  return (
    <div className="relative w-[clamp(80px,15vw,160px)] h-[clamp(80px,15vw,160px)] flex items-center justify-center shrink-0">
      {/* Refined Rounded Scalloped Shape (Cloud/Stamp style) */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full text-[#D4C4FB]"
        fill="currentColor"
      >
        <path d="M50 0 C56 0 61 5 65 9 C69 13 75 14 80 14 C86 14 91 19 91 25 C91 30 90 36 94 40 C98 44 100 50 100 56 C100 62 98 68 94 72 C90 76 91 82 91 87 C91 93 86 98 80 98 C75 98 69 99 65 103 C61 107 56 112 50 112 C44 112 39 107 35 103 C31 99 25 98 20 98 C14 98 9 93 9 87 C9 82 10 76 6 72 C2 68 0 62 0 56 C0 50 2 44 6 40 C10 36 9 30 9 25 C9 19 14 14 20 14 C25 14 31 13 35 9 C39 5 44 0 50 0 Z" 
          transform="scale(0.85) translate(8, 8)"
        />
      </svg>
      
      {/* Rotating Text Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          </defs>
          <text className="text-[10px] uppercase tracking-[0.2em] font-medium fill-[#34192F]">
            <textPath href="#circlePath">
              REACH OUT • REACH OUT • REACH OUT •
            </textPath>
          </text>
        </svg>
      </motion.div>
      
      {/* Central Icon */}
      <div className="relative z-10 text-[#34192F]">
        <Mail size={24} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function Home() {
  const rows = [
    { items: [{ word: "CRAFTING", overlay: "designing" }] },
    { items: [{ word: "UNFORGETTABLE", overlay: "premium - luxury" }] },
    { items: [{ word: "DIGITAL", overlay: "web - mobile" }] },
    { items: [{ word: "EXPERIENCES", overlay: "brands & websites" }] },
    { 
      items: [
        { word: "FOR", overlay: null }, 
        { word: "AMBITIOUS", overlay: "extraordinary" }
      ] 
    },
    { items: [{ word: "CLIENTS", overlay: "people" }] }
  ];

  const FONT_SIZE_MAX = "260.48px";
  const LINE_HEIGHT_MAX = "248.832px";

  const getOverlaySize = (overlay: string) => {
    switch (overlay) {
      case 'premium - luxury': return 'clamp(22px, 8vw, 135px)';
      case 'designing': return 'clamp(20px, 7.5vw, 130px)';
      case 'extraordinary': return 'clamp(16px, 6.5vw, 110px)';
      case 'people': return 'clamp(18px, 7vw, 105px)';
      case 'what we can do': return 'clamp(16px, 6.5vw, 110px)';
      default: return 'clamp(18px, 7vw, 105px)';
    }
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const charVariants = {
    hidden: { 
      opacity: 0, 
      x: -80,
    },
    visible: {
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.6
      }
    }
  };

  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  const xTranslate = useTransform(smoothProgress, [0.1, 0.95], ["0%", "-95%"]);

  const narrativeText = "We’re Trinit — an independent creative agency based in Nasik. We help brands shape their identity, tell their story, and create work that connects across every touchpoint.";
  const words = narrativeText.split(" ");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.35em] text-foreground font-thunder uppercase select-none mr-[-0.35em]">
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
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,25,47,0.03)_0%,transparent_100%)] pointer-events-none" />
        
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

      {/* Reveal Section */}
      <section className="w-full py-24 md:py-40 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="flex flex-col gap-0 items-center w-full max-w-[100vw]">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
              variants={rowVariants}
              className="relative w-full flex flex-row flex-nowrap justify-center items-center gap-x-4 md:gap-x-12"
            >
              {row.items.map((item, itemIndex) => (
                <div key={itemIndex} className="relative inline-block py-2">
                  <div className="flex">
                    {item.word.split('').map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={charVariants}
                        style={{ 
                          fontSize: `clamp(32px, 16vw, ${FONT_SIZE_MAX})`,
                          lineHeight: `clamp(28px, 15vw, ${LINE_HEIGHT_MAX})`
                        }}
                        className="font-bold font-thunder uppercase tracking-tight text-foreground select-none inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                  
                  {item.overlay && (
                    <motion.div 
                      variants={overlayVariants}
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* [ ABOUT US ] Label */}
      <section className="w-full py-12 flex items-center justify-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="text-[10px] uppercase tracking-[0.6em] text-muted-foreground font-semibold ml-[0.6em]"
        >
          [ ABOUT US ]
        </motion.p>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={horizontalRef} className="relative h-[800vh] w-full bg-background">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div 
            style={{ x: xTranslate }} 
            className="flex whitespace-nowrap px-[10vw]"
          >
            <h2 className="text-[10vw] md:text-[8vw] font-headline font-bold uppercase tracking-tight leading-none pr-[20vw] flex flex-nowrap items-center">
              {words.map((word, i) => {
                const start = (i / words.length) * 0.8 + 0.05;
                const end = start + 0.001; 
                return (
                  <Word key={i} progress={smoothProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="w-full py-16 md:py-24 overflow-visible relative flex items-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-[clamp(40px,8vw,80px)] bg-[#34192F]" />
        </div>
        
        <div className="flex whitespace-nowrap overflow-hidden relative z-10 w-full">
          <motion.div
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex items-center"
          >
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <div key={j} className="flex items-center gap-8 md:gap-16 pr-12 md:pr-24">
                    <div className="flex gap-4 md:gap-8 items-baseline">
                      <span 
                        style={{ 
                          fontSize: `clamp(32px, 16vw, ${FONT_SIZE_MAX})`,
                          lineHeight: "1"
                        }}
                        className="font-thunder uppercase tracking-tight text-background select-none whitespace-nowrap"
                      >
                        OUR
                      </span>
                      <span 
                        style={{ 
                          fontSize: `clamp(32px, 16vw, ${FONT_SIZE_MAX})`,
                          lineHeight: "1"
                        }}
                        className="font-thunder uppercase tracking-tight text-background select-none whitespace-nowrap"
                      >
                        SERVICES
                      </span>
                    </div>
                    <ScallopedBadge />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Overlay Text perfectly centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <span 
            className="font-playground italic lowercase text-accent whitespace-nowrap"
            style={{ fontSize: "clamp(24px, 8vw, 140px)" }}
          >
            what we can do
          </span>
        </div>
      </section>

      {/* Footer Block */}
      <div className="w-full bg-background text-primary">
        <footer className="w-full border-t border-primary/10 py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-2">
              <h4 className="text-xl font-headline font-bold tracking-tighter text-primary">TRINIT.</h4>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60">© 2024 All Rights Reserved</p>
            </div>
            
            <div className="flex gap-10">
              {['Instagram', 'LinkedIn', 'Twitter', 'Email'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-[10px] uppercase tracking-[0.4em] font-medium text-primary hover:text-accent transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
            
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/60">Digital Ether / Global</p>
          </div>
        </footer>
      </div>

    </div>
  );
}
