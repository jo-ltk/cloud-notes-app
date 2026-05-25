import { PlusIcon } from "@/components/Icons";

export default function EmptyState() {
  return (
    <div className="ui-shell flex flex-col items-center justify-center border-dashed px-6 py-14 text-center">
      <div className="ui-btn-icon h-14 w-14 bg-blue-50 text-blue-600 shadow-none hover:scale-100">
        <PlusIcon className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">No notes yet</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
        Create your first note using the form above. Your notes will appear here
        in a beautiful grid.
      </p>
    </div>
  );
}
