'use client';

import { useState } from 'react';
import { CopticDateDisplay } from "@/components/coptic-date-display";
import { NawatSchedule } from "@/components/nawat-schedule";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');

  const handleLanguageChange = (checked: boolean) => {
    setLanguage(checked ? 'ar' : 'en');
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background text-foreground" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <header className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4" dir="ltr">
            <Label htmlFor="language-switch" className={language === 'en' ? 'font-bold' : ''}>English</Label>
            <Switch
              id="language-switch"
              checked={language === 'ar'}
              onCheckedChange={handleLanguageChange}
            />
            <Label htmlFor="language-switch" className={language === 'ar' ? 'font-bold' : ''}>العربية</Label>
          </div>

          <h1 className="text-4xl md:text-5xl font-headline text-primary tracking-tight">
            {language === 'ar' ? 'التقويم القبطي والطقس' : 'Coptic Calendar & Weather'}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground font-body">
            {language === 'ar' ? 'التاريخ القبطي الحالي وجدول نوات الشتاء في مصر' : 'Current Coptic date and winter storm schedule for Egypt'}
          </p>
        </header>

        <CopticDateDisplay language={language} />

        <NawatSchedule language={language} />
        
        <footer className="text-center text-sm text-muted-foreground pt-8">
          <p>{language === 'ar' ? 'مصمم للعمل دون اتصال بالإنترنت. يتم تخزين جميع البيانات محليًا.' : 'Designed to work offline. All data is stored locally.'}</p>
        </footer>
      </div>
    </main>
  );
}
