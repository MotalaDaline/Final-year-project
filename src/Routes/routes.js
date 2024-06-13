import HomePage from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";
import ApplicationPage from "../Pages/ApplicationPage";
import TaskPage from "../Pages/TaskPage";
import EmployeePage from "../Pages/Employee"; // Fix the import path

export const AdminRoutes = [
  {
    path: "/authentication",
    element: <AuthPage />,
  },
  {
    path: "/admin",
    element: <HomePage />,
    children: [
      {
        path: "employees",
        element: <EmployeePage />,
      },
      {
        path: "applications",
        element: <ApplicationPage />,
      },
      {
        path: "tasks",
        element: <TaskPage />,
      },
    ],
  },
];


export const EmployeeRoutes = [];
