import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root";
import ErrorPage from "./error-page";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import HoursForm from './routes/hours-form';
import ShowReport from './routes/show-report';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "add-hours",
        element: <HoursForm />,
      },
      {
        path: "show-report",
        element: <ShowReport />,

      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
