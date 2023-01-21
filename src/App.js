import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddCategory from './Components/AddCategory';
import Addmore from './Components/Addmore';
import AddProduct from './Components/AddProduct';
import ProductPage from './Components/ProductPage';
import SelectProduct from './Components/SelectProduct';

function App() {
  return (
   <React.Fragment>
    <Routes>
      <Route path='/' element={<SelectProduct/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/addcategory' element={<AddCategory/>}/>
      <Route path='/products' element={<ProductPage/>}/>
      <Route path='/addmore' element={<Addmore/>}/>
      </Routes>
   </React.Fragment>
  );
}

export default App;
