import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SignUpPage } from './pages/SignUpPage';
import { CreateProductPage } from './pages/CreateProductPage';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />}/>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/CreateProduct" element={<CreateProductPage />} />
        <Route element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
