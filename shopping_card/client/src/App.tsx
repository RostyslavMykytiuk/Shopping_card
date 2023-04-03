import React, { useEffect, useState } from 'react';
import {Routes,Route} from 'react-router-dom'
import { AddForm } from './components/AddForm/AddForm';
import ProductsCard  from './components/ProductsCard/ProductsCard';

function App() {
  return(
    <div className='app'>
      <Routes>
        <Route path='/add' Component={AddForm} />
        <Route path='/'Component={ProductsCard}/>
      </Routes>
    </div>
  );
}

export default App;
