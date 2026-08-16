'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

/**
 * Triple Vertical Reveal Component
 * Three panels that slide upwards from the bottom (100%) to the top (-100%).
 */
function TripleVerticalReveal() {
  const panelVariants = {
    initial: { y: "100%" },
    animate: (i: number) => ({
      y: "-100%",
      transition: {
        duration: 1.5,
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
 * Revealed words turn and stay Deep Purple (#34192F).
 * Upcoming words remain Silver (#C0C0C0).
 */
function Word({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  const color = useTransform(progress, range, ["#C0C0C0", "#34192F"]);

  return (
    <motion.span 
      style={{ color }} 
      className="inline-block whitespace-nowrap"
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

  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const narrativeText = "We’re Trinit — an independent creative agency based in Nasik. We help brands shape their identity, tell their story, and create work that connects across every touchpoint.";
  const words = narrativeText.split(" ");

  const xTranslate = useTransform(smoothProgress, [0, 1], ["0vw", "-700vw"]);

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
    <div className="min-h-screen bg-background flex flex-col items-center">
      
      <AnimatePresence>
        {mounted && <TripleVerticalReveal />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-background">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-primary text-center flex flex-col items-center select-none"
        >
          {/* Decorative asterisk to match image style */}
          <div className="w-full max-w-[80vw] flex justify-start mb-[-2vw] ml-[-4vw]">
            <span className="text-4xl md:text-7xl font-playground">*</span>
          </div>

          {/* Heading and sub-text removed for a clean slate */}
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="w-full py-32 px-6 overflow-hidden bg-background">
        <div className="flex flex-col items-center justify-center text-center">
          {["CRAFTING", "UNFORGETTABLE", "DIGITAL", "EXPERIENCES", "FOR", "AMBITIOUS", "CLIENTS"].map((word, i) => {
            const fontSize = word === "UNFORGETTABLE" ? "text-[16.8vw]" : word === "EXPERIENCES" ? "text-[17.2vw]" : "text-[17.5vw]";
            
            return (
              <div key={i} className="overflow-hidden w-full relative">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: i * 0.08 
                  }}
                  className={`${fontSize} font-thunder uppercase leading-[0.8] text-primary tracking-tighter relative`}
                >
                  {word}
                  {word === "CRAFTING" && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-playground italic lowercase text-accent text-[clamp(24px,8vw,120px)] mt-[2vw]">
                        designing
                      </span>
                    </span>
                  )}
                  {word === "UNFORGETTABLE" && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-playground italic lowercase text-accent text-[clamp(24px,8vw,120px)] mt-[2vw]">
                        premium - luxury
                      </span>
                    </span>
                  )}
                  {word === "DIGITAL" && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-playground italic lowercase text-accent text-[clamp(24px,8vw,120px)] mt-[2vw]">
                        web - mobile
                      </span>
                    </span>
                  )}
                  {word === "EXPERIENCES" && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-playground italic lowercase text-accent text-[clamp(24px,8vw,120px)] mt-[2vw]">
                        brands & websites
                      </span>
                    </span>
                  )}
                  {word === "FOR" && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-playground italic lowercase text-accent text-[clamp(24px,8vw,120px)] mt-[2vw]">
                        you
                      </span>
                    </span>
                  )}
                  {word === "AMBITIOUS" && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-playground italic lowercase text-accent text-[clamp(24px,8vw,120px)] mt-[2vw]">
                        extraordinary
                      </span>
                    </span>
                  )}
                  {word === "CLIENTS" && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-playground italic lowercase text-accent text-[clamp(24px,8vw,120px)] mt-[2vw]">
                        people
                      </span>
                    </span>
                  )}
                </motion.h2>
              </div>
            );
          })}
        </div>
      </section>

      {/* [about us] Label */}
      <div className="w-full max-w-7xl px-6 pt-40 pb-12 flex justify-center text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-[15px] uppercase tracking-[1.2em] text-muted-foreground font-medium mr-[-1.2em]"
        >
          [about us]
        </motion.p>
      </div>

      {/* About Us Horizontal Scroll Section */}
      <section ref={horizontalRef} className="relative h-[800vh] w-full bg-background overflow-visible">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <motion.div 
            style={{ x: xTranslate }} 
            className="flex whitespace-nowrap px-[10vw]"
          >
            <h2 className="text-[10vw] md:text-[8vw] font-headline font-bold uppercase tracking-tight leading-none flex flex-nowrap items-center">
              {words.map((word, i) => {
                const step = 1 / words.length;
                const start = i * step;
                const end = start + (step * 0.1); 
                return (
                  <Word 
                    key={i} 
                    progress={smoothProgress} 
                    range={[start, end]}
                  >
                    {word}
                  </Word>
                );
              })}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section ref={servicesRef} className="relative h-[600vh] w-full bg-background mt-24">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          
          <motion.div 
            style={{ x: servicesTranslateX }} 
            className="flex whitespace-nowrap w-full justify-center relative z-10"
          >
            <h2 className="flex flex-nowrap items-center relative">
              {serviceChars.map((char, i) => (
                <div key={i} className="flex items-center">
                  <span 
                    style={{ fontSize: `clamp(60px, 20vw, 260px)`, lineHeight: "1" }}
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

          {/* Cards revealing on scroll */}
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
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-12">
          {/* Left Side: Heading */}
          <div className="flex flex-col items-start gap-6 md:pt-24">
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
              className="text-7xl md:text-[16vw] font-thunder uppercase tracking-tighter leading-[0.85] text-primary"
            >
              LET'S<br />TALK
            </motion.h2>
          </div>

          {/* Right Side: Info Text Block */}
          <div className="flex flex-col gap-8 md:mt-40">
            <p className="text-xl md:text-2xl font-playfair italic text-primary/60 max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? We'd love to hear from you. Let's create something extraordinary together.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Email us at</span>
                <a href="mailto:contact@trinit.co.in" className="text-2xl md:text-3xl font-headline font-bold hover:text-accent transition-colors">
                  contact@trinit.co.in
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Call us at</span>
                <a href="tel:+919112074187" className="text-2xl md:text-3xl font-headline font-bold hover:text-accent transition-colors">
                  +91 91120 74187
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end w-full mt-8">
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
