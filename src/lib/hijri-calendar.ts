export function getHijriDateString(date: Date, language: 'en' | 'ar'): string {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() - 1);

    const locale = language === 'ar' ? 'ar-EG-u-ca-islamic' : 'en-US-u-ca-islamic-nu-latn';
    try {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Africa/Cairo'
        }).format(adjustedDate);
    } catch (e) {
        console.error("Hijri conversion failed", e);
        if (language === 'ar') return 'التحويل الهجري غير متوفر';
        return 'Hijri conversion not available';
    }
}
