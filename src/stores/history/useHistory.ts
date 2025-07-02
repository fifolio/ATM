import { create } from 'zustand';

// Interface for the details of a single response
interface ResponseDetails {
    id: number; // Unique ID for this specific response
    timestamp: string; // the time in string format for the generated response
    content: string; // The actual generated content (text)
}

// Interface for a single history entry (a prompt and its corresponding response)
interface HistoryEntry {
    id: number; // Unique ID for this entire interaction (prompt)
    timestamp: string; // the time in string format for the the submitted prompt
    date: string; // the date in string format for the submitted prompt
    user: { // Logged-in user details
        email: string,
        RPU: number, // Number of Requests Per User
        MRPU: number, // Number of Maximum Requests Per User
    }
    prompt: {
        text: string; // The actual prompt text
    };
    response: ResponseDetails[]; // The detailed response array of objects
}

// Main interface for the store
interface HistoryStore {
    history: HistoryEntry[];
    setHistory: (newHistory: HistoryEntry[]) => void;
    addEntry: (entry: HistoryEntry) => void; // Helper to add a new entry
    updateEntry: (id: number, updates: Partial<HistoryEntry>) => void; // Helper to update an existing entry
}

const useHistory = create<HistoryStore>((set) => ({
    history: [], // Initialize as an empty array
    setHistory: (newHistory) => set({ history: newHistory }),
    addEntry: (entry) => set((state) => ({ history: [...state.history, entry] })),
    updateEntry: (id, updates) => set((state) => ({
        history: state.history.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry
        ),
    })),
}));

export default useHistory;