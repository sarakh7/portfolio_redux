import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.variable.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Provider store={store}><App /></Provider>} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
