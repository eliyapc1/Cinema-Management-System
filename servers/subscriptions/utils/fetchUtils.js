const axios = require("axios");
const mongoose = require("mongoose");

const fetchFromAPI = async (URL, API) => {
  const host = "http://localhost";
  const port = 8000;

  try {
    const { data: dbData } = await axios.get(`${host}:${port}/${API}`);
    if (!dbData.length) {
      console.log(`fetching Data from ${API} API...`);
      const { data: allObj } = await axios.get(URL);
      for (const obj of allObj) {
        if (API === "movies") obj.image = obj.image.medium;
        else obj.city = obj.address.city;
        await axios.post(`${host}:${port}/${API}`, obj);
      }
    } else return console.log(`no need to fetch ${API} data.`);
    console.log(`${API} data has been fetched.`);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

module.exports = fetchFromAPI;
