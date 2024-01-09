import logo from './logo.svg';
import Login from './components/Login';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Home from './components/Home';
import Myproperties from './components/Myproperties';

import CreateProduct from './components/CreateProduct';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' Component={Login}/>
      <Route exact path='/orders/:id' Component={Orders}/>
      <Route exact path='/createproperty/:id' Component={CreateProduct}/>
      <Route exact path='/myproperties/:id' Component={Myproperties}/>
      <Route exact path='/explore/:id' Component={Home}/>
      <Route exact path='/profile/:id' Component={Profile} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
