import React from 'react';
import './App.css';

import Home from './Components/Home/Home';
import Filter from './Components/Filter/Filter';
import  { Routes, Route} from 'react-router-dom';



import RestaurantDetails from './Components/Details/RestaurantDetails';

function App() {
  return (

    <div>
      
      
      <Routes>
         
         <Route path="/" element={<Home/>}/>
         <Route path="/details/:rName" element={<RestaurantDetails/>}/>
         <Route path="/filter" element={<Filter/>}/>
         

      </Routes>
      
      
      
     
    </div>
    
  );
}

export default App;
