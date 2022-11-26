import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from '@/routes/root';
import ReferendumPage from '@/routes/referendum';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MayorPage from '@/routes/mayor';
import CouncilPage from '@/routes/council';

import '@/index.css';

const baseRoute = process.env.NODE_ENV === 'production' ? '/2022-election' : '';

const router = createBrowserRouter([
  {
    path: `${baseRoute}/`,
    element: <Root />,
  },
  {
    path: `${baseRoute}/referendum`,
    element: <ReferendumPage />,
  },
  {
    path: `${baseRoute}/mayor`,
    element: <MayorPage />,
  },
  {
    path: `${baseRoute}/council`,
    element: <CouncilPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
