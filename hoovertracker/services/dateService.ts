import { HOOVER_CYCLE_DEFINITIONS } from '../constants';
import { HooverPrediction } from '../types';

export const calculateHooverPredictions = (startDateString?: string): HooverPrediction[] => {
  if (!startDateString) return [];

  const startDate = new Date(startDateString);
  if (isNaN(startDate.getTime())) return [];

  const today = new Date();
  today.setHours(0,0,0,0); // Normalize today to start of day for comparison

  return HOOVER_CYCLE_DEFINITIONS.map(cycle => {
    const cycleStartDate = new Date(startDate);
    cycleStartDate.setDate(startDate.getDate() + cycle.startDays);
    cycleStartDate.setHours(0,0,0,0);

    const cycleEndDate = new Date(startDate);
    cycleEndDate.setDate(startDate.getDate() + cycle.endDays);
    cycleEndDate.setHours(23,59,59,999); // Normalize cycleEndDate to end of day

    const isPast = today > cycleEndDate;
    const isCurrent = today >= cycleStartDate && today <= cycleEndDate;
    const isUpcoming = today < cycleStartDate;

    return {
      name: cycle.name,
      startDate: cycleStartDate,
      endDate: cycleEndDate,
      description: cycle.description,
      isPast,
      isCurrent,
      isUpcoming,
    };
  }).sort((a,b) => a.startDate.getTime() - b.startDate.getTime()); // Sort by start date
};

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
   if (isNaN(dateObj.getTime())) return "Invalid Date";
  return dateObj.toLocaleDateString(undefined, options || { year: 'numeric', month: 'long', day: 'numeric' });
};

export const getDaysSince = (dateString?: string): number | null => {
    if (!dateString) return null;
    const startDate = new Date(dateString);
    if (isNaN(startDate.getTime())) return null;
    const today = new Date();
    const differenceInTime = today.getTime() - startDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};

export const getISODateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
}