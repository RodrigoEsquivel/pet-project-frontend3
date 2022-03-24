import React from 'react';
import { useAuth, AuthUser } from './utils/useAuth';
import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SignUpPage } from './pages/SignUpPage';
import { CreateProductPage } from './pages/CreateProductPage';
import { BuyerPage } from './pages/BuyerPage';
import {SellerPage} from './pages/SellerPage';

const Protected = ({user, redirectPath = '/login'}: {user: AuthUser | null | undefined, redirectPath?: string}) => {
  if(!user) return <Navigate to={redirectPath} replace></Navigate>
  return <Outlet />
}

const Public = ({user, redirectPath = '/Buyer'}: {user: AuthUser | null | undefined, redirectPath?: string}) => {
  if(user) return <Navigate to={redirectPath} replace></Navigate>
  return <Outlet />
}

function App() {
  const auth = useAuth();
  return (
    <BrowserRouter> 
      <Routes>
        <Route element={<Public user={auth?.user}/>}>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />}/>
        </Route>
        <Route element={<Protected user={auth?.user}/>}>
          <Route path="/CreateProduct" element={<CreateProductPage />} />
          <Route path="/Buyer" element={<BuyerPage />} />
          <Route path="/Seller" element={<SellerPage />} /> 
        </Route>
        <Route element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
