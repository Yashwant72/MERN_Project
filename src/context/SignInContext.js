import React, { createContext, useState } from 'react';

export const SignInContext = createContext();

export const SignInProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <SignInContext.Provider value={{ user, setUser }}>
            {children}
        </SignInContext.Provider>
    );
};
