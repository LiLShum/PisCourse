import React, {Children, createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./app";
import {NextUIProvider} from "@nextui-org/react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import AuthRegister from "./Auth-register";
import AuthBlock from "./Auth";
import Store from "./store/store";
import ProfileBlock from "./profile";
import ProtectedRoute from './ProtectedRoute'
import SaunaDescription from "./Components/sauna-description/SaunaDescription";


interface State {
    store : Store
}

const store = new Store();
export const Context = createContext<State>({
    store,
})

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
    },
    {
        path: "/register",
        element: (
            <AuthRegister/>
        )
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <ProfileBlock/>
            </ProtectedRoute>
        )
    },
    {
        path: `/viewSauna/:saunaId`,
        element: (
            <SaunaDescription/>
        )
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <NextUIProvider>
        <Context.Provider value={{
            store
                }}>
            <RouterProvider router={router} />
        </Context.Provider>
    </NextUIProvider>
);