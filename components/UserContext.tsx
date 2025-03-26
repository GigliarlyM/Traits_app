import { createContext, ReactNode, useContext, useState } from "react";

interface UserProps {
    auth: String | null;
    removeAuth: () => void;
    addAuth: (auth: String) => void;
}

const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<String | null>(null);

    const addAuth = (auth: String) => {
        setAuth(auth)
    }

    const removeAuth = () => {
        setAuth(null)
    }

    const value = { auth, removeAuth, addAuth }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useAuth = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um UserProvider")
    }
    return context;
}