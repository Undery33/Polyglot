import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18 이상에서는 'react-dom/client'를 사용
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';  // i18n 설정 파일을 불러옴

// React 18의 createRoot 사용
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />  {/* <BrowserRouter>로 감싸지 않음 */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
