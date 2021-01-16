import axios from "axios";
import _ from "lodash";

export const fromAddress = async (address) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",

    {
      params: {
        address,
        key: "AIzaSyCB5ELK-MyT_h_XUxkLz8gVlEIlloseKyo",
      },
    }
  );

  if (response.data.results.length === 0) return false;

  let formatted_address = response.data.results[0].formatted_address;

  const numCommas = (formatted_address.match(/,/g) || []).length;

  if (numCommas >= 3) {
    return true;
  } else {
    return false;
  }
};

export const validateAddress = async (address, index, func) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        address,
        key: "AIzaSyCB5ELK-MyT_h_XUxkLz8gVlEIlloseKyo",
      },
    }
  );
  let obj = { title: index };
  func();
  let addresses = response && response.data && response.data.results || [];
  if (addresses.length === 0) return { [index]: "unverified" };
  else if (
    addresses[0].types.includes("street_address") ||
    (addresses[0].types.includes("precise") &&
      addresses[0].partial_match !== true &&
      addresses[0].geometry.location_type === "ROOFTOP")
  ) {
    obj[index] = "verified";
    return obj;
  } else if (
    addresses[0].types.includes("postal_code") ||
    (addresses[0].partial_match === true &&
      addresses[0].geometry.location_type === "APPROXIMATE")
  ) {
    obj[index] = "inaccurate";
    return obj;
  } else {
    obj[index] = "unverified";
    return obj;
  }
};

export const validateMatchRegion = (headerName) => {
  return ["region", "state", "province"].includes(_.toLower(headerName));
};

export const validateMatchZipCode = (headerName) => {
  return [
    "zip code",
    "zipcode",
    "zip",
    "pincode",
    "pin code",
    "post code",
    "postcode",
    "postal code",
    "postalcode",
  ].includes(_.toLower(_.trim(headerName)));
};

export const validateMatchCity = (headerName) => {
  return ["city"].includes(_.toLower(_.trim(headerName)));
};

export const validateMatchCountry = (headerName) => {
  return ["country"].includes(_.toLower(_.trim(headerName)));
};

export const validateMatchStreetLine = (headerName) => {
  return ["address line 1", "address", "address 1"].includes(
    _.toLower(_.trim(headerName))
  );
};

export const validateMatchStreetLine2 = (headerName) => {
  return ["address line 2", "address 2"].includes(
    _.toLower(_.trim(headerName))
  );
};

export const validateMatchFullName = (headerName) => {
  return ["full name", "name"].includes(_.toLower(_.trim(headerName)));
};

export const validateMatchPhoneNumber = (headerName) => {
  return ["phone #", "phone", "cell"].includes(_.toLower(_.trim(headerName)));
};

export const validateNumber = (cell) => {
  return !isNaN(cell);
};

export const validateTime = (cell) => {
  return /^\d{1,2}:\d{2}([ap]m)?$/.test(cell);
};
