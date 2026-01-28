export interface Nawa {
  name: string;
  arabicName: string;
  start: { month: number; day: number }; // month is 1-based
  description: string;
}

export const nawat: Nawa[] = [
  {
    name: "Al-Makinah",
    arabicName: "مكنسة",
    start: { month: 11, day: 16 },
    description: "Strong south-westerly winds and heavy rains over 4 days.",
  },
  {
    name: "Baqi al-Makinah",
    arabicName: "باقي المكنسة",
    start: { month: 11, day: 22 },
    description: "South-westerly winds and heavy rains over 4 days.",
  },
  {
    name: "Qassim",
    arabicName: "قاسم",
    start: { month: 12, day: 4 },
    description: "Strong south-westerly winds and thunder over 5 days.",
  },
  {
    name: "Al-Fayda al-Saghira",
    arabicName: "الفيضة الصغيرة",
    start: { month: 12, day: 19 },
    description: "North-westerly winds and rain over 5 days.",
  },
  {
    name: "Christmas",
    arabicName: "عيد الميلاد",
    start: { month: 12, day: 28 },
    description: "North-westerly winds and severe cold over 2 days.",
  },
  {
    name: "New Year's Head",
    arabicName: "رأس السنة",
    start: { month: 1, day: 2 },
    description: "North-westerly winds and very rainy over 4 days.",
  },
  {
    name: "Al-Fayda al-Kabira",
    arabicName: "الفيضة الكبيرة",
    start: { month: 1, day: 12 },
    description: "South-westerly winds and very rainy over 6 days.",
  },
  {
    name: "Al-Ghitas",
    arabicName: "الغطاس",
    start: { month: 1, day: 19 },
    description: "Dark west winds, rainy over 3 days.",
  },
  {
    name: "Al-Karam",
    arabicName: "الكرم",
    start: { month: 1, day: 28 },
    description: "Very rainy over 7 days.",
  },
  {
    name: "Al-Shams al-Saghira",
    arabicName: "الشمس الصغيرة",
    start: { month: 2, day: 18 },
    description: "Sunny with westerly winds, sometimes rainy, over 3 days.",
  },
  {
    name: "Al-Salloum",
    arabicName: "السلوم",
    start: { month: 3, day: 2 },
    description: "South-westerly winds, sometimes rainy, over 2 days.",
  },
  {
    name: "Al-Hussum",
    arabicName: "الحسوم",
    start: { month: 3, day: 9 },
    description: "South winds, thunder, and rains over 7 days.",
  },
  {
    name: "Al-Shams al-Kabira",
    arabicName: "الشمس الكبيرة",
    start: { month: 3, day: 18 },
    description: "Easterly winds over 2 days.",
  },
  {
    name: "Awwa",
    arabicName: "عوة",
    start: { month: 3, day: 24 },
    description: "Strong easterly winds over 6 days.",
  },
];

const nawaDurations: { [key: string]: number } = {
    "Al-Makinah": 4,
    "Baqi al-Makinah": 4,
    "Qassim": 5,
    "Al-Fayda al-Saghira": 5,
    "Christmas": 2,
    "New Year's Head": 4,
    "Al-Fayda al-Kabira": 6,
    "Al-Ghitas": 3,
    "Al-Karam": 7,
    "Al-Shams al-Saghira": 3,
    "Al-Salloum": 2,
    "Al-Hussum": 7,
    "Al-Shams al-Kabira": 2,
    "Awwa": 6
};

export function getCurrentNawa(date: Date): Nawa | null {
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();
  const currentDayOfYear = (d: Date) => Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const todayOfYear = currentDayOfYear(date);

  for (const nawa of nawat) {
    const startDay = new Date(date.getFullYear(), nawa.start.month - 1, nawa.start.day);
    const duration = nawa.description.match(/(\d+)\s+days/);
    const nawaDuration = duration ? parseInt(duration[1], 10) : 1;
    const endDay = new Date(startDay);
    endDay.setDate(startDay.getDate() + nawaDuration -1);

    if (date >= startDay && date <= endDay) {
      return nawa;
    }
  }

  return null;
}
