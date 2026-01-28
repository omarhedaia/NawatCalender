import { nawat } from '@/lib/nawat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const formatDate = (date: { month: number; day: number }, language: 'en' | 'ar') => {
    const d = new Date(2000, date.month - 1, date.day);
    return d.toLocaleDateString(language === 'ar' ? 'ar-EG' : "en-US", { month: 'long', day: 'numeric' });
}

export function NawatSchedule({ language }: { language: 'en' | 'ar' }) {
  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline">{language === 'ar' ? 'جدول نوات الشتاء' : 'Winter Storms (Nawat) Schedule'}</CardTitle>
        <CardDescription>{language === 'ar' ? 'الجدول التقليدي لنوات الشتاء في الإسكندرية، مصر.' : 'The traditional schedule of winter storms in Alexandria, Egypt.'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="font-semibold">{language === 'ar' ? 'اسم النوة' : 'Storm Name'}</TableHead>
                <TableHead className="font-semibold">{language === 'ar' ? 'تاريخ البدء' : 'Start Date'}</TableHead>
                <TableHead className="font-semibold">{language === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {nawat.map((nawa) => (
                <TableRow key={nawa.name}>
                    <TableCell className="font-medium">{language === 'ar' ? nawa.arabicName : nawa.name}</TableCell>
                    <TableCell>{formatDate(nawa.start, language)}</TableCell>
                    <TableCell className="text-muted-foreground">{language === 'ar' ? nawa.arabicDescription : nawa.description}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
}
