import type { PropsWithChildren, ReactNode } from "react";

type PageFrameProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}>;

export function PageFrame({ eyebrow, title, description, actions, children }: PageFrameProps) {
  return (
    <section className="workbench-panel overflow-hidden">
      <header className="border-b border-line/60 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="workbench-label">{eyebrow}</p>
            <div className="space-y-2">
              <h1 className="font-display text-3xl tracking-tight text-copy sm:text-[2.25rem]">{title}</h1>
              <p className="max-w-2xl text-sm leading-7 text-copy-muted sm:text-base">{description}</p>
            </div>
          </div>
          {actions ? <div className="flex shrink-0 items-start">{actions}</div> : null}
        </div>
      </header>
      <div className="px-5 py-5 sm:px-6">{children}</div>
    </section>
  );
}
