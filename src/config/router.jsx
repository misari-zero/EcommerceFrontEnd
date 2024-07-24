import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import PrivateLayout from "../layout/PrivateLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Listado from "../pages/Listado";
import Solicitud from "../pages/Solicitud";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "dashboard",
                element: <PrivateLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                ],
            },
            {
                path: "listado",
                element: <Listado />,
            },
            {
                path: "solicitud",
                element: <Solicitud />,
            },
        ],
    },
]);
