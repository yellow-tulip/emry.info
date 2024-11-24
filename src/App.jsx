import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './components/GlobalStyles';
import { Navigation } from './components/Navigation';
import { WorkPage } from './components/work/WorkPage';
import { AmbientSoundscape } from './components/AmbientSoundscape';
import { Typography } from './components/Typography';
import { HomePage } from './components/home/HomePage';
import { ContactPage } from './components/contact/ContactPage';
import { AmbientSoundscapeProvider } from './components/AmbientSoundscapeContext';
import { VolumeControl } from './components/VolumeControl';
import { MePage } from './components/me/MePage';

export default function App() {
  return (
    <AmbientSoundscapeProvider>
      <GlobalStyles />
      <Navigation />
      <Routes>
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<Typography />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <VolumeControl />
      <AmbientSoundscape />
    </AmbientSoundscapeProvider>
  );
}
