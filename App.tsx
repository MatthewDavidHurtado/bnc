import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { TrackerPage } from './pages/TrackerPage';
import { DecoderPage } from './pages/DecoderPage';
import { JournalPage } from './pages/JournalPage';
import { SettingsPage } from './pages/SettingsPage';
import { PatternInterruptPage } from './pages/PatternInterruptPage'; // Added
import { AppProvider } from './AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/decoder" element={<DecoderPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/pattern-interrupt" element={<PatternInterruptPage />} /> {/* Added */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;