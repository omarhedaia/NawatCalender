"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CopticDate } from "@/lib/coptic-calendar";
import { gregorianToCoptic } from "@/lib/coptic-calendar";
import type { Nawa } from "@/lib/nawat";
import { getCurrentNawa } from "@/lib/nawat";
import { CalendarDays, Wind } from "lucide-react";
import { getHijriDateString } from "@/lib/hijri-calendar";

export function CopticDateDisplay({ language }: { language: 'en' | 'ar' }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  if (!now) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Today's Date</CardTitle>
            <CalendarDays className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="border-t my-4" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          </CardContent>
        </Card>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Current Winter Storm</CardTitle>
            <Wind className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const copticDate: CopticDate = gregorianToCoptic(now);
  const currentNawa: Nawa | null = getCurrentNawa(now);
  
  // The Hijri calendar day starts at sunset. To better align with this,
  // we adjust the date before formatting. Subtracting 10 hours helps
  // account for this difference and prevents being a day ahead.
  const adjustedHijriDate = new Date(now);
  adjustedHijriDate.setHours(adjustedHijriDate.getHours() - 10);
  const hijriDateString = getHijriDateString(adjustedHijriDate, language);
  
  const gregorianDateString = now.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const toArabicNumerals = (num: number) => {
    const arabic = '٠١٢٣٤٥٦٧٨٩';
    return String(num).split('').map(i => arabic[Number(i)]).join('');
  };

  const copticDateString = language === 'ar' 
    ? `${toArabicNumerals(copticDate.day)} ${copticDate.monthNameArabic}, ${toArabicNumerals(copticDate.year)} ش`
    : `${copticDate.day} ${copticDate.monthName}, ${copticDate.year} A.M.`;

  return (
    <div className="grid md:grid-cols-2 gap-8 font-body">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium font-headline">{language === 'ar' ? 'تاريخ اليوم' : "Today's Date"}</CardTitle>
          <CalendarDays className="h-6 w-6 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-headline text-primary">{gregorianDateString}</div>
          <div className="border-t my-4" />
          <div className="space-y-2">
            <p className="text-xl text-muted-foreground">{copticDateString}</p>
            <p className="text-xl text-muted-foreground">{hijriDateString}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium font-headline">{language === 'ar' ? 'نوة الشتاء الحالية' : 'Current Winter Storm'}</CardTitle>
          <Wind className="h-6 w-6 text-accent" />
        </CardHeader>
        <CardContent>
          {currentNawa ? (
            <>
              <div className="text-3xl font-bold font-headline text-primary">
                {language === 'ar' ? currentNawa.arabicName : currentNawa.name}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {language === 'ar' ? currentNawa.arabicDescription : currentNawa.description}
              </p>
            </>
          ) : (
            <div className="text-xl font-semibold text-muted-foreground/80 pt-2">
              {language === 'ar' ? 'لا توجد نوة حالية' : 'No active storm'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
