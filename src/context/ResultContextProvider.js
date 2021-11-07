import { process } from 'cssnano';
import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseURL = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Lucifer');

    // /videos, /search, /images
    const getResults = async (type) => {
        setIsLoading(true);
        const response = await fetch(`${baseURL}${type}`, {
            method: 'GET', headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': "88184459cemsha2e9bd254546681p17d14ajsnc87a5b77db4b",
            }
        });
        const data = await response.json();
        if (type.includes('/news')) {
            setResults(data.entries);
        } else if (type.includes('/images')) {
            setResults(data.image_results);
        } else {
            setResults(data.results);
        }
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        setIsLoading(false);
    }
    return (
        <ResultContext.Provider value={{
            getResults, results, searchTerm, setSearchTerm, isLoading
        }}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext);