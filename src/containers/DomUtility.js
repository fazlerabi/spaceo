import React from "react";
import { useDispatch } from "react-redux";

function DomUtility(props) {
  const dispatch = useDispatch();
  const setState = (state) => dispatch({ type: "set", isDesktop: state });

  const handleWindowResize = () => {
    setState(window.innerWidth >= 992);
  };

  React.useEffect(() => {
    setState(window.innerWidth >= 992);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return <></>;
}

export default DomUtility;
