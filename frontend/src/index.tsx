import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from "./header/Header";
import App from "./app";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Auth from "./auth/auth";
import AuthBlock from "./Auth";

const router = createBrowserRouter ([
    {
        path: "/",
        element: (
            <App/>
        ),
    },
    {
        path: "/auth",
        element: (
            <AuthBlock/>
        )
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <RouterProvider router={router} />
);