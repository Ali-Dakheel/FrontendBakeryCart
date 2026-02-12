import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`max-w-md mx-auto text-center space-y-6 py-12 ${className}`}>
      <div className="mx-auto w-32 h-32 rounded-full bg-cream-dark flex items-center justify-center">
        <Icon className="h-16 w-16 text-navy/20" />
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-navy">{title}</h2>
        <p className="text-navy/60">{description}</p>
      </div>
      {action && (
        <>
          {action.href ? (
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light">
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-navy hover:bg-navy-light"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
