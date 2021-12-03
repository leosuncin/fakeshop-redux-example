import './App.css';

import { Route, Routes } from 'react-router-dom';

import Header from './features/layout/Header';
import ProductDetails from './features/products/ProductDetails';
import ProductList from './features/products/ProductList';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<h1>404 Not Found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
