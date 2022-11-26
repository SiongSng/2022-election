import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from '@/routes/root';
import ReferendumPage from '@/routes/referendum';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MayorPage from '@/routes/mayor';
import CouncilPage from '@/routes/council';

import '@/index.css';

export const BASE_ROUTE =
  process.env.NODE_ENV === 'production' ? '/2022-election' : '';

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
