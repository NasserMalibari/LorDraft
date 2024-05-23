import logo from './logo.svg';
import './App.css';
import Welcome from './pages/Welcome';
import { BrowserRouter, Route, Routes, useParams  } from 'react-router-dom';
import Draft from './pages/Draft';

function App() {

  let { type } = useParams()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path="/draft/:type" element={<Draft />}></Route>
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
