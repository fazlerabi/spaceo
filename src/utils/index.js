import axios from "axios";

export const fromAddress = async (address, index) => {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",

    {
      params: {
        address,
        key: "AIzaSyCB5ELK-MyT_h_XUxkLz8gVlEIlloseKyo",
      },
    }
  );

  if (response.data.results.length === 0) return { [index]: false };

  return { [index]: true };
};
