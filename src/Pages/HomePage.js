"use client";

import { Sidebar } from "flowbite-react";
import { FaEnvelope } from "react-icons/fa";
import { GrTasks, GrUserWorker } from "react-icons/gr";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function HomePage() {
  const adminNavRoutes = [
    "/admin/exployees",
    "/admin/applications",
    "/admin/tasks",
  ];

  // eslint-disable-next-line no-restricted-globals
  const isAdminRouteActive = adminNavRoutes.includes(location.pathname);

  const style = { fontSize: "1.5rem", textDecoration: "none" };

  return (
    <div>
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="flex items-center">
              <Link to="employees" style={style}>
                <GrUserWorker style={{ marginRight: ".5%" }} />
                Employees
              </Link>
            </div>

            <div className="flex items-center">
              <Link to="applications" style={style}>
                <FaEnvelope style={{ marginRight: ".5%" }} />
                Applications
              </Link>
            </div>

            <div className="flex items-center">
              <Link to="tasks" style={style}>
                <GrTasks style={{ marginRight: ".5%" }} />
                Task
              </Link>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div>
        {isAdminRouteActive ? <Outlet /> : "Fix default Dashbaord page"}
      </div>

      <h1>Home page</h1>
    </div>
  );
}
