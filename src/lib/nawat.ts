export interface Nawa {
  name: string;
  arabicName: string;
  start: { month: number; day: number }; // month is 1-based
  description: string;
  arabicDescription: string;
}

export const nawat: Nawa[] = [
  {
    name: "Al-Makinah",
    arabicName: "مكنسة",
    start: { month: 11, day: 16 },
    description: "Strong south-westerly winds and heavy rains over 4 days.",
    arabicDescription: "رياح جنوبية غربية قوية وأمطار غزيرة لمدة 4 أيام.",
  },
  {
    name: "Baqi al-Makinah",
    arabicName: "باقي المكنسة",
    start: { month: 11, day: 22 },
    description: "South-westerly winds and heavy rains over 4 days.",
    arabicDescription: "رياح جنوبية غربية وأمطار غزيرة لمدة 4 أيام.",
  },
  {
    name: "Qassim",
    arabicName: "قاسم",
    start: { month: 12, day: 4 },
    description: "Strong south-westerly winds and thunder over 5 days.",
    arabicDescription: "رياح جنوبية غربية قوية ورعد لمدة 5 أيام.",
  },
  {
    name: "Al-Fayda al-Saghira",
    arabicName: "الفيضة الصغيرة",
    start: { month: 12, day: 19 },
    description: "North-westerly winds and rain over 5 days.",
    arabicDescription: "رياح شمالية غربية وأمطار لمدة 5 أيام.",
  },
  {
    name: "Christmas",
    arabicName: "عيد الميلاد",
    start: { month: 12, day: 28 },
    description: "North-westerly winds and severe cold over 2 days.",
    arabicDescription: "رياح شمالية غربية وبرد قارس لمدة يومين.",
  },
  {
    name: "New Year's Head",
    arabicName: "رأس السنة",
    start: { month: 1, day: 2 },
    description: "North-westerly winds and very rainy over 4 days.",
    arabicDescription: "رياح شمالية غربية وممطرة جداً لمدة 4 أيام.",
  },
  {
    name: "Al-Fayda al-Kabira",
    arabicName: "الفيضة الكبيرة",
    start: { month: 1, day: 12 },
    description: "South-westerly winds and very rainy over 6 days.",
    arabicDescription: "رياح جنوبية غربية وممطرة جداً لمدة 6 أيام.",
  },
  {
    name: "Al-Ghitas",
    arabicName: "الغطاس",
    start: { month: 1, day: 19 },
    description: "Dark west winds, rainy over 3 days.",
    arabicDescription: "رياح غربية مظلمة وممطرة لمدة 3 أيام.",
  },
  {
    name: "Al-Karam",
    arabicName: "الكرم",
    start: { month: 1, day: 28 },
    description: "Very rainy over 7 days.",
    arabicDescription: "ممطرة جداً لمدة 7 أيام.",
  },
  {
    name: "Al-Shams al-Saghira",
    arabicName: "الشمس الصغيرة",
    start: { month: 2, day: 18 },
    description: "Sunny with westerly winds, sometimes rainy, over 3 days.",
    arabicDescription: "مشمسة مع رياح غربية، ممطرة أحياناً، لمدة 3 أيام.",
  },
  {
    name: "Al-Salloum",
    arabicName: "السلوم",
    start: { month: 3, day: 2 },
    description: "South-westerly winds, sometimes rainy, over 2 days.",
    arabicDescription: "رياح جنوبية غربية، ممطرة أحياناً، لمدة يومين.",
  },
  {
    name: "Al-Hussum",
    arabicName: "الحسوم",
    start: { month: 3, day: 9 },
    description: "South winds, thunder, and rains over 7 days.",
    arabicDescription: "رياح جنوبية ورعد وأمطار لمدة 7 أيام.",
  },
  {
    name: "Al-Shams al-Kabira",
    arabicName: "الشمس الكبيرة",
    start: { month: 3, day: 18 },
    description: "Easterly winds over 2 days.",
    arabicDescription: "رياح شرقية لمدة يومين.",
  },
  {
    name: "Awwa",
    arabicName: "عوة",
    start: { month: 3, day: 24 },
    description: "Strong easterly winds over 6 days.",
    arabicDescription: "رياح شرقية قوية لمدة 6 أيام.",
  },
];

export function getCurrentNawa(date: Date): Nawa | null {
  for (const nawa of nawat) {
    const startDay = new Date(date.getFullYear(), nawa.start.month - 1, nawa.start.day);
    const duration = nawa.description.match(/(\d+)\s+days/);
    const nawaDuration = duration ? parseInt(duration[1], 10) : 1;
    const endDay = new Date(startDay);
    endDay.setDate(startDay.getDate() + nawaDuration -1);

    // Handle nawat that cross over the new year
    let currentYear = date.getFullYear();
    let startYear = currentYear;
    
    if (nawa.start.month > date.getMonth() + 1) {
        startYear = currentYear -1;
    }
    
    const startDate = new Date(startYear, nawa.start.month - 1, nawa.start.day);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + nawaDuration - 1);
    
    if (date >= startDate && date <= endDate) {
      return nawa;
    }
  }

  // A specific check for storms that cross the year boundary like 'Christmas' and 'New Year's Head'
  const year = date.getFullYear();
  for (const nawa of nawat) {
      const nawaStartDate = new Date(year, nawa.start.month-1, nawa.start.day);
      const duration = nawa.description.match(/(\d+)\s+days/);
      const nawaDuration = duration ? parseInt(duration[1], 10) : 1;
      const nawaEndDate = new Date(nawaStartDate);
      nawaEndDate.setDate(nawaStartDate.getDate() + nawaDuration - 1);

      if(nawaEndDate.getFullYear() > year) { // Storm crosses into next year
        const dateForPrevYear = new Date(date);
        dateForPrevYear.setFullYear(year - 1);
        const startDateInPrevYear = new Date(year-1, nawa.start.month-1, nawa.start.day);
        const endDateInThisYear = new Date(year, nawaEndDate.getMonth(), nawaEndDate.getDate());

        if(date >= startDateInPrevYear || date <= endDateInThisYear) {
             const startOfNawa = new Date(year-1, nawa.start.month-1, nawa.start.day);
             const endOfNawa = new Date(year, nawaEndDate.getMonth(), nawaEndDate.getDate());
             if(date >= startOfNawa && date <= endOfNawa) {
                return nawa;
             }
        }
      }
  }


  return null;
}
