import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = () => {
  const dispatch = useDispatch();
  const asideShow = useSelector((state) => state.asideShow);
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <>
      <CHeader withSubheader>
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/import-address">Planner</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/users">Users</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink>Settings</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className="px-3">
          <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={() => dispatch({ type: "set", darkMode: !darkMode })}
            title="Toggle Light/Dark Mode"
          >
            <CIcon
              name="cil-moon"
              className="c-d-dark-none"
              alt="CoreUI Icons Moon"
            />
            <CIcon
              name="cil-sun"
              className="c-d-default-none"
              alt="CoreUI Icons Sun"
            />
          </CToggler>
          <TheHeaderDropdownNotif />
          <TheHeaderDropdownTasks />
          <TheHeaderDropdownMssg />
          <TheHeaderDropdown />
          <CToggler
            inHeader
            className="d-md-down-none"
            onClick={() => dispatch({ type: "set", asideShow: !asideShow })}
          >
            <CIcon
              className="mr-2"
              size="lg"
              name="cil-applications-settings"
            />
          </CToggler>
        </CHeaderNav>

        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={routes}
          />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink
              className="c-subheader-nav-link"
              aria-current="page"
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />
              &nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />
              &nbsp;Settings
            </CLink>
          </div>
        </CSubheader>
      </CHeader>
    </>
  );
};

export default TheHeader;
