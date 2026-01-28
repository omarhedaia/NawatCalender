export type CopticDate = {
  day: number;
  month: number;
  monthName: string;
  year: number;
  isLeapYear: boolean;
};

const COPTIC_MONTHS = [
  "Thout", "Paopi", "Hathor", "Koiak", "Tobi", "Meshir",
  "Paremhat", "Paremoude", "Pashons", "Paoni", "Epep", "Mesori",
  "Pi Kogi Enavot"
];

export function gregorianToCoptic(gregorianDate: Date): CopticDate {
  // Use UTC to avoid timezone issues
  const gYear = gregorianDate.getUTCFullYear();
  const dateInUTC = Date.UTC(gYear, gregorianDate.getUTCMonth(), gregorianDate.getUTCDate());

  // The Coptic New Year (Nayrouz) is on Sep 11, unless the following Gregorian year is a leap year, then it is Sep 12.
  // This rule is valid for the Gregorian years 1900 to 2099.
  const isFollowingGregorianLeap = ((gYear + 1) % 4 === 0 && (gYear + 1) % 100 !== 0) || ((gYear + 1) % 400 === 0);
  const nayrouzDay = isFollowingGregorianLeap ? 12 : 11;

  let copticYear = gYear - 284;
  let nayrouzForCopticYear = Date.UTC(gYear, 8, nayrouzDay); // September is month 8

  if (dateInUTC < nayrouzForCopticYear) {
    const isCurrentGregorianLeap = (gYear % 4 === 0 && gYear % 100 !== 0) || (gYear % 400 === 0);
    const prevNayrouzDay = isCurrentGregorianLeap ? 12 : 11;
    nayrouzForCopticYear = Date.UTC(gYear - 1, 8, prevNayrouzDay);
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
    year: copticYear,
    isLeapYear: isCopticLeap,
  };
}
