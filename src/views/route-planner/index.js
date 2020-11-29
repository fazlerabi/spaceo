import React, { useState } from "react";

import { useSelector } from "react-redux";
import { GoldenLayoutComponent } from "@annotationhub/react-golden-layout";
import MapComponent from "./google-map";
import Configuration from "./configuration";
import "./route-planner.scss";
import "@annotationhub/react-golden-layout/dist/css/goldenlayout-base.css";
import "@annotationhub/react-golden-layout/dist/css/themes/goldenlayout-light-theme.css";

const RoutePlanner = () => {
  const isDesktop = useSelector((state) => state.isDesktop);
  const [layoutManager, setLayoutManager] = useState(null);

  const mobileLayout = {
    content: [
      {
        type: "stack",
        content: [
          {
            component: Configuration,
            title: "Planner",
            isClosable: false,
          },
          {
            component: MapComponent,
            title: "Route",
            isClosable: false,
          },
        ],
      },
    ],
    settings: {
      showPopoutIcon: false,
      showMaximiseIcon: false,
      showCloseIcon: false,
    },
  };

  const layout = {
    content: [
      {
        type: "row",
        content: [
          {
            component: Configuration,
            title: "Planner",
            isClosable: false,
          },
          {
            type: "column",
            content: [
              {
                component: MapComponent,
                title: "Route",
                isClosable: false,
              },
            ],
          },
        ],
      },
    ],
    settings: {
      showPopoutIcon: false,
      showMaximiseIcon: false,
      showCloseIcon: false,
    },
  };

  return (
    <div className="route-planner-layout">
      <GoldenLayoutComponent
        config={isDesktop ? layout : mobileLayout}
        autoresize={true}
        debounceResize={10}
        onLayoutReady={setLayoutManager}
      />
    </div>
  );
};

export default RoutePlanner;
