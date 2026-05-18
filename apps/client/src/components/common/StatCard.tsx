import { Card, CardContent } from "../ui/card";

interface StatCardProps {
  label: string;
  value: string;
  caption: string;
}

export const StatCard = ({ label, value, caption }: StatCardProps) => (
  <Card className="border-border/80 bg-white/80 backdrop-blur-sm">
    <CardContent className="p-5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <strong className="mt-2 block text-3xl font-semibold leading-none text-foreground">
        {value}
      </strong>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{caption}</p>
    </CardContent>
  </Card>
);
