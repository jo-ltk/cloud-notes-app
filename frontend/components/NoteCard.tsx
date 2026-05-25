"use client";

import { PencilIcon, TrashIcon } from "@/components/Icons";
import type { Note } from "@/components/NoteList";

const CARD_COLORS = [
  "bg-amber-100",
  "bg-orange-100",
  "bg-lime-100",
  "bg-violet-100",
  "bg-sky-100",
] as const;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type NoteCardProps = {
  note: Note;
  colorIndex: number;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => Promise<void>;
};

export default function NoteCard({
  note,
  colorIndex,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const bgColor = CARD_COLORS[colorIndex % CARD_COLORS.length];

  return (
    <li
      className={`group ui-note-card h-[118px] sm:h-[124px] ${bgColor}`}
    >
      <button
        type="button"
        onClick={() => onDelete(note.id)}
        className="ui-btn-icon-dark absolute right-2 top-2 h-6 w-6 bg-slate-900/75 opacity-0 transition-opacity duration-200 hover:bg-slate-900 focus:opacity-100 group-hover:opacity-100"
        aria-label="Delete note"
      >
        <TrashIcon className="h-3 w-3" />
      </button>

      <h3 className="line-clamp-1 pr-6 text-sm font-semibold leading-tight text-slate-900">
        {note.title}
      </h3>
      <p className="mt-1 line-clamp-2 flex-1 text-xs leading-snug text-slate-800/85">
        {note.content}
      </p>

      <div className="mt-auto flex items-center justify-between gap-1 pt-1.5">
        <time className="text-[10px] font-medium text-slate-700/65 sm:text-[11px]">
          {formatDate(note.created_at)}
        </time>
        <button
          type="button"
          onClick={() => onEdit(note)}
          className="ui-btn-icon-dark h-7 w-7"
          aria-label="Edit note"
        >
          <PencilIcon className="h-3 w-3" />
        </button>
      </div>
    </li>
  );
}
