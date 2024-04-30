import React, { createContext, useContext, useState, ReactNode } from 'react';

type SharedDataContextType = {
    handleCatchPokemon: (name: string) => void;
    myPokemons: string[];
    viewedPokemons: string[];
    handleViewPokemon: (name: string) => void;
};

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

export const SharedDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [myPokemons, setMyPokemons] = useState<string[]>([]);
    const [viewedPokemons, setViewedPokemons] = useState<string[]>([]);

    const handleCatchPokemon = (name: string) => {
        if(myPokemons?.filter(mp => mp === name).length === 0){
            setMyPokemons([...myPokemons, name])
            setViewedPokemons([...viewedPokemons, name])
        }
    }
    
    const handleViewPokemon = (name: string) => {
        if(viewedPokemons?.filter(mp => mp === name).length === 0){
            setViewedPokemons([...viewedPokemons, name])
        }
    }

    const value = {
        myPokemons,
        handleCatchPokemon,
        viewedPokemons,
        handleViewPokemon
    };

    return (
        <SharedDataContext.Provider value={value}>
            {children}
        </SharedDataContext.Provider>
    );
};

export const useSharedData = () => {
    const context = useContext(SharedDataContext);
    if (!context) {
        throw new Error('useSharedData must be used within a SharedDataProvider');
    }
    return context;
};
