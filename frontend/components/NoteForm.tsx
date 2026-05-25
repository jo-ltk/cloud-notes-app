"use client";

import { FormEvent, useState } from "react";
import { PlusIcon } from "@/components/Icons";

type NoteFormProps = {
  onAdd: (title: string, content: string) => Promise<void>;
};

export default function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      await onAdd(title.trim(), content.trim());
      setTitle("");
      setContent("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ui-shell">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-600/[0.06] via-white to-white px-4 py-3 sm:px-5">
        <div className="ui-btn-icon h-9 w-9">
          <PlusIcon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold leading-tight text-slate-900">
            New note
          </h2>
          <p className="truncate text-xs text-slate-500">
            Quick capture — title and content below
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="ui-btn-primary hidden shrink-0 sm:inline-flex"
        >
          {submitting ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "Add note"
          )}
        </button>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-4 sm:pb-3">
        <input
          id="note-title"
          type="text"
          aria-label="Title"
          placeholder="Title — meeting, groceries..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ui-field"
          disabled={submitting}
        />
        <textarea
          id="note-content"
          aria-label="Content"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={1}
          className="ui-field resize-none leading-normal"
          disabled={submitting}
        />
      </div>

      <div className="border-t border-slate-50 px-4 pb-3 pt-0 sm:hidden">
        <button
          type="submit"
          disabled={submitting}
          className="ui-btn-primary flex w-full"
        >
          {submitting ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </>
          ) : (
            "Add note"
          )}
        </button>
      </div>
    </form>
  );
}
