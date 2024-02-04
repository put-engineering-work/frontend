import { BASE_URL } from "../constants/constans";
import { getToken } from "./getToken";

export const getDataJson = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDataInQuery = async (endpoint: string, params: any) => {
  try {
    const queryString = new URLSearchParams(params).toString();

    // Make the GET request with the query string
    const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postFormData = async (endpoint: string, formData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    console.log(response);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
