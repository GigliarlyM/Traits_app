import { createContext, ReactNode, useContext, useState } from "react";

interface UserProps {
    email: string | null;
    name: string | null;
    auth: string | null;
    addAuth: (auth: string) => void;
    removeAuth: () => void;
    addEmail: (email: string) => void;
    removeEmail: () => void;
    addName: (name: string) => void;
    removeName: () => void;
}

const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const addName = (name: string) => {
        setName(name)
    }
    const removeName = () => {
        setName(null)
    }
    const addEmail = (email: string) => {
        setEmail(email)
    }
    const removeEmail = () => {
        setEmail(null)
    }

    const addAuth = (auth: string) => {
        setAuth(auth)
    }

    const removeAuth = () => {
        setAuth(null)
    }

    const value: UserProps = { email, name, auth, addAuth, removeAuth, addEmail, removeEmail, addName, removeName }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}



export const useAuth = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um UserProvider")
    }
    return context;
}