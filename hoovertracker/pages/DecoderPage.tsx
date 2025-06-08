
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { Card, Button, Modal, Select, Input, TextArea } from '../components/UI';
import { PlusCircleIcon, TrashIcon, HeartIcon } from '../components/Icons';
import { SymptomLogEntry, SymptomType } from '../types';
import { SYMPTOM_DECODER_MESSAGES } from '../constants';
import { formatDate } from '../services/dateService';

export const DecoderPage: React.FC = () => {
  const { userData, addSymptomLog, deleteSymptomLog, isDataLoaded } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSymptom, setNewSymptom] = useState<{ symptom: SymptomType; intensity: number; notes?: string }>({
    symptom: SymptomType.STOMACH_ISSUES,
    intensity: 3,
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // For numeric input, ensure it's parsed as a number
    const processedValue = name === 'intensity' ? parseInt(value, 10) : value;
    setNewSymptom(prev => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = () => {
    addSymptomLog(newSymptom);
    setIsModalOpen(false);
    setNewSymptom({ symptom: SymptomType.STOMACH_ISSUES, intensity: 3, notes: '' });
  };
  
  if (!isDataLoaded) return <div className="text-center p-10">Loading decoder...</div>;

  const sortedSymptomLogs = [...userData.symptomLogs].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <Card title="Body Truth Decoder" titleIcon={<HeartIcon className="text-orange-400" />} actions={
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<PlusCircleIcon className="w-5 h-5"/>} size="sm">Log Symptom</Button>
      }>
        <p className="text-sm text-slate-300 mb-4">Your body keeps score. Log symptoms to understand its messages and reclaim your truth.</p>
        {sortedSymptomLogs.length === 0 ? (
          <div className="text-center py-6">
            <HeartIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-slate-300 text-lg">Tune Into Your Wisdom</p>
            <p className="text-slate-400 text-sm mt-1">No symptoms logged yet. Your body communicates constantly. Pay attention to its signals and log them here to decode their meaning.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {sortedSymptomLogs.map((log: SymptomLogEntry) => (
              <li key={log.id} className="p-4 bg-slate-700 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-orange-500">{log.symptom} (Intensity: {log.intensity}/5)</p>
                    <p className="text-xs text-slate-400">{formatDate(log.date)}</p>
                    {log.notes && <p className="text-sm text-slate-300 mt-2">Notes: {log.notes}</p>}
                    {log.decodedMessage && <p className="text-sm italic text-orange-300 mt-2">Insight: {log.decodedMessage}</p>}
                  </div>
                   <Button variant="danger" size="sm" onClick={() => deleteSymptomLog(log.id)} className="ml-2 p-1 aspect-square flex items-center justify-center">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Symptom">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <Select label="Symptom Type" name="symptom" value={newSymptom.symptom} onChange={handleInputChange}>
            {Object.values(SymptomType).map(type => <option key={type} value={type}>{type}</option>)}
          </Select>
          <Input type="number" label="Intensity (1-5)" name="intensity" value={newSymptom.intensity.toString()} onChange={handleInputChange} min="1" max="5" />
          <TextArea label="Notes (Optional)" name="notes" value={newSymptom.notes ?? ''} onChange={handleInputChange} placeholder="Any specific triggers or details?" />
          {newSymptom.symptom && SYMPTOM_DECODER_MESSAGES[newSymptom.symptom] && (
            <p className="text-sm italic text-orange-300 mt-2 mb-2">
              Potential Insight: {SYMPTOM_DECODER_MESSAGES[newSymptom.symptom]}
            </p>
          )}
          <div className="flex justify-end space-x-3 mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Log Symptom</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
