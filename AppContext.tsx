import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserData, SymptomLogEntry, HooverAttempt, JournalEntry, SymptomType, HooverAttemptType } from './types';
import { loadData as loadFromStorage, saveData as saveToStorage } from './services/storageService';
import { SYMPTOM_DECODER_MESSAGES } from './constants';

interface AppContextType {
  userData: UserData;
  setNoContactStartDate: (date?: string) => void;
  addSymptomLog: (entryData: { symptom: SymptomType; intensity: number; notes?: string }) => void;
  deleteSymptomLog: (id: string) => void;
  addHooverAttempt: (attemptData: { type: HooverAttemptType; description: string; emotionalImpact?: string; date?: string }) => void;
  deleteHooverAttempt: (id: string) => void;
  addJournalEntry: (entryData: { title: string; content: string; tags?: string[] }) => void;
  deleteJournalEntry: (id: string) => void;
  clearAllData: () => void;
  isDataLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialUserData: UserData = {
  noContactStartDate: undefined,
  symptomLogs: [],
  hooverAttempts: [],
  journalEntries: [],
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loaded = loadFromStorage();
    setUserData(loaded);
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      saveToStorage(userData);
    }
  }, [userData, isDataLoaded]);

  const setNoContactStartDate = (date?: string) => {
    setUserData(prev => ({ ...prev, noContactStartDate: date }));
  };

  const addSymptomLog = (entryData: { symptom: SymptomType; intensity: number; notes?: string }) => {
    const newEntry: SymptomLogEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      decodedMessage: SYMPTOM_DECODER_MESSAGES[entryData.symptom] || "No specific decoder message for this symptom.",
    };
    setUserData(prev => ({ ...prev, symptomLogs: [newEntry, ...prev.symptomLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }));
  };

  const deleteSymptomLog = (id: string) => {
    setUserData(prev => ({ ...prev, symptomLogs: prev.symptomLogs.filter(log => log.id !== id) }));
  };

  const addHooverAttempt = (attemptData: { type: HooverAttemptType; description: string; emotionalImpact?: string; date?: string }) => {
    const newAttempt: HooverAttempt = {
      id: crypto.randomUUID(),
      type: attemptData.type,
      description: attemptData.description,
      emotionalImpact: attemptData.emotionalImpact,
      date: attemptData.date ? new Date(attemptData.date).toISOString() : new Date().toISOString(),
    };
    setUserData(prev => ({ ...prev, hooverAttempts: [newAttempt, ...prev.hooverAttempts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }));
  };

  const deleteHooverAttempt = (id: string) => {
    setUserData(prev => ({ ...prev, hooverAttempts: prev.hooverAttempts.filter(attempt => attempt.id !== id) }));
  };
  
  const addJournalEntry = (entryData: { title: string; content: string; tags?: string[] }) => {
     const newEntry: JournalEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setUserData(prev => ({ ...prev, journalEntries: [newEntry, ...prev.journalEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }));
  };

  const deleteJournalEntry = (id: string) => {
    setUserData(prev => ({ ...prev, journalEntries: prev.journalEntries.filter(entry => entry.id !== id) }));
  };

  const clearAllData = () => {
    setUserData(initialUserData);
    saveToStorage(initialUserData); 
  };

  return (
    <AppContext.Provider value={{ 
        userData, 
        setNoContactStartDate, 
        addSymptomLog, 
        deleteSymptomLog,
        addHooverAttempt, 
        deleteHooverAttempt,
        addJournalEntry,
        deleteJournalEntry, 
        clearAllData,
        isDataLoaded
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};