import React, { createContext, useContext, useState, useCallback } from 'react';
import enStrings from '../locales/en.json';
import hiStrings from '../locales/hi.json';

type Language = 'en' | 'hi';

// Deeply nested key access
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key] & object>}`
    : Key;
}[keyof ObjectType & string];

type TranslationKey = NestedKeyOf<typeof enStrings>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedValue = (obj: Record<string, unknown>, key: string): string => {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
};

const strings: Record<Language, Record<string, unknown>> = {
  en: enStrings as unknown as Record<string, unknown>,
  hi: hiStrings as unknown as Record<string, unknown>,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'hi';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return getNestedValue(strings[language], key) || getNestedValue(strings['en'], key) || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};
