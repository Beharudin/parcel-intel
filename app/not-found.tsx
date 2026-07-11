import Link from "next/link";
import { ArrowLeft, MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mesh-bg flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="panel max-w-md p-8 sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/25 bg-brand-500/10">
          <MapPinOff size={22} className="text-brand-400" />
        </div>
        <p className="mb-3 inline-flex rounded-md border border-flag-500/30 bg-flag-500/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-flag-400">
          Not on record
        </p>
        <h1 className="font-display text-2xl font-semibold text-parchment-100">
          This parcel isn&apos;t in the registry
        </h1>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-400">
          The record you&apos;re looking for doesn&apos;t exist in the registry.
        </p>
        <Link href="/" className="btn-ghost mt-8">
          <ArrowLeft size={14} />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
