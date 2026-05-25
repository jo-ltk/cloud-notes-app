const SKELETON_COLORS = [
  "bg-amber-50",
  "bg-orange-50",
  "bg-lime-50",
  "bg-violet-50",
  "bg-sky-50",
] as const;

export default function NoteGridSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <li
          key={i}
          className={`ui-note-card h-[118px] animate-pulse sm:h-[124px] ${SKELETON_COLORS[i % SKELETON_COLORS.length]}`}
        >
          <div className="space-y-2">
            <div className="h-3 w-2/3 rounded-full bg-slate-200/80" />
            <div className="h-2.5 w-full rounded-full bg-slate-200/50" />
            <div className="h-2.5 w-4/5 rounded-full bg-slate-200/50" />
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div className="h-2 w-1/3 rounded-full bg-slate-200/60" />
            <div className="h-7 w-7 rounded-full bg-slate-200/70" />
          </div>
        </li>
      ))}
    </ul>
  );
}
