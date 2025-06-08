
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { Card, Button, Modal, Input, TextArea } from '../components/UI';
import { PlusCircleIcon, TrashIcon, BookOpenIcon } from '../components/Icons';
import { JournalEntry } from '../types';
import { formatDate } from '../services/dateService';

export const JournalPage: React.FC = () => {
  const { userData, addJournalEntry, deleteJournalEntry, isDataLoaded } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<{ title: string; content: string; tags?: string }>({
    title: '',
    content: '',
    tags: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (newEntry.title.trim() === '' || newEntry.content.trim() === '') return;
    addJournalEntry({ 
        title: newEntry.title, 
        content: newEntry.content, 
        tags: newEntry.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) 
    });
    setIsModalOpen(false);
    setNewEntry({ title: '', content: '', tags: '' });
  };
  
  if (!isDataLoaded) return <div className="text-center p-10">Loading journal...</div>;
  
  const sortedJournalEntries = [...userData.journalEntries].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <Card title="Personal Journal" titleIcon={<BookOpenIcon className="text-orange-400" />} actions={
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<PlusCircleIcon className="w-5 h-5"/>} size="sm">New Entry</Button>
      }>
        <p className="text-sm text-slate-300 mb-4">Document your thoughts, feelings, and breakthroughs on your path to sovereignty.</p>
        {sortedJournalEntries.length === 0 ? (
          <div className="text-center py-6">
            <BookOpenIcon className="w-12 h-12 mx-auto text-slate-500 mb-3" />
            <p className="text-slate-300 text-lg">Your Story Unfolds Here</p>
            <p className="text-slate-400 text-sm mt-1">No journal entries yet. This is your sacred space to write your story of liberation, process emotions, and track your growth.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {sortedJournalEntries.map((entry: JournalEntry) => (
              <li key={entry.id} className="p-4 bg-slate-700 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-orange-500">{entry.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">{formatDate(entry.date)}</p>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{entry.content}</p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="mt-2">
                        {entry.tags.map(tag => (
                          <span key={tag} className="text-xs bg-orange-700 text-orange-200 px-2 py-0.5 rounded-full mr-1">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="danger" size="sm" onClick={() => deleteJournalEntry(entry.id)} className="ml-2 p-1 aspect-square flex items-center justify-center">
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Journal Entry">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <Input label="Title" name="title" value={newEntry.title} onChange={handleInputChange} placeholder="Title of your entry" required />
          <TextArea label="Content" name="content" value={newEntry.content} onChange={handleInputChange} placeholder="Write your thoughts here..." rows={6} required />
          <Input label="Tags (comma-separated, optional)" name="tags" value={newEntry.tags ?? ''} onChange={handleInputChange} placeholder="e.g., breakthrough, pattern, healing" />
          <div className="flex justify-end space-x-3 mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Entry</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
