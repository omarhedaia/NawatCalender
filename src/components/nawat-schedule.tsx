import { nawat, Nawa } from '@/lib/nawat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrentNawa } from '@/lib/nawat';

const formatDate = (date: { month: number; day: number }) => {
    const d = new Date(2000, date.month - 1, date.day);
    return d.toLocaleDateString("en-US", { month: 'long', day: 'numeric' });
}

export function NawatSchedule() {
    // We need a client-side check to highlight the current nawa, but we can't do that in a server component directly.
    // Instead we can pass the data to a client component or just display the static table.
    // The prompt requires offline, so this is fine. Highlight can be a progressive enhancement.
    // For simplicity, we just render the table.

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline">Winter Storms (Nawat) Schedule</CardTitle>
        <CardDescription>The traditional schedule of winter storms in Alexandria, Egypt.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="font-semibold">Storm Name</TableHead>
                <TableHead className="font-semibold">Start Date</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {nawat.map((nawa) => (
                <TableRow key={nawa.name}>
                    <TableCell className="font-medium">{nawa.name} <span className="text-muted-foreground">({nawa.arabicName})</span></TableCell>
                    <TableCell>{formatDate(nawa.start)}</TableCell>
                    <TableCell className="text-muted-foreground">{nawa.description}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
}
