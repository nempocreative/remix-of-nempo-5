import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const NempoApp = lazy(() => import("@/nempo-app"));

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0194f3] border-t-transparent" />
    </div>
  );
}

export function NempoShell() {
  return (
    <div id="root">
      <ClientOnly fallback={<Loader />}>
        <Suspense fallback={<Loader />}>
          <NempoApp />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
