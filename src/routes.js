import React from "react";

const RoutePlanner = React.lazy(() => import("./views/route-planner"));

const routes = [
  { path: "/import-address", name: "Import Address", component: RoutePlanner },
];

export default routes;
