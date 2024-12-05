import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { TrainLineSelectionPage } from "./pages/train-line-selection.page";
import { StationSelectionPage } from "./pages/station-selection.page";
import { DisplaysDemoPage } from "./pages/displays-demo.page";

import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DisplaysDemoPage />}/>
        <Route path='/train_lines' element={<TrainLineSelectionPage />} />
        <Route path='/train_lines/:line' element={<StationSelectionPage />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root element not found');
}
