import * as React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom"
import SignIn from './SignIn';
import Dashboard from "./Dashboard";
import ProductDetail from "./ProductDetail";
import AppTheme from "../theme/AppTheme";

export default function App() {
  return (
      <AppTheme>
          <Routes>
              <Route path='/sign-in' element={<SignIn/>}/>
              <Route path='*' element={<Dashboard/>}/>
                <Route path="product/:id/page" element={<ProductDetail />} />
          </Routes>
      </AppTheme>
  );
}
