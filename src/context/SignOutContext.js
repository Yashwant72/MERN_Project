import React, { createContext, useState } from 'react';

export const SignOutContext = createContext();

export const SignOutProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <SignOutContext.Provider value={{ user, setUser }}>
            {children}
        </SignOutContext.Provider>
    );
};
