import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import CreateBeerPage from "./pages/CreateBeerPage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/beer/create' element={ <CreateBeerPage />} />
      </Routes>    
    </div>
  );
}

export default App;
