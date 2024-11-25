import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import DetailPage from './pages/detail';



function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/detail" element={<DetailPage />}/>
        </Routes>
      </BrowserRouter>
  );
};


export default App;
