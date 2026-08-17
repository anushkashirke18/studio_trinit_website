'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
 * Circular rotating text component for "TRINIT".
 * Positioned lower so only half is visible at the bottom of the container.
 */
function CircularTrinit() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute top-full left-0 w-[20vw] h-[20vw] min-w-[200px] min-h-[200px] pointer-events-none z-10 mt-[18vh] -ml-[2vw]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <path id="trinitCirclePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
        </defs>
        <text className="text-[12px] uppercase tracking-[0.2em] font-headline font-bold fill-[#F3D4DF]">
          <textPath href="#trinitCirclePath">
            TRINIT • TRINIT • TRINIT •
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * Circular rotating text component for "TRINIT" (Top variant).
 * Positioned higher so only half is visible at the top of the container.
 * Rotates in the opposite direction.
 */
function CircularTrinitTop() {
  return (
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-full left-0 w-[20vw] h-[20vw] min-w-[200px] min-h-[200px] pointer-events-none z-10 mb-[18vh] -ml-[2vw]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <path id="trinitCirclePathTop" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
        </defs>
        <text className="text-[12px] uppercase tracking-[0.2em] font-headline font-bold fill-[#F3D4DF]">
          <textPath href="#trinitCirclePathTop">
            TRINIT • TRINIT • TRINIT •
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState("things");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["things", "ideas", "designs", "softwares", "products", "apps", "systems", "experiences"];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, 150);
      } else {
        // Pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, mounted, words]);

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

  const narrativeText = "We’re Trinit — an independent creative agency based in Nasik and banglore. We help brands shape their identity, tell their story, and create work that connects across every touchpoint.";
  const wordsArray = narrativeText.split(" ");

  const xTranslate = useTransform(smoothProgress, [0, 1], ["0vw", "-900vw"]);

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

      {/* Logo - Positioned in the top-left corner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="fixed top-6 left-4 z-[60]"
      >
        <Image 
          src="/trinit.png?v=3" 
          alt="Trinit Logo" 
          width={180} 
          height={60} 
          className="w-auto h-5 object-contain"
          priority
        />
      </motion.div>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-background">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.2, base: [0.16, 1, 0.3, 1] }}
          className="text-primary text-center flex flex-col items-center"
        >
          {/* Introductory text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 1 }}
            className="text-[12px] uppercase tracking-[1em] text-muted-foreground font-medium mb-6 mr-[-1em]"
          >
            The next idea starts here.
          </motion.p>
          
          {/* Centered typing animation text with highlight */}
          <h1 className="text-[clamp(48px,12vw,200px)] font-thunder text-primary tracking-tight leading-none">
            Let's create <br />
            <span className="relative inline-block bg-[#C0C0C0] text-[#DC9632] px-4">
              {displayText}
              <motion.div 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                className="absolute -right-[2px] top-0 h-full w-[4px] bg-primary"
              >
                {/* Vertical teardrop handle */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full rounded-tr-none -rotate-45" />
              </motion.div>
            </span>
          </h1>

          {/* CTA Text below heading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 1 }}
            className="text-[14px] uppercase tracking-[0.4em] text-muted-foreground font-medium mt-12 cursor-pointer hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            make it happen <ArrowRight className="w-4 h-4" />
          </motion.p>
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
      <section ref={horizontalRef} className="relative h-[500vh] w-full bg-background overflow-visible">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <motion.div 
            style={{ x: xTranslate }} 
            className="flex whitespace-nowrap px-[10vw]"
          >
            <h2 className="text-[10vw] md:text-[8vw] font-headline font-bold uppercase tracking-tight leading-none flex flex-nowrap items-center">
              {wordsArray.map((word, i) => {
                const step = 1 / wordsArray.length;
                const start = i * step;
                const end = start + (step * 0.1);
                const isAgency = word.replace(/[.,—]/g, "").toLowerCase() === "agency";
                const isStory = word.replace(/[.,—]/g, "").toLowerCase() === "story";

                return (
                  <span key={i} className="relative inline-block">
                    <Word 
                      progress={smoothProgress} 
                      range={[start, end]}
                    >
                      {word}
                    </Word>
                    {isAgency && <CircularTrinit />}
                    {isStory && <CircularTrinitTop />}
                  </span>
                );
              })}
            </h2>
          </motion.div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section ref={servicesRef} className="relative h-[600vh] w-full bg-background">
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
