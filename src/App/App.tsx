import { Route, Routes } from 'react-router';
import './App.css';
import Layout from './Layout';
import MainPage from './MainPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;

