import React from "react";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
} from "@coreui/react";

function Dropdown(props) {
  return (
    <CDropdown className="w-100 btn-group rounded-0">
      <CDropdownToggle className="rounded-0">Ignore</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem>Ignore</CDropdownItem>
        <CDropdownItem>Title</CDropdownItem>
        <CDropdownItem>Address</CDropdownItem>
        <CDropdownItem>Service Time</CDropdownItem>
        <CDropdownItem>Territory</CDropdownItem>
        <CDropdownItem>Filter-In</CDropdownItem>
        <CDropdownItem>Filter-Out</CDropdownItem>
        <CDropdownItem>Comments</CDropdownItem>
        <CDropdownItem>Order Size</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
}

export default Dropdown;
