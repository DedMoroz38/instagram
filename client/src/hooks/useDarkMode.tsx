import { useEffect, useState } from 'react';

type themeMode = 'light' | 'dark';

export const useDarkMode = () => {
    const [theme, setTheme] = useState<themeMode>('light');
    const [mountedComponent, setMountedComponent] = useState<boolean>(false);

    const setMode = (mode: themeMode) => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };


    const themeToggler = (): void => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        if (localTheme === 'light' || localTheme === 'dark'){
            setTheme(localTheme)
        }
        setMountedComponent(true);
    }, []);
    return {theme, themeToggler, mountedComponent}
};