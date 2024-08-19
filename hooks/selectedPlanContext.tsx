"use client"; // This should be at the top of the file

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    FC,
    useEffect,
  } from "react";
  
interface Plan {
    _id: string;
    name: string;
    network: string;
    duration: string;
    roi: string;
    min: string;
    features: string[];
}

interface SelectedPlanContextType {
    selectedPlan: Plan | null;
    setSelectedPlan: (plan: Plan | null) => void;
    selectedId: string | null;
    setSelectedId: (id: string | null) => void;
}

const SelectedPlanContext = createContext<SelectedPlanContextType | undefined>(
    undefined
);

interface SelectedPlanProviderProps {
    children: ReactNode;
}

const SelectedPlanProvider: FC<SelectedPlanProviderProps> = ({ children }) => {
    const [selectedPlan, setSelectedPlanState] = useState<Plan | null>(() => {
        if (typeof window !== 'undefined') {
            const storedPlan = sessionStorage.getItem("selectedPlan");
            return storedPlan ? JSON.parse(storedPlan) : null;
        }
        return null;
    });

    const [selectedId, setSelectedIdState] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem("selectedId");
        }
        return null;
    });

    const setSelectedPlan = (plan: Plan | null) => {
        setSelectedPlanState(plan);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("selectedPlan", JSON.stringify(plan));
        }
    };

    const setSelectedId = (id: string | null) => {
        setSelectedIdState(id);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem("selectedId", id || "");
        }
    };

    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (event.key === "selectedPlan") {
                setSelectedPlanState(
                    event.newValue ? JSON.parse(event.newValue) : null
                );
            } else if (event.key === "selectedId") {
                setSelectedIdState(event.newValue || null);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    const contextValue: SelectedPlanContextType = {
        selectedPlan,
        setSelectedPlan,
        selectedId,
        setSelectedId,
    };

    return (
        <SelectedPlanContext.Provider value={contextValue}>
            {children}
        </SelectedPlanContext.Provider>
    );
};

const useSelectedPlan = (): SelectedPlanContextType => {
    const context = useContext(SelectedPlanContext);
    if (!context) {
        throw new Error(
            "useSelectedPlan must be used within a SelectedPlanProvider"
        );
    }
    return context;
};

export { SelectedPlanProvider, useSelectedPlan, SelectedPlanContext };
