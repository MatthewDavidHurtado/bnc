import { UserData } from '../types';

const STORAGE_KEY = 'hooverTrackerData';

const initialData: UserData = {
  noContactStartDate: undefined,
  symptomLogs: [],
  hooverAttempts: [],
  journalEntries: [],
};

export const loadData = (): UserData => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData === null) {
      return initialData;
    }
    const storedData = JSON.parse(serializedData);
    // Ensure all keys from initialData are present to handle schema updates
    return { ...initialData, ...storedData };
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return initialData;
  }
};

export const saveData = (data: UserData): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};