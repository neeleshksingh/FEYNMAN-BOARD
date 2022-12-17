import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error';
import { Board } from './routes/board';
import { AddTopic } from './routes/addTopic';
import { EditTopic } from './routes/editTopic';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:username',
    element: <Board />,
  },
  {
    path: '/:username/add-topic',
    element: <AddTopic />,
  },
  {
    path: '/:username/:textid/edit',
    element: <EditTopic />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
