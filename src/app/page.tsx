
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          System Reset Complete&nbsp;
        </p>
      </div>

      <div className="relative flex place-items-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Clean Slate
        </h1>
      </div>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Your application code has been cleared. You can now start building from scratch.</p>
      </div>
    </main>
  );
}
