import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from '@/routes/root';
import ReferendumPage from '@/routes/referendum';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MayorPage from '@/routes/mayor';
import CouncilPage from '@/routes/council';
import { BASE_ROUTE } from '@/routes/root';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: `${BASE_ROUTE}/`,
    element: <Root />,
  },
  {
    path: `${BASE_ROUTE}/referendum`,
    element: <ReferendumPage />,
  },
  {
    path: `${BASE_ROUTE}/mayor`,
    element: <MayorPage />,
  },
  {
    path: `${BASE_ROUTE}/council`,
    element: <CouncilPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
