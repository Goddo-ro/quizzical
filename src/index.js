import React from 'react';
import ReactDOM from 'react-dom/client';
import { usePromiseTracker } from "react-promise-tracker";
import { TailSpin } from 'react-loader-spinner';
import './index.css';
import App from './App';


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && 
    <div className="loader">
      <TailSpin color="var(--blue-color)" height="100" width="100" />
    </div>
  );  
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <LoadingIndicator/>
  </React.StrictMode>
);
