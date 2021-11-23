import logo from './logo.svg';
import './App.css';
import  img1 from "./components/photo/bg1.jpg";
import Navbar from './components/Navbar';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Service from './components/Service';
import project from './components/Project';
import Project from './components/Project';

import {Route,Switch} from "react-router-dom"

import { BrowserRouter } from 'react-router-dom';




function App() {
  return (
   <BrowserRouter>
   <Navbar/>         
    <Switch>
     <Route exact path="/">
       
       <Body/>
   </Route>

   <Route extact path="/service">
     <Service/>
     </Route>

     <Route extact path="/contact">
     <Contact/>
     </Route>

     <Route extact path="/about">
       <About/>
     </Route>

     

    
    </Switch>
    </BrowserRouter>
  
    
  )
}

export default App;
