import { Badge } from "../ui/badge";

interface StatusBadgeProps {
  tone: "success" | "warning" | "danger" | "neutral";
  children: string;
}

export const StatusBadge = ({ tone, children }: StatusBadgeProps) => (
  <Badge
    variant={
      tone === "neutral"
        ? "default"
        : tone === "success"
          ? "success"
          : tone === "warning"
            ? "warning"
            : "danger"
    }
  >
    {children}
  </Badge>
);
