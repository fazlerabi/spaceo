import React, { useEffect, useState, useRef } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
  CModalFooter,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CSelect,
  CInputCheckbox,
  CCard,
  CCardHeader,
  CCardBody,
  CPopover,
  CLink,
  CBadge,
} from "@coreui/react";
import * as XLSX from "xlsx";
import { GrDocumentUpload } from "react-icons/gr";
import _ from "lodash";
import Dropdown from "./dropdown";
import "./import-document.scss";
import {
  validateMatchCity,
  validateMatchCountry,
  validateMatchFullName,
  validateMatchRegion,
  validateMatchStreetLine,
  validateMatchZipCode,
  validateMatchStreetLine2,
} from "src/utils";

function deepCompareEquals(a, b) {
  return _.isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

function ImportDocument(props) {
  const { open, setOpen, setAddress, wb, fileName } = props;
  const [ignoreRow, setIgnoreRow] = useState(true);
  const [appendToCurrentList, setAppendToCurrentList] = useState(false);
  const [firstAsStartAddress, setFirstAsStartAddress] = useState(true);
  const [lastAsEndAddress, setLastAsEndAddress] = useState(false);
  const [returnToStartAddress, setReturnToStartAddress] = useState(true);
  const [generatedRows, setGeneratedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const headers = (rows && rows.length && Object.keys(rows[0])) || [];

  const setDropdownType = (index, type) => {
    let selItems = Object.assign([], selectedItems);
    selItems[index] = type;

    setSelectedItems(selItems);
  };

  const onChangeSheet = (event) => {
    setSelectedSheet(event.target.value);
  };

  useEffect(() => {
    if (open && wb) {
      const wsname = selectedSheet || wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { raw: true, defval: null });
      const obj = {};

      if (data && data.length) {
        Object.keys(data[0]).map((key) => {
          obj[key] = key;
        });
        setRows([obj, ...data]);
      } else {
        setRows(data);
      }
    }
  }, [open, selectedSheet]);

  useDeepCompareEffect(() => {
    let newRows = [];
    rows.map((row, i) => {
      const obj = {};
      selectedItems.map((item, j) => {
        if (item === 1)
          obj["title"] = (obj["title"] || "") + rows[i][headers[j]] + " ";

        if (item === 2)
          obj["address"] = (obj["address"] || "") + rows[i][headers[j]] + " ";

        if (item === 3)
          obj["service_time"] =
            (obj["service_time"] || "") + rows[i][headers[j]] + " ";

        if (item === 4)
          obj["order_size"] =
            (obj["order_size"] || "") + rows[i][headers[j]] + " ";

        if (item === 5)
          obj["territory"] =
            (obj["territory"] || "") + rows[i][headers[j]] + " ";
      });

      newRows.push(obj);
    });
    setGeneratedRows(newRows);
  }, [rows, selectedItems]);

  useDeepCompareEffect(() => {
    if (rows && rows.length) {
      const selItems = headers.map((key, index) => {
        const results = rows.map((row) => {
          return (
            (row[key] || "").toString().split(" ").length - 1 >= 2 ||
            (row[key] || "").toString().split(", ").length - 1 >= 1
          );
        });

        const titleCounts = _.countBy(
          rows.map((row) => {
            return (row[key] || "").toString().split(" ").length - 1 === 1;
          }),
          (a) => a === true
        );

        const count = _.countBy(results, (a) => a === true);
        const activeCount = count["true"] || 0;
        const inactiveCount = count["false"] || 0;

        if (
          validateMatchRegion(key) ||
          validateMatchZipCode(key) ||
          validateMatchCity(key) ||
          validateMatchCountry(key) ||
          validateMatchStreetLine(key) ||
          validateMatchStreetLine2(key) ||
          activeCount > inactiveCount
        ) {
          return 2;
        } else if (validateMatchFullName(key)) {
          return 1;
        } else {
          return 0;
        }
      });

      setSelectedItems(selItems);
    }
  }, [rows]);

  let resultRows = generatedRows;
  if (resultRows && resultRows.length) {
    if (ignoreRow) {
      resultRows = resultRows.slice(1);
    } else {
      resultRows = resultRows;
    }

    if (firstAsStartAddress) {
      resultRows[0].type = "H";
      resultRows.map((row, index) => {
        if (index >= 1) {
          row.type = index;
        }
      });
    } else {
      resultRows.map((row, index) => {
        row.type = index + 1;
      });
    }

    if (returnToStartAddress && !lastAsEndAddress) {
      const firstRow = Object.assign({}, resultRows[0]);
      resultRows = [...resultRows, firstRow];
      resultRows[resultRows.length - 1].type = "E";
    } else if (lastAsEndAddress) {
      resultRows[resultRows.length - 1].type = "E";
    }
  }

  const importNow = () => {
    setAddress(resultRows);
    setOpen(false);
  };

  return (
    <CModal
      className="import-document"
      show={open}
      onClose={() => setOpen(!open)}
      size="xl"
      centered
    >
      <CModalHeader closeButton className="py-2">
        <CModalTitle className="d-flex align-items-center">
          <GrDocumentUpload className="my-auto mr-2 h4" />
          Import Document:&nbsp;
          <span className="text-primary">
            <b>{fileName}</b>
          </span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard className="shadow mb-3">
          <CCardBody className="py-2">
            <CRow>
              <CCol className="d-flex align-items-center" md="12">
                <CFormGroup className="d-flex mb-0 select-sheet mr-5">
                  <CLabel htmlFor="sheet" className="font-weight-bold">
                    Select a sheet
                  </CLabel>
                  <CSelect
                    custom
                    name="sheet"
                    id="sheet"
                    onChange={onChangeSheet}
                  >
                    {wb &&
                      wb.SheetNames.map((s, index) => {
                        return (
                          <option value={s} key={`option__${index}`}>
                            {s}
                          </option>
                        );
                      })}
                  </CSelect>
                  <p className="mb-0 ml-2">{rows.length} rows</p>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="ignore-row"
                    name="ignore_row"
                    checked={ignoreRow}
                    onChange={(e) => {
                      setIgnoreRow(e.target.checked);
                    }}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="ignore-row">
                    Ignore first row
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="append-to-current-list"
                    name="append_to_current_list"
                    checked={appendToCurrentList}
                    onChange={(e) => {
                      setAppendToCurrentList(e.target.checked);
                    }}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor="append-to-current-list"
                  >
                    Append to curent list
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard className="shadow mb-3">
          <CCardBody className="py-2">
            <CRow>
              <CCol md="12" className="d-flex justify-content-start">
                <span className="mr-5 font-weight-bold">
                  Start / End addresses
                </span>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="first-as-start-address"
                    name="first_as_start_address"
                    checked={firstAsStartAddress}
                    onChange={(e) => {
                      setFirstAsStartAddress(e.target.checked);
                    }}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor="first-as-start-address"
                  >
                    Set first as start address
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="last-as-end-address"
                    name="last_as_end_address"
                    checked={lastAsEndAddress}
                    onChange={(e) => {
                      setLastAsEndAddress(e.target.checked);
                    }}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor="last-as-end-address"
                  >
                    Set last as end address
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="return-to-start-address"
                    name="return_to_end_address"
                    checked={returnToStartAddress}
                    onChange={(e) => {
                      setReturnToStartAddress(e.target.checked);
                    }}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor="return-to-start-address"
                  >
                    Return to start address
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CRow className="mb-3">
          <CCol className="c-pop-over">
            <CCard className="shadow mb-0">
              <CCardHeader>
                <CPopover
                  boundary="scrollParent"
                  placement="right"
                  content={
                    <>
                      <CRow>
                        <CCol className="d-flex" md="6">
                          <a href="#">Address</a> - House#, Street, City, Zip
                          code, State etc.
                        </CCol>
                        <CCol md="6">
                          Ignore - Irrelevant info that will be excluded (like
                          fax #).
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md="6">
                          Title - Customer name, Store name, Notes etc.
                        </CCol>
                        <CCol className="d-flex" md="6">
                          <a href="#">Filter-in/out</a> - Rows with values will
                          be included/excluded.
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="d-flex" md="6">
                          <a href="#">Territory</a> - Values that define
                          geographical area grouping.
                        </CCol>
                        <CCol md="6">
                          Comments - Instructions or other information.
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md="6">
                          Service Time - Pause at a specific location (in
                          minutes).
                        </CCol>
                      </CRow>
                    </>
                  }
                  interactive={true}
                >
                  <CLink>
                    <h6 className="m-0 p-0">
                      Pick the correct option, above each column:
                    </h6>
                  </CLink>
                </CPopover>
              </CCardHeader>
              <CCardBody className="py-3">
                <table className="table table-bordered table-striped pre-render-table mb-0">
                  <thead>
                    <tr>
                      {rows &&
                        rows.length &&
                        Object.keys(rows[0]).map((item, index) => {
                          if (item !== "type")
                            return (
                              <th
                                key={`t-head-${index}`}
                                scope="col"
                                className="p-0"
                              >
                                <Dropdown
                                  selectedItem={selectedItems[index]}
                                  setDropdownType={(type) =>
                                    setDropdownType(index, type)
                                  }
                                />
                              </th>
                            );
                        })}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => {
                      return (
                        <tr key={`table-row-${index}`}>
                          {Object.keys(row).map((cell, i) => {
                            if (cell !== "type")
                              return <td key={`cell--${i}`}>{row[cell]}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard className="shadow mb-0">
              <CCardHeader>
                <CLink>
                  <h6 className="m-0 p-0">
                    Review the results preview and select import now.
                  </h6>
                </CLink>
              </CCardHeader>
              <CCardBody className="py-3">
                <table className="table table-bordered table-striped eliminated-table mb-0">
                  <thead>
                    <tr>
                      <th className="th-type" scope="col">
                        Type
                      </th>
                      <th className="th-title" scope="col">
                        Title
                      </th>
                      <th className="th-address" scope="col">
                        Address
                      </th>
                      <th className="th-service-time" scope="col">
                        Service time
                      </th>
                      <th className="th-order-size" scope="col">
                        Order Size
                      </th>
                      <th className="th-territory" scope="col">
                        Territory
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultRows.map((row, index) => {
                      return (
                        <tr key={`result-row-${index}`}>
                          <td className="td-type">
                            <CBadge color="primary">{row["type"]}</CBadge>
                          </td>
                          <td className="td-title">{row["title"]}</td>
                          <td className="td-address">{row["address"]}</td>
                          <td className="td-service-time">
                            {row["service_time"]}
                          </td>
                          <td className="td-order-size">{row["order_size"]}</td>
                          <td className="td-territory">{row["territory"]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter className="py-1">
        <CButton color="primary" onClick={importNow}>
          Import Now
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setOpen(!open)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default ImportDocument;
