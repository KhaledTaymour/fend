// Personal API Key for OpenWeatherMap API
const API_KEY = "07ba4271c76f9f167b840d6ab0a8d0b3";

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", handleGenerate);

/* Function called by event listener when clicking 'Generate' btn */
function handleGenerate(e) {
  console.log("handleGenerate called", e);

  //get value of zip code
  let userZipCode = document.querySelector("#zip").value;
  let userFeeling = document.querySelector("#feelings").value;

  getWeatherData(userZipCode).then((data) => {
    //catch error of wrong zip code
    if (data.cod !== 200) {
      alert(data.message);
    } else {
      postData("http://localhost:3005/addNewTemp", {
        zipCode: userZipCode,
        temperature: data.main.temp,
        date: new Date().toDateString(),
        userResponse: userFeeling,
      }).then(() => updateUI(userZipCode));
    }
  });
}

/**
 * Function to GET Web API Data
 * @param {string} _zipCode zip code
 */
const getWeatherData = async (_zipCode) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?zip=${_zipCode}&units=metric&appid=${API_KEY}`;

  const res = await fetch(url);
  try {
    return await res.json();
  } catch (error) {
    console.log("api.js getWeatherData: error", error);
  }
};

/**
 * Function to POST data
 * @param {string} url url to post data to local server "http://localhost:3005/addNewTemp"
 * @param {object} data
 */
const postData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  try {
    const newData = await postRequest.text();
    console.log("app.js: POST success", newData);
    return newData;
  } catch (error) {
    console.log("api.js postData: error", error);
  }
};

/**
 * Call the Get Project Data function then Update UI
 * @param {string} zipCode zip code
 */
const updateUI = async (zipCode) => {
  const allData = await getProjectData("http://localhost:3005/all");
  if (allData) {
    document.querySelector("#date").innerHTML = allData[zipCode].date;
    document.querySelector("#temp").innerHTML =
      allData[zipCode].temperature + ` °C`;
    document.querySelector("#content").innerHTML =
      allData[zipCode].userResponse;
  } else {
    alert("the request failed");
    console.log("api.js: something went wrong in getProjectData");
  }
};

/**
 * Function to GET Project Data
 * @param {string} url url of local server get "http://localhost:3005/all"
 */
const getProjectData = async (url) => {
  const res = await fetch(url);
  try {
    return await res.json();
  } catch (error) {
    console.log("api.js getProjectData: error", error);
  }
};
