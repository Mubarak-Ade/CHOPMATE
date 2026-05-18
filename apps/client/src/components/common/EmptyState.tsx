import { Card, CardContent } from "../ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <Card>
    <CardContent className="grid justify-items-center gap-3 px-6 py-10 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-[20px] bg-brand-muted font-mono text-sm font-medium text-brand">
        CM
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
