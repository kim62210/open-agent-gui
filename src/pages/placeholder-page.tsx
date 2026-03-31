import type { ReactNode } from "react";
import { PageFrame } from "../components/ui/page-frame";
import { SurfaceCard } from "../components/ui/surface-card";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  details: Array<{ label: string; value: string }>;
  sections: Array<{
    title: string;
    description: string;
    body: ReactNode;
  }>;
};

export function PlaceholderPage({ eyebrow, title, description, status, details, sections }: PlaceholderPageProps) {
  return (
    <PageFrame
      eyebrow={eyebrow}
      title={title}
      description={description}
      actions={<div className="workbench-chip border-accent/40 bg-accent-soft text-accent">{status}</div>}
    >
      <div className="space-y-5">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label} className="workbench-card p-4">
              <p className="workbench-label">{detail.label}</p>
              <p className="mt-3 text-sm font-medium text-copy sm:text-base">{detail.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {sections.map((section) => (
            <SurfaceCard key={section.title} title={section.title} description={section.description}>
              <div className="text-sm leading-6 text-copy-muted">{section.body}</div>
            </SurfaceCard>
          ))}
        </section>
      </div>
    </PageFrame>
  );
}
