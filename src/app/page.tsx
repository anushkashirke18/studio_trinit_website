
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

/**
 * Triple Vertical Reveal Component
 * Three panels that slide upwards one by one to reveal the page content.
 */
function TripleVerticalReveal() {
  const panelVariants = {
    initial: { y: "0%" },
    animate: (i: number) => ({
      y: "-100%",
      transition: {
        duration: 1.2,
        ease: [0.85, 0, 0.15, 1],
        delay: 0.2 + i * 0.15,
      }
    })
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div 
          key={i}
          custom={i}
          initial="initial"
          animate="animate"
          variants={panelVariants}
          className="h-full w-1/3 bg-primary border-r border-primary-foreground/5 last:border-r-0"
        />
      ))}
    </div>
  );
}

/**
 * Word component for the horizontal scroll section.
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
 * Character component for the "OUR SERVICES" horizontal scroll section.
 */
function ServiceChar({ children, i, total, progress }: { children: string, i: number, total: number, progress: any }) {
  const start = (i / total) * 0.1;
  const end = start + 0.1;
  const exitStart = 0.9 + (i / total) * 0.05;
  const exitEnd = Math.min(exitStart + 0.05, 1);

  const y = useTransform(
    progress, 
    [start, end, exitStart, exitEnd], 
    ["100%", "0%", "0%", "100%"]
  );
  
  const opacity = useTransform(
    progress, 
    [start, end, exitStart, exitEnd], 
    [0, 1, 1, 0]
  );

  return (
    <span className="inline-block overflow-hidden">
      <motion.span 
        style={{ y, opacity }} 
        className="inline-block"
      >
        {children === " " ? "\u00A0" : children}
      </motion.span>
    </span>
  );
}

/**
 * A smooth, rounded 8-petaled stamp badge with rotating text.
 */
function ScallopedBadge() {
  return (
    <div className="relative w-[clamp(120px,25vw,240px)] h-[clamp(120px,25vw,240px)] flex items-center justify-center shrink-0">
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full text-[#D4C4FB]"
        fill="currentColor"
      >
        <path d="M50,5 C58.2,5 64.9,11.7 64.9,20 C64.9,28.3 71.7,35.1 80,35.1 C88.3,35.1 95,41.8 95,50 C95,58.2 88.3,64.9 80,64.9 C71.7,64.9 64.9,71.7 64.9,80 C64.9,88.3 58.2,95 50,95 C41.8,95 35.1,88.3 35.1,80 C35.1,71.7 28.3,64.9 20,64.9 C11.7,64.9 5,58.2 5,50 C5,41.8 11.7,35.1 20,35.1 C28.3,35.1 35.1,28.3 35.1,20 C35.1,11.7 41.8,5 50,5 Z" />
      </svg>
      
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
      
      <div className="relative z-10 text-[#34192F]">
        <Mail size={32} strokeWidth={1.2} />
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const charVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1, 
      x: 0,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
    },
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }
    }
  };

  const getOverlaySize = (overlay: string) => {
    switch (overlay) {
      case 'premium - luxury': return 'clamp(22px, 8vw, 135px)';
      case 'designing': return 'clamp(20px, 7.5vw, 130px)';
      case 'extraordinary': return 'clamp(16px, 6.5vw, 110px)';
      case 'people': return 'clamp(18px, 7vw, 105px)';
      default: return 'clamp(18px, 7vw, 105px)';
    }
  };

  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  const xTranslate = useTransform(smoothProgress, [0.1, 0.95], ["0%", "-95%"]);

  const narrativeText = "We’re Trinit — an independent creative agency based in Nasik. We help brands shape their identity, tell their story, and create work that connects across every touchpoint.";
  const words = narrativeText.split(" ");

  // Services Scroll Logic
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });

  const smoothServicesProgress = useSpring(servicesScrollProgress, {
    stiffness: 35,
    damping: 30,
    restDelta: 0.001
  });

  const servicesTranslateX = useTransform(
    smoothServicesProgress, 
    [0, 0.2, 0.9, 1], 
    ["100vw", "0vw", "0vw", "-100vw"]
  );
  
  const servicesText = "OUR SERVICES";
  const serviceChars = servicesText.split("");

  const whatWeDoOpacity = useTransform(smoothServicesProgress, [0.2, 0.3, 0.85, 0.95], [0, 1, 1, 0]);
  const whatWeDoScale = useTransform(smoothServicesProgress, [0.2, 0.3, 0.85, 0.95], [0.8, 1, 1, 0.8]);

  const card1Y = useTransform(smoothServicesProgress, [0.4, 0.55], ["100vh", "0vh"]);
  const card1Scale = useTransform(smoothServicesProgress, [0.4, 0.55], [0.8, 1]);
  const card1Opacity = useTransform(smoothServicesProgress, [0.4, 0.5], [0, 1]);

  const card2Y = useTransform(smoothServicesProgress, [0.5, 0.65], ["100vh", "0vh"]);
  const card2Scale = useTransform(smoothServicesProgress, [0.5, 0.65], [0.8, 1]);
  const card2Opacity = useTransform(smoothServicesProgress, [0.5, 0.6], [0, 1]);

  const card3Y = useTransform(smoothServicesProgress, [0.6, 0.75], ["100vh", "0vh"]);
  const card3Scale = useTransform(smoothServicesProgress, [0.6, 0.75], [0.8, 1]);
  const card3Opacity = useTransform(smoothServicesProgress, [0.6, 0.7], [0, 1]);

  const cardsExitX = useTransform(smoothServicesProgress, [0.9, 1], ["0%", "-100%"]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center overflow-x-hidden">
      
      {/* 3-Panel Vertical Reveal Animation */}
      <AnimatePresence>
        {mounted && <TripleVerticalReveal />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-end p-6 overflow-hidden">
        {/* Label Part (1/3) */}
        <div className="absolute top-12 left-6 overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.8em] text-muted-foreground font-medium"
          >
            [ studio based in nasik ]
          </motion.p>
        </div>

        {/* Statement Part (2/3) */}
        <div className="flex-1 flex items-center justify-center w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-playground italic text-primary/60 text-center max-w-2xl leading-relaxed"
          >
            We define visual identities that tell your unique story across digital landscapes.
          </motion.p>
        </div>

        {/* TRINIT Text Finale (3/3) */}
        <div className="w-full pb-0 md:pb-2">
          <motion.h1 
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[30vw] font-bold tracking-[0.1em] text-foreground font-macker uppercase leading-[0.75] select-none whitespace-nowrap w-full text-left -ml-[2vw]"
          >
            TRINIT
          </motion.h1>
        </div>
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
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  {item.overlay && (
                    <motion.div variants={overlayVariants} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <span style={{ fontSize: getOverlaySize(item.overlay) }} className="font-playground italic lowercase text-accent whitespace-nowrap">
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

      {/* About Us Label */}
      <div className="w-full max-w-7xl px-6 pt-24 pb-12 flex justify-center text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-[15px] uppercase tracking-[1.2em] text-muted-foreground font-medium mr-[-1.2em]"
        >
          [about us]
        </motion.p>
      </div>

      {/* About Us Horizontal Scroll */}
      <section ref={horizontalRef} className="relative h-[800vh] w-full bg-background">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x: xTranslate }} className="flex whitespace-nowrap px-[10vw]">
            <h2 className="text-[10vw] md:text-[8vw] font-headline font-bold uppercase tracking-tight leading-none pr-[20vw] flex flex-nowrap items-center">
              {words.map((word, i) => {
                const start = (i / words.length) * 0.8 + 0.05;
                const end = start + 0.001; 
                return <Word key={i} progress={smoothProgress} range={[start, end]}>{word}</Word>;
              })}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section ref={servicesRef} className="relative h-[600vh] w-full bg-background mt-24">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          
          <motion.div 
            style={{ x: servicesTranslateX }} 
            className="flex whitespace-nowrap w-full justify-center relative z-10"
          >
            <h2 className="flex flex-nowrap items-center relative">
              {serviceChars.map((char, i) => (
                <div key={i} className="flex items-center">
                  <span 
                    style={{ fontSize: `clamp(60px, 20vw, ${FONT_SIZE_MAX})`, lineHeight: "1" }}
                    className="font-thunder uppercase tracking-tighter text-foreground select-none flex"
                  >
                    <ServiceChar 
                      i={i} 
                      total={serviceChars.length} 
                      progress={smoothServicesProgress} 
                    >
                      {char}
                    </ServiceChar>
                  </span>
                </div>
              ))}
              
              <motion.div 
                style={{ opacity: whatWeDoOpacity, scale: whatWeDoScale }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <span className="font-playground italic lowercase text-accent whitespace-nowrap" style={{ fontSize: "clamp(24px, 8vw, 140px)" }}>
                  what we do
                </span>
              </motion.div>
            </h2>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden px-[2vw]">
            <motion.div style={{ x: cardsExitX }} className="relative w-full h-full flex items-center justify-center gap-[2vw]">
              
              <motion.div 
                style={{ y: card1Y, scale: card1Scale, opacity: card1Opacity }}
                className="w-[32vw] h-[40vw] bg-white shadow-2xl rounded-sm overflow-hidden p-8 flex flex-col justify-center gap-8 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 text-center">
                  <p className="font-thunder text-2xl md:text-3xl uppercase tracking-widest text-primary">UI/UX DESIGN</p>
                  <p className="font-playfair italic text-[12pt] md:text-[13pt] leading-relaxed text-primary/80">
                    We design clean and user-focused interfaces that enhance usability and engagement. By combining creativity with strategic thinking, we deliver experiences that are both functional and visually compelling.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                style={{ y: card2Y, scale: card2Scale, opacity: card2Opacity }}
                className="w-[32vw] h-[40vw] bg-white shadow-2xl rounded-sm overflow-hidden p-8 flex flex-col justify-center gap-8 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 text-center">
                  <p className="font-thunder text-2xl md:text-3xl uppercase tracking-widest text-primary">WEB & APP</p>
                  <p className="font-playfair italic text-[12pt] md:text-[13pt] leading-relaxed text-primary/80">
                    We build high-performance applications with robust code and seamless UX. Our digital solutions are built to scale and engage users across all devices globally.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                style={{ y: card3Y, scale: card3Scale, opacity: card3Opacity }}
                className="w-[32vw] h-[40vw] bg-white shadow-2xl rounded-sm overflow-hidden p-8 flex flex-col justify-center gap-8 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 text-center">
                  <p className="font-thunder text-2xl md:text-3xl uppercase tracking-widest text-primary">BRANDING</p>
                  <p className="font-playfair italic text-[12pt] md:text-[13pt] leading-relaxed text-primary/80">
                    We define visual identities that tell your unique story. From strategy to logo design, we help ambitious brands connect with their global audience meaningfully.
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-7xl px-6 py-40 flex flex-col items-start gap-16">
        <div className="flex flex-col items-start gap-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[12px] uppercase tracking-[1.2em] text-muted-foreground font-medium mr-[-1.2em]"
          >
            [contact us]
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[12vw] font-macker uppercase tracking-tighter leading-[0.85] text-primary"
          >
            LET'S<br />TALK
          </motion.h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-12 mt-8">
          <div className="flex flex-col gap-8">
            <p className="text-xl md:text-2xl font-playfair italic text-primary/60 max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? We'd love to hear from you. Let's create something extraordinary together.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Email us at</span>
              <a href="mailto:hello@trinit.studio" className="text-2xl md:text-3xl font-headline font-bold hover:text-accent transition-colors">
                hello@trinit.studio
              </a>
            </div>
          </div>
          <ScallopedBadge />
        </div>
      </section>

      {/* Footer */}
      <div className="w-full bg-background text-primary">
        <footer className="w-full border-t border-primary/10 py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <h4 className="text-xl font-headline font-bold tracking-tighter text-primary">TRINIT.</h4>
            <div className="flex gap-10">
              {['Instagram', 'LinkedIn', 'Twitter', 'Email'].map((link) => (
                <a key={link} href="#" className="text-[10px] uppercase tracking-[0.4em] font-medium text-primary hover:text-accent">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
