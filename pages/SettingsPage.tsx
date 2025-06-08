import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { Card, Button, Modal } from '../components/UI';
import { Cog6ToothIcon, TrashIcon } from '../components/Icons';

export const SettingsPage: React.FC = () => {
  const { clearAllData, isDataLoaded } = useAppContext();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleClearData = () => {
    clearAllData();
    setIsConfirmModalOpen(false);
    // Optionally, navigate to home or show a success message
  };
  
  if (!isDataLoaded) return <div className="text-center p-10">Loading settings...</div>;

  return (
    <div className="space-y-6">
      <Card title="Settings" titleIcon={<Cog6ToothIcon className="text-orange-400" />}>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Data Management</h3>
            <p className="text-sm text-slate-400 mb-2">
              This will remove all your logged hoover attempts, symptoms, journal entries, and your No Contact Start Date. This action cannot be undone.
            </p>
            <Button variant="danger" onClick={() => setIsConfirmModalOpen(true)} leftIcon={<TrashIcon className="w-5 h-5"/>}>
              Clear All Application Data
            </Button>
          </div>
          <div className="pt-4 border-t border-slate-700">
             <h3 className="text-lg font-semibold text-slate-200">About</h3>
             <p className="text-sm text-slate-400">
                This app is designed to support your journey of healing and empowerment, inspired by "Breaking The Narcissist Code".
                Remember, you are not alone.
             </p>
             <p className="text-xs text-slate-500 mt-2">
                Version 1.0.0
             </p>
          </div>
        </div>
      </Card>

      <Modal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        title="Confirm Data Deletion"
      >
        <p className="text-slate-300 mb-6">Are you absolutely sure you want to delete all your data? This action is irreversible.</p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={() => setIsConfirmModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleClearData}>Yes, Delete All Data</Button>
        </div>
      </Modal>
    </div>
  );
};