
'use client';

import React from 'react';

/**
 * Main landing page reset to a clean state.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-headline">
          Project Blank
        </h1>
        <p className="text-lg text-muted-foreground font-body">
          Your project has been successfully reset to a clean state with stabilized dependencies.
        </p>
      </div>
    </div>
  );
}
