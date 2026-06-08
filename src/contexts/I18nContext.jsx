import React, { createContext, useState, useEffect, useContext } from 'react';
import translationsData from '../translations.json';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
    const [lang, setLang] = useState('fr');
    const [translations, setTranslations] = useState(translationsData);
    const [loading, setLoading] = useState(false);

    // Keep the global AppState in sync just for any raw vanilla queries
    useEffect(() => {
        import('../state.js').then(({ AppState }) => {
            AppState.translations = translations;
            AppState.lang = lang;
        });
    }, [lang, translations]);

    const t = (key) => {
        if (!translations[lang]) return key;
        return translations[lang][key] || key;
    };

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => useContext(I18nContext);
