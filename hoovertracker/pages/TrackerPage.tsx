
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { Card, Button, Modal, Input, TextArea, Select } from '../components/UI';
import { PlusCircleIcon, TrashIcon, CalendarDaysIcon, ShieldCheckIcon, LightBulbIcon } from '../components/Icons';
import { calculateHooverPredictions, formatDate, getISODateString } from '../services/dateService';
import { HooverAttempt, HooverPrediction, HooverAttemptType } from '../types';

export const TrackerPage: React.FC = () => {
  const { userData, addHooverAttempt, deleteHooverAttempt, isDataLoaded } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAttempt, setNewAttempt] = useState<{ type: HooverAttemptType; description: string; emotionalImpact?: string; date: string }>({
    type: HooverAttemptType.TEXT,
    description: '',
    emotionalImpact: '',
    date: getISODateString(new Date()), // Use current date as default in ISO format
  });
  const [predictions, setPredictions] = useState<HooverPrediction[]>([]);

  useEffect(() => {
    if (userData.noContactStartDate) {
      setPredictions(calculateHooverPredictions(userData.noContactStartDate));
    } else {
      setPredictions([]);
    }
  }, [userData.noContactStartDate, isDataLoaded]); // Added isDataLoaded dependency

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAttempt(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (newAttempt.description.trim() === '') return; 
    addHooverAttempt({ 
        type: newAttempt.type, 
        description: newAttempt.description, 
        emotionalImpact: newAttempt.emotionalImpact,
        date: newAttempt.date // Pass the user-selected date
    });
    setIsModalOpen(false);
    setNewAttempt({ type: HooverAttemptType.TEXT, description: '', emotionalImpact: '', date: getISODateString(new Date()) });
  };
  
  if (!isDataLoaded) return <div className="text-center p-10">Loading tracker...</div>;

  const sortedHooverAttempts = [...userData.hooverAttempts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <Card title="Hoover Predictions" titleIcon={<LightBulbIcon className="text-orange-400" />}>
        {!userData.noContactStartDate ? (
          <div className="text-center py-6">
            <CalendarDaysIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-slate-300 text-lg">Anchor Your Journey</p>
            <p className="text-slate-400 text-sm mt-1">Set your No Contact Start Date on the Home page to unlock predictions and gain foresight.</p>
          </div>
        ) : predictions.length > 0 ? (
          <ul className="space-y-3">
            {predictions.map(pred => (
              <li key={pred.name} className={`p-3 rounded-md border ${
                pred.isCurrent ? 'border-yellow-500 bg-yellow-500/10' :
                pred.isPast ? 'border-slate-700 opacity-60' : 'border-slate-600'
              }`}>
                <h3 className="font-semibold text-orange-400">{pred.name}</h3>
                <p className="text-sm">Dates: {formatDate(pred.startDate)} - {formatDate(pred.endDate)}</p>
                <p className="text-xs text-slate-400 mt-1">{pred.description}</p>
                {pred.isCurrent && <p className="text-xs text-yellow-400 font-bold mt-1">ALERT: This window is active!</p>}
              </li>
            ))}
          </ul>
        ) : (
           <div className="text-center py-6">
            <CalendarDaysIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-slate-300 text-lg">All Clear for Now</p>
            <p className="text-slate-400 text-sm mt-1">No specific prediction windows upcoming based on your No Contact Date. Stay empowered and aware.</p>
          </div>
        )}
      </Card>

      <Card title="Logged Hoover Attempts" actions={<Button onClick={() => setIsModalOpen(true)} leftIcon={<PlusCircleIcon className="w-5 h-5"/>} size="sm">Log Attempt</Button>}>
        {sortedHooverAttempts.length === 0 ? (
          <div className="text-center py-6">
            <ShieldCheckIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-slate-300 text-lg">Your Shield is Up</p>
            <p className="text-slate-400 text-sm mt-1">No hoover attempts logged yet. Each moment of peace is a victory. Stay vigilant and record any attempts to maintain your clarity.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {sortedHooverAttempts.map((attempt: HooverAttempt) => (
              <li key={attempt.id} className="p-4 bg-slate-700 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-orange-500">{attempt.type} - {formatDate(attempt.date)}</p>
                    <p className="text-sm text-slate-300 mt-1">{attempt.description}</p>
                    {attempt.emotionalImpact && <p className="text-xs italic text-slate-400 mt-2">Impact: {attempt.emotionalImpact}</p>}
                  </div>
                  <Button variant="danger" size="sm" onClick={() => deleteHooverAttempt(attempt.id)} className="ml-2 p-1 aspect-square flex items-center justify-center">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Hoover Attempt">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <Input type="date" label="Date of Attempt" name="date" value={newAttempt.date} onChange={handleInputChange} />
          <Select label="Type of Attempt" name="type" value={newAttempt.type} onChange={handleInputChange}>
            {Object.values(HooverAttemptType).map(type => <option key={type} value={type}>{type}</option>)}
          </Select>
          <TextArea label="Description" name="description" value={newAttempt.description} onChange={handleInputChange} placeholder="Describe the hoover attempt..." required />
          <TextArea label="Emotional Impact (Optional)" name="emotionalImpact" value={newAttempt.emotionalImpact} onChange={handleInputChange} placeholder="How did this make you feel?" />
          <div className="flex justify-end space-x-3 mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Log Attempt</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
