import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { IRoute } from "../utility/interfaces/IRoute";
import { RoutePaths } from "../utility/enums/router.enums.ts";
import { Box } from "@material-ui/core";
import Notification from "../common_component/Notification.tsx";
const Stocks = lazy(() => import("../pages/Stocks.tsx"));
const SignUp = lazy(() => import("../pages/SignUp.tsx"));
const SignIn = lazy(() => import("../pages/SignIn.tsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.tsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.tsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.tsx"));
const Settings = lazy(() => import("../pages/Settings.tsx"));
export const routeList: IRoute[] = [
  {
    id: 1,
    path: "/",
    component: () => <Navigate to={RoutePaths.Dashboard} />,
    exact: true,
    isProtectedRoute: true,
  },
  {
    id: 2,
    path: RoutePaths.SignIn,
    component: SignIn,
    exact: true,
    isProtectedRoute: false,
  },
  {
    id: 3,
    path: RoutePaths.SignUp,
    component: SignUp,
    exact: true,
    isProtectedRoute: false,
  },
  {
    id: 4,
    path: RoutePaths.Dashboard,
    component: Dashboard,
    exact: true,
    isProtectedRoute: true,
  },
  {
    id: 5,
    path: RoutePaths.ForgotPassword,
    component: ForgotPassword,
    exact: true,
    isProtectedRoute: false,
  },
  {
    id: 6,
    path: RoutePaths.ResetPassword,
    component: ResetPassword,
    exact: true,
    isProtectedRoute: false,
  },
  {
    id: 7,
    path: RoutePaths.Settings,
    component: Settings,
    exact: true,
    isProtectedRoute: true,
  },
  {
    id: 8,
    path: RoutePaths.Stocks,
    component: Stocks,
    exact: true,
    isProtectedRoute: false,
  },
  {
    id: 9,
    path: RoutePaths.Notification,
    component: Notification,
    exact: true,
    isProtectedRoute: false,
  },
];

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={RoutePaths.SignIn} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {routeList.map((routeItem) => {
        const LazyComponent = routeItem.component as React.ComponentType;
        const { path, id, isProtectedRoute } = routeItem;
        return (
          <Route
            key={id}
            path={path}
            element={
              <Suspense fallback={<Box>Loading</Box>}>
                {isProtectedRoute ? (
                  <ProtectedRoute>
                    <LazyComponent />
                  </ProtectedRoute>
                ) : (
                  <LazyComponent />
                )}
              </Suspense>
            }
          />
        );
      })}
      <Route
        path="*"
        element={<Navigate to={RoutePaths.Dashboard} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
