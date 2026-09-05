"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse bg-slate-700/30 rounded ${className}`} />;
}

export function ModuleCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-2/3 h-4" />
      <Skeleton className="w-full h-2 rounded-full" />
      <div className="flex gap-4">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="text-center py-6 sm:py-10">
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
        <Skeleton className="w-64 h-8 mx-auto mb-2" />
        <Skeleton className="w-48 h-5 mx-auto" />
      </section>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-xl p-4 space-y-2">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-12 h-6" />
          </div>
        ))}
      </section>
      <section className="glass rounded-xl p-5 space-y-3">
        <Skeleton className="w-32 h-5" />
        <Skeleton className="w-full h-3 rounded-full" />
      </section>
    </div>
  );
}

export function LessonSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Skeleton className="w-48 h-5" />
      <Skeleton className="w-3/4 h-8" />
      <div className="space-y-3">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
      <Skeleton className="w-full h-48 rounded-xl" />
      <div className="space-y-3">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-4/5 h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}

export function QuizSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>
      <Skeleton className="w-full h-2 rounded-full" />
      <Skeleton className="w-3/4 h-6" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-full h-14 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
