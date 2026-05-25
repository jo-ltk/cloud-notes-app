"use client";

import EmptyState from "@/components/EmptyState";
import NoteCard from "@/components/NoteCard";
import NoteGridSkeleton from "@/components/NoteGridSkeleton";

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type NoteListProps = {
  notes: Note[];
  loading: boolean;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => Promise<void>;
};

export default function NoteList({
  notes,
  loading,
  onEdit,
  onDelete,
}: NoteListProps) {
  if (loading) {
    return <NoteGridSkeleton />;
  }

  if (notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {notes.map((note, index) => (
        <NoteCard
          key={note.id}
          note={note}
          colorIndex={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
