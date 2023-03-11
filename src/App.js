import FrontPage from './Components/FrontPage'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route exact path='/home' element={<FrontPage/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
