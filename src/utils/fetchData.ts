import { BASE_URL } from "../constants/constans";
import { getToken } from "./getToken";

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

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDataText = async (endpoint: string) => {
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

    const responseText = await response.text();

    return responseText;
  } catch (error) {
    console.error("Error:", error);
  }
};

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
