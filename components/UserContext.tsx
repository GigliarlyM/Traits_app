import { createContext, ReactNode, useContext, useState } from "react";

interface UserProps {
    name: string | null;
    auth: string | null;
    addAuth: (auth: string, name: string) => void;
    removeAuth: () => void;
    addName: (name: string) => void;
    removeName: () => void;
}

const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    const addName = (name:string)=>{
        setName(name)
    }
    const removeName = ()=>{
        setName(null)
    }

    const addAuth = (auth: string, name: string) => {
        setAuth(auth)
    }

    const removeAuth = () => {
        setAuth(null)
    }

    const value: UserProps = { name, auth, addAuth, removeAuth, addName, removeName }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}



export const useAuth = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um UserProvider")
    }
    return context;
}