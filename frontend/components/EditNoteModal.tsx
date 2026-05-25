"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Note } from "@/components/NoteList";

type EditNoteModalProps = {
  note: Note | null;
  onClose: () => void;
  onSave: (id: number, title: string, content: string) => Promise<void>;
};

export default function EditNoteModal({
  note,
  onClose,
  onSave,
}: EditNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  if (!note) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!note || !title.trim() || !content.trim()) return;

    setSaving(true);
    try {
      await onSave(note.id, title.trim(), content.trim());
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save note");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-note-title"
    >
      <div
        className="ui-shell animate-in w-full max-w-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-600/[0.06] to-white px-4 py-3 sm:px-5">
          <div>
            <h2 id="edit-note-title" className="text-base font-bold text-slate-900">
              Edit note
            </h2>
            <p className="text-xs text-slate-500">Update and save</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="ui-btn-ghost text-xs"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <input
              id="edit-title"
              type="text"
              aria-label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="ui-field"
              disabled={saving}
            />
            <textarea
              id="edit-content"
              aria-label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={1}
              className="ui-field resize-none leading-normal"
              disabled={saving}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="ui-btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={saving} className="ui-btn-primary">
              {saving ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
