import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function Journal() {
  const [entries, setEntries] = useLocalStorage("journalEntries", []);
  const [currentEntry, setCurrentEntry] = useState("");
  const [editingId, setEditingId] = useState(null);

  function saveEntry() {
    if (!currentEntry.trim()) return;

    if (editingId) {
      setEntries(entries.map(e => 
        e.id === editingId ? { ...e, text: currentEntry, date: new Date().toLocaleString() } : e
      ));
      setEditingId(null);
    } else {
      const newEntry = {
        id: Date.now().toString(),
        text: currentEntry,
        date: new Date().toLocaleString(),
      };
      setEntries([newEntry, ...entries]);
    }
    setCurrentEntry("");
  }

  function editEntry(entry) {
    setCurrentEntry(entry.text);
    setEditingId(entry.id);
  }

  function deleteEntry(id) {
    setEntries(entries.filter(e => e.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentEntry("");
    }
  }

  return (
    <div>
      <h1 className="page-title">Reflective Journal</h1>
      <p className="page-subtitle">Write down your thoughts, reflections, or moments of gratitude.</p>

      <div className="card mb-4">
        <h2>{editingId ? "Edit Entry" : "New Entry"}</h2>
        <textarea 
          placeholder="How was your day? What's on your mind?"
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
        />
        <div className="flex justify-between items-center mt-4">
          {editingId && (
            <button onClick={() => { setEditingId(null); setCurrentEntry(""); }}>
              Cancel
            </button>
          )}
          <button className="primary-btn" style={{ width: 'auto', margin: '0 0 0 auto' }} onClick={saveEntry}>
            <Plus size={18} /> {editingId ? "Update" : "Save Entry"}
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Journal Timeline</h2>
        {entries.length === 0 ? (
          <p className="text-muted text-center" style={{ padding: '24px 0' }}>It's quiet here. Start writing to see your timeline!</p>
        ) : (
          <div style={{ marginTop: '24px' }}>
            {entries.map(entry => (
              <div key={entry.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">{entry.date}</div>
                <div className="timeline-content">
                  {entry.text}
                  <div className="timeline-actions">
                    <button className="icon-btn" onClick={() => editEntry(entry)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn" onClick={() => deleteEntry(entry.id)} style={{ color: '#ef4444' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
