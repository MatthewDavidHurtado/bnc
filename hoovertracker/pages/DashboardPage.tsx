

import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../AppContext';
import { Card, Button, Input } from '../components/UI';
import { PlusCircleIcon, ShieldCheckIcon, LightBulbIcon, SparklesIcon, HandRaisedIcon } from '../components/Icons'; // Added HandRaisedIcon
import { calculateHooverPredictions, getDaysSince, formatDate } from '../services/dateService';
import { EMPOWERMENT_QUOTES, TAGLINE, SOVEREIGN_MILESTONES } from '../constants';
import { HooverPrediction } from '../types';
import { useNavigate } from 'react-router-dom';


export const DashboardPage: React.FC = () => {
  const { userData, setNoContactStartDate, isDataLoaded } = useAppContext();
  const [localNoContactDate, setLocalNoContactDate] = useState<string>('');
  const [predictions, setPredictions] = useState<HooverPrediction[]>([]);
  const [daysSinceNC, setDaysSinceNC] = useState<number | null>(null);
  const [dailyQuote, setDailyQuote] = useState<string>('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isDataLoaded) {
      if (userData.noContactStartDate) {
        setLocalNoContactDate(userData.noContactStartDate);
        setPredictions(calculateHooverPredictions(userData.noContactStartDate));
        setDaysSinceNC(getDaysSince(userData.noContactStartDate));
      } else {
        setLocalNoContactDate(''); 
        setPredictions([]);
        setDaysSinceNC(null);
      }
      // Select a new quote when data is loaded (effectively on initial mount or full data reload)
      setDailyQuote(EMPOWERMENT_QUOTES[Math.floor(Math.random() * EMPOWERMENT_QUOTES.length)]);
    }
  }, [userData.noContactStartDate, isDataLoaded]);


  const handleSetDate = () => {
    if (localNoContactDate) {
      setNoContactStartDate(localNoContactDate);
    } else {
      setNoContactStartDate(undefined); 
      setPredictions([]);
      setDaysSinceNC(null);
    }
  };

  const nextPrediction = predictions.find(p => p.isUpcoming || p.isCurrent);

  const freedomDisplay = useMemo(() => {
    if (daysSinceNC === null) return null;

    const milestone = SOVEREIGN_MILESTONES.slice().reverse().find(m => daysSinceNC >= m.days); // Find highest applicable milestone

    let message;
    if (milestone && daysSinceNC === milestone.days) { // Exact hit for milestone day
        message = milestone.message;
    } else {
        message = `${daysSinceNC} Days of Freedom!`;
    }

    return (
      <div className="mt-4 p-4 bg-slate-700/50 rounded-lg text-center">
        <p className="text-green-400 font-bold text-2xl sm:text-3xl flex items-center justify-center">
          <SparklesIcon className="w-7 h-7 sm:w-8 sm:h-8 mr-2 text-yellow-400" />
          {message}
        </p>
        {!(milestone && daysSinceNC === milestone.days) && <p className="text-sm text-slate-300 mt-1">Keep building your peace.</p>}
      </div>
    );
  }, [daysSinceNC]);

  if (!isDataLoaded) {
    return <div className="text-center p-10">Loading your sacred space...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white text-center">
        <p className="text-lg font-semibold">{TAGLINE}</p>
        <p className="text-sm mt-1">Your journey to sovereignty starts now.</p>
      </Card>

      <Card title="Today's Spark of Sovereignty" titleIcon={<LightBulbIcon className="text-orange-400" />}>
        <p className="text-center italic text-slate-300">"{dailyQuote}"</p>
      </Card>

      <Card title="No Contact Anchor" titleIcon={<ShieldCheckIcon className="text-orange-400" />}>
        <div className="space-y-3">
          {!userData.noContactStartDate && (
            <p className="text-slate-300 mb-3 text-sm">
              Setting your No Contact Start Date is the first powerful step. This date becomes your anchor, marking the beginning of your freedom and clarity. From this day forward, you build your new reality.
            </p>
          )}
          <Input
            label="No Contact Start Date:"
            type="date"
            id="noContactDate"
            value={localNoContactDate}
            onChange={(e) => setLocalNoContactDate(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleSetDate} size="sm">
            {userData.noContactStartDate ? 'Update Anchor Date' : 'Set Anchor Date'}
          </Button>
          {userData.noContactStartDate && freedomDisplay}
        </div>
      </Card>

      {userData.noContactStartDate && (
        <Card title="Upcoming Hoover Window" titleIcon={<LightBulbIcon className="text-orange-400" />}>
          {nextPrediction ? (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-orange-400">{nextPrediction.name}</h3>
              <p>Predicted: {formatDate(nextPrediction.startDate)} - {formatDate(nextPrediction.endDate)}</p>
              <p className="text-sm text-slate-300">{nextPrediction.description}</p>
              {nextPrediction.isCurrent && <p className="text-yellow-400 font-bold mt-1">This window is currently active. Stay strong!</p>}
            </div>
          ) : (
            <p className="text-slate-300">All known prediction windows have passed based on your No Contact Date. Continue to be mindful and celebrate your progress.</p>
          )}
           <Button variant="ghost" size="sm" className="mt-4" onClick={() => navigate('/tracker')}>View Full Tracker</Button>
        </Card>
      )}

      <Card title="Pattern Interrupt Tool" titleIcon={<HandRaisedIcon className="text-orange-400" />}>
        <p className="text-sm text-slate-300 mb-3">
          Feeling a familiar pattern activate? Use this guided protocol to pause, reflect, and choose differently.
        </p>
        <Button onClick={() => navigate('/pattern-interrupt')} leftIcon={<HandRaisedIcon className="w-5 h-5"/>}>
          Start Pattern Interrupt
        </Button>
      </Card>

      <Card title="Quick Actions">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button variant="secondary" onClick={() => navigate('/decoder')} leftIcon={<PlusCircleIcon className="w-5 h-5" />}>Log Symptom</Button>
          <Button variant="secondary" onClick={() => navigate('/tracker')} leftIcon={<PlusCircleIcon className="w-5 h-5" />}>Log Hoover</Button>
          <Button variant="secondary" onClick={() => navigate('/journal')} leftIcon={<PlusCircleIcon className="w-5 h-5" />}>New Journal Entry</Button>
        </div>
      </Card>
      
    </div>
  );
};