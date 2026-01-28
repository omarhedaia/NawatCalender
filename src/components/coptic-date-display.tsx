"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CopticDate } from "@/lib/coptic-calendar";
import { gregorianToCoptic } from "@/lib/coptic-calendar";
import type { Nawa } from "@/lib/nawat";
import { getCurrentNawa } from "@/lib/nawat";
import { CalendarDays, Wind } from "lucide-react";

export function CopticDateDisplay() {
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
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full mt-1" />
            <div className="border-t my-4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2 mt-1" />
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
  
  const gregorianDateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const gregorianDateStringArabic = now.toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const toArabicNumerals = (num: number) => {
    const arabic = '٠١٢٣٤٥٦٧٨٩';
    return String(num).split('').map(i => arabic[Number(i)]).join('');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 font-body">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium font-headline">Today's Date</CardTitle>
          <CalendarDays className="h-6 w-6 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-headline text-primary">{gregorianDateString}</div>
          <p className="text-xl text-muted-foreground mt-1" dir="rtl">
            {gregorianDateStringArabic}
          </p>
          <div className="border-t my-4" />
          <p className="text-xl text-primary/90">
            {`${copticDate.day} ${copticDate.monthName}, ${copticDate.year} A.M.`}
          </p>
          <p className="text-xl text-muted-foreground mt-1" dir="rtl">
            {`${toArabicNumerals(copticDate.day)} ${copticDate.monthNameArabic}, ${toArabicNumerals(copticDate.year)} ش`}
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium font-headline">Current Winter Storm</CardTitle>
          <Wind className="h-6 w-6 text-accent" />
        </CardHeader>
        <CardContent>
          {currentNawa ? (
            <>
              <div className="text-3xl font-bold font-headline text-primary">{currentNawa.name} <span className="text-2xl text-muted-foreground">({currentNawa.arabicName})</span></div>
              <p className="text-sm text-muted-foreground mt-2">{currentNawa.description}</p>
            </>
          ) : (
            <div className="text-xl font-semibold text-muted-foreground/80 pt-2">No active storm</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
