import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import CreateBeerPage from "./pages/CreateBeerPage"
import AllBeers from './pages/AllBeers';
import Navbar from './components/Navbar';
import Signup from './pages/SignupPage/Signup';
import Login from './pages/LoginPage/login';
import About from './pages/AboutPage/About';
import Mylist from './pages/MyListPage/MyList';
import Profile from './pages/ProfilePage/ProfilePage';
import SingleBeer from './pages/SingleBeerPage/SingleBeer';
import { AuthProviderWrapper } from './context/auth.context';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <AuthProviderWrapper>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/beer/create' element={ <CreateBeerPage />} />
        <Route path='/beer/all' element={ <AllBeers/>} />
        <Route path='/user/signup' element={ <Signup/>}/>
        <Route path='/user/login' element={ <Login/>}/>
        <Route path='/about' element={ <About/>}/>
        <Route path='/mylist' element={ <Mylist/>}/>
        <Route path='/profile' element={ <Profile/>}/>
        <Route path='/beer/all/:beerId' element={ <SingleBeer/>}/>
      </Routes>    
      </AuthProviderWrapper>
    </div>
  );
}

export default App;
