export type CopticDate = {
  day: number;
  month: number;
  monthName: string;
  monthNameArabic: string;
  year: number;
  isLeapYear: boolean;
};

const COPTIC_MONTHS = [
  "Thout", "Paopi", "Hathor", "Koiak", "Tobi", "Meshir",
  "Paremhat", "Paremoude", "Pashons", "Paoni", "Epep", "Mesori",
  "Pi Kogi Enavot"
];

const COPTIC_MONTHS_ARABIC = [
  "توت", "بابه", "هاتور", "كيهك", "طوبه", "أمشير",
  "برمهات", "برموده", "بشنس", "بؤونه", "أبيب", "مسرى",
  "نسيئ"
];

export function gregorianToCoptic(gregorianDate: Date): CopticDate {
  // Use UTC to avoid timezone issues
  const gYear = gregorianDate.getUTCFullYear();
  const dateInUTC = Date.UTC(gYear, gregorianDate.getUTCMonth(), gregorianDate.getUTCDate());

  // This calculates the Gregorian day of September for the Coptic New Year (Nayrouz).
  // This logic is designed to be accurate across different centuries by accounting for
  // the shifting difference between the Julian and Gregorian calendars.
  const isFollowingGregorianLeap = ((gYear + 1) % 4 === 0 && (gYear + 1) % 100 !== 0) || ((gYear + 1) % 400 === 0);
  const baseNayrouzDay = 11 + (Math.floor(gYear / 100) - 19) - (Math.floor(gYear / 400) - 4);
  const nayrouzDayForYear = baseNayrouzDay + (isFollowingGregorianLeap ? 1 : 0);

  let copticYear = gYear - 284;
  let nayrouzForCopticYear = Date.UTC(gYear, 8, nayrouzDayForYear); // September is month 8

  if (dateInUTC < nayrouzForCopticYear) {
    const prevGYear = gYear - 1;
    const isFollowingPrevGregorianLeap = ((prevGYear + 1) % 4 === 0 && (prevGYear + 1) % 100 !== 0) || ((prevGYear + 1) % 400 === 0);
    const basePrevNayrouzDay = 11 + (Math.floor(prevGYear / 100) - 19) - (Math.floor(prevGYear / 400) - 4);
    const prevNayrouzDay = basePrevNayrouzDay + (isFollowingPrevGregorianLeap ? 1 : 0);
    nayrouzForCopticYear = Date.UTC(prevGYear, 8, prevNayrouzDay);
  } else {
    copticYear += 1;
  }
  
  const isCopticLeap = copticYear % 4 === 3;

  const diffInMs = dateInUTC - nayrouzForCopticYear;
  const dayOfCopticYear = Math.floor(diffInMs / (1000 * 3600 * 24)) + 1;

  let copticMonth: number;
  let copticDay: number;

  if (dayOfCopticYear <= 360) {
    copticMonth = Math.floor((dayOfCopticYear - 1) / 30) + 1;
    copticDay = ((dayOfCopticYear - 1) % 30) + 1;
  } else {
    copticMonth = 13;
    copticDay = dayOfCopticYear - 360;
  }

  return {
    day: copticDay,
    month: copticMonth,
    monthName: COPTIC_MONTHS[copticMonth - 1],
    monthNameArabic: COPTIC_MONTHS_ARABIC[copticMonth - 1],
    year: copticYear,
    isLeapYear: isCopticLeap,
  };
}
