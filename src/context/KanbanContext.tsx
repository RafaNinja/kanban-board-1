import { createContext, useContext, useState } from "react";
import { KanbanCard } from "../types/kanban";


type KanbanContextType = {
    cards: KanbanCard[];
    addCard: (title: string, columnId: string) => void;
};

const KanbanContext = createContext<KanbanContextType | null>(null);

export function KanbanProvider({ children }: { children: React.ReactNode }) {
    const [cards, setCards] = useState<KanbanCard[]>([]);

    function addCard(title: string, columnId: string) {
    setCards(prev => [
        ...prev,
        { id: crypto.randomUUID(), title, columnId },
    ]);
    }

    return (
    <KanbanContext.Provider value={{ cards, addCard }}>
        {children}
    </KanbanContext.Provider>
    );
}

export function useKanban() {
    const context = useContext(KanbanContext);
    if (!context) {
    throw new Error("useKanban must be used within KanbanProvider");
}
    return context;
}
