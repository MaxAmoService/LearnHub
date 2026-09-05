"use client";

import React, { Suspense, lazy, ComponentType } from "react";

const cache = new Map<string, ComponentType>();

function InteractiveSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="h-6 bg-slate-700/50 rounded w-1/3" />
      <div className="h-4 bg-slate-700/30 rounded w-2/3" />
      <div className="h-48 bg-slate-700/20 rounded-xl" />
      <div className="flex gap-3">
        <div className="h-10 bg-slate-700/30 rounded-lg w-24" />
        <div className="h-10 bg-slate-700/30 rounded-lg w-24" />
      </div>
    </div>
  );
}

export function lazyInteractive(factory: () => Promise<{ default: ComponentType<any> }>): ComponentType<any> {
  const LazyComponent = lazy(factory);
  return function Wrapped(props: any) {
    return (
      <Suspense fallback={<InteractiveSkeleton />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
