import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useNoteContext, type SearchNote } from "../context/NoteContext";

// API is always at origin root; do not use SPA base (e.g. /react) or request hits SPA and returns HTML
const SEARCH_URL = "/api/notes/search";

interface GlobalSearchProps {
  adminApiKey?: string | null;
}

export function GlobalSearch({ adminApiKey = null }: GlobalSearchProps) {
  const { getToken } = useAuth();
  const { setSearch, clearSearch } = useNoteContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      clearSearch();
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const url = `${SEARCH_URL}?q=${encodeURIComponent(query.trim())}`;
        const headers: HeadersInit = {};
        const token = await getToken();
        if (token) headers.Authorization = `Bearer ${token}`;
        if (adminApiKey) (headers as Record<string, string>)["X-API-Key"] = adminApiKey;
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        setResults(list);
        setSearch(query.trim(), list);
        setOpen(true);
      } catch {
        setResults([]);
        setSearch(query.trim(), []);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, setSearch, clearSearch, getToken, adminApiKey]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", flex: "1", maxWidth: 320, margin: "0 1rem" }}>
      <input
        type="search"
        placeholder="Search notes…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim() && setOpen(true)}
        data-testid="global-search-input"
        style={{
          width: "100%",
          padding: "0.375rem 0.75rem",
          fontSize: "0.875rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.25rem",
          outline: "none",
        }}
        aria-label="Search notes"
      />
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            maxHeight: 320,
            overflow: "auto",
            zIndex: 1001,
          }}
        >
          {loading ? (
            <div style={{ padding: "0.75rem", color: "#6b7280", fontSize: "0.875rem" }}>Searching…</div>
          ) : results.length === 0 ? (
            <div style={{ padding: "0.75rem", color: "#6b7280", fontSize: "0.875rem" }}>No notes found</div>
          ) : (
            results.map((note) => (
              <Link
                key={note.id}
                to={`/notes/${note.id}/edit`}
                onClick={() => { setOpen(false); setQuery(""); clearSearch(); }}
                style={{
                  display: "block",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.875rem",
                  color: "#111827",
                  textDecoration: "none",
                  borderBottom: "1px solid #f3f4f6",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#f9fafb";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <span style={{ fontWeight: 600 }}>{note.title || "Untitled"}</span>
                {note.content && (
                  <span style={{ display: "block", color: "#6b7280", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {note.content.slice(0, 60)}…
                  </span>
                )}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
