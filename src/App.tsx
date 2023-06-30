import Header from './components/Header';
import HomePage from './components/HomePage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import OptionsPage from './components/OptionsPage';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/whoami/options" element={<OptionsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
