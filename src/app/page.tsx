import { CopticDateDisplay } from "@/components/coptic-date-display";
import { NawatSchedule } from "@/components/nawat-schedule";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background text-foreground">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline text-primary tracking-tight">
            Coptic Calendar & Weather
          </h1>
          <p className="mt-2 text-lg text-muted-foreground font-body">
            Current Coptic date and winter storm schedule for Egypt
          </p>
        </header>

        <CopticDateDisplay />

        <NawatSchedule />
        
        <footer className="text-center text-sm text-muted-foreground pt-8">
          <p>Designed to work offline. All data is stored locally.</p>
        </footer>
      </div>
    </main>
  );
}
