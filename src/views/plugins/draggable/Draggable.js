import React, { useState } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { getStyle } from "@coreui/utils";
import defaultLayouts from "./_layouts";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./Draggable.css";

const breakPoints = {};
breakPoints.xl = parseInt(getStyle("--breakpoint-xl"), 10);
breakPoints.lg = parseInt(getStyle("--breakpoint-lg"), 10);
breakPoints.md = parseInt(getStyle("--breakpoint-md"), 10);
breakPoints.sm = parseInt(getStyle("--breakpoint-sm"), 10);
breakPoints.xs = parseInt(getStyle("--breakpoint-xs"), 10);

const ResponsiveGridLayout = WidthProvider(Responsive);

const Draggable = () => {
  const [layouts, setLayouts] = useState(
    JSON.parse(
      localStorage.getItem("CoreUI-React-Draggable-Layouts") ||
        JSON.stringify(defaultLayouts)
    )
  );

  const onLayoutChange = (layout, layouts) => {
    localStorage.setItem(
      "CoreUI-React-Draggable-Layouts",
      JSON.stringify(layouts)
    );
    setLayouts(layouts);
  };

  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      breakpoints={breakPoints}
      cols={{ xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      measureBeforeMount={false}
      draggableHandle={".card-header"}
    >
      <CCard key="a" accentColor="secondary">
        <CCardHeader>
          <CIcon name="cil-cursor-move"></CIcon>
          Drag & Drop Card
        </CCardHeader>
        <CCardBody>{loremIpsum}</CCardBody>
      </CCard>
      <CCard key="b" accentColor="secondary">
        <CCardHeader>
          <CIcon name="cil-cursor-move"></CIcon>
          Drag & Drop Card
        </CCardHeader>
        <CCardBody>{loremIpsum}</CCardBody>
      </CCard>
    </ResponsiveGridLayout>
  );
};

export default Draggable;
