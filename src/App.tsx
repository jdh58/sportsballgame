import Header from './components/Header';
import HomePage from './components/HomePage';
import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
