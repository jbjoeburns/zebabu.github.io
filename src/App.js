import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Homepage from './pages/homepage/homepage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;