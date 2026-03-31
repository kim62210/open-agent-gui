import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "../../lib/cn";

type SurfaceCardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  meta?: ReactNode;
  className?: string;
}>;

export function SurfaceCard({ title, description, meta, className, children }: SurfaceCardProps) {
  return (
    <section className={cn("workbench-card p-4 sm:p-5", className)}>
      {title || description || meta ? (
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            {title ? <h2 className="text-sm font-semibold text-copy sm:text-base">{title}</h2> : null}
            {description ? <p className="text-sm leading-6 text-copy-muted">{description}</p> : null}
          </div>
          {meta ? <div className="shrink-0">{meta}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
