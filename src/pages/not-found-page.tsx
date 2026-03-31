import { Link } from "@tanstack/react-router";
import { PageFrame } from "../components/ui/page-frame";

export function NotFoundPage() {
  return (
    <PageFrame
      eyebrow="Shell"
      title="Page not found"
      description="This route is outside the current workbench map. Jump back into one of the approved Phase 0 surfaces."
      actions={
        <Link
          to="/chat"
          className="inline-flex items-center rounded-full border border-accent/35 bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition hover:border-accent/50"
        >
          Return to chat
        </Link>
      }
    >
      <p className="text-sm leading-7 text-copy-muted">
        The app shell is routing correctly, but this path has not been defined in the initial information architecture.
      </p>
    </PageFrame>
  );
}
