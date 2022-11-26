import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from '@/routes/root';
import ReferendumPage from '@/routes/referendum';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MayorPage from '@/routes/mayor';
import CouncilPage from '@/routes/council';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/referendum',
    element: <ReferendumPage />,
  },
  {
    path: '/mayor',
    element: <MayorPage />,
  },
  {
    path: '/council',
    element: <CouncilPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
