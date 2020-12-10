import React from "react";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";

function Dropdown(props) {
  const { setDropdownType, selectedItem } = props;
  const selectedItems = [
    "Ignore",
    "Title",
    "Address",
    "Service Time",
    "Order Size",
    "Territory",
    "Filter-In",
    "Filter-Out",
    "Comments",
  ];

  return (
    <CDropdown className="w-100 btn-group rounded-0">
      <CDropdownToggle className="rounded-0 py-1">
        {selectedItems[selectedItem]}
      </CDropdownToggle>
      <CDropdownMenu>
        {selectedItems.map((item, index) => {
          return (
            <CDropdownItem
              key={`c-dropdown-${index}`}
              onClick={() => setDropdownType(index)}
            >
              {item}
            </CDropdownItem>
          );
        })}
      </CDropdownMenu>
    </CDropdown>
  );
}

export default Dropdown;
