"use client";



/**

 * Main page - uses React hooks to manage notes state and talk to Flask API.

 *

 * Hooks used:

 * - useState: notes list, loading, error

 * - useEffect: fetch notes on page load

 * - useCallback: stable fetch/delete handlers

 * - Edit modal: PUT /notes/<id> for full CRUD

 *

 * API flow:

 * Browser -> fetch(NEXT_PUBLIC_API_URL/notes) -> Flask -> SQLite

 */



import { useCallback, useEffect, useState } from "react";

import EditNoteModal from "@/components/EditNoteModal";

import Navbar from "@/components/Navbar";

import NoteForm from "@/components/NoteForm";

import NoteList, { type Note } from "@/components/NoteList";



const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";



export default function Home() {

  const [notes, setNotes] = useState<Note[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [editingNote, setEditingNote] = useState<Note | null>(null);



  const fetchNotes = useCallback(async () => {

    setLoading(true);

    setError(null);

    try {

      const res = await fetch(`${API_URL}/notes`);

      if (!res.ok) throw new Error("Failed to load notes");

      const data = await res.json();

      setNotes(data);

    } catch {

      setError("Could not connect to the API. Is the backend running?");

    } finally {

      setLoading(false);

    }

  }, []);



  useEffect(() => {

    fetchNotes();

  }, [fetchNotes]);



  async function handleAdd(title: string, content: string) {

    const res = await fetch(`${API_URL}/notes`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ title, content }),

    });

    if (!res.ok) throw new Error("Failed to add note");

    await fetchNotes();

  }



  async function handleUpdate(id: number, title: string, content: string) {

    const res = await fetch(`${API_URL}/notes/${id}`, {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ title, content }),

    });

    if (!res.ok) {

      const body = await res.json().catch(() => ({}));

      const msg =

        (body as { error?: string }).error ||

        (res.status === 405

          ? "Wrong backend on port 5000 (often old Docker). Run: docker stop cloud-notes-app-backend-1 — or use http://127.0.0.1:5000 in .env.local and restart npm run dev."

          : `Update failed (${res.status})`);

      throw new Error(msg);

    }

    const updated = await res.json();

    setNotes((prev) =>

      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))

    );

  }



  async function handleDelete(id: number) {

    const res = await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Failed to delete note");

    setNotes((prev) => prev.filter((n) => n.id !== id));

  }



  return (

    <div className="min-h-screen bg-slate-50">

      <Navbar />



      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {error && (

          <div

            role="alert"

            className="ui-alert mb-6"

          >

            {error}

          </div>

        )}



        <div className="space-y-10">

          <NoteForm onAdd={handleAdd} />



          <section>

            <div className="mb-6 flex items-end justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">

                  Your notes

                </h2>

                {!loading && notes.length > 0 && (

                  <p className="mt-1 text-sm text-slate-500">

                    {notes.length} {notes.length === 1 ? "note" : "notes"}

                  </p>

                )}

              </div>

            </div>



            <NoteList

              notes={notes}

              loading={loading}

              onEdit={setEditingNote}

              onDelete={handleDelete}

            />

          </section>

        </div>



        <EditNoteModal

          note={editingNote}

          onClose={() => setEditingNote(null)}

          onSave={handleUpdate}

        />

      </main>

    </div>

  );

}

