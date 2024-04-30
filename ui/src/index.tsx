import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PokemonDetails from './pages/PokemonDetails';
import { SharedDataProvider } from './components/SharedData';
import TrainerCollection from './pages/TrainerCollection';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: 'pokemon/:name',
    element: <PokemonDetails />
  },
  {
    path: 'trainer-collection',
    element: <TrainerCollection />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <SharedDataProvider>
      <RouterProvider router={router} />
    </SharedDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
