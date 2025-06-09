import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/home";
import SignIn from "../pages/sign-in";

import Managers from "../pages/Managers";
import Admins from "../pages/Admins";
import Teachers from "../pages/Teachers";
import Students from "../pages/Students";
import Groups from "../pages/Groups";
import Kurs from "../pages/Kurs";
import Payment from "../pages/Payment";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";

import PrivateRoute from "../components/private-route";

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />, 
    children: [
      {
        path: "/",
        element: <MainLayout />, 
        children: [
          { path: "/", element: <Home /> },
          { path: "/managers", element: <Managers /> },
          { path: "/admins", element: <Admins /> },
          { path: "/teachers", element: <Teachers /> },
          { path: "/students", element: <Students /> },
          { path: "/groups", element: <Groups /> },
          { path: "/courses", element: <Kurs /> },
          { path: "/payments", element: <Payment /> },
          { path: "/settings", element: <Settings /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);