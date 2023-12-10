export const postData = async (endpoint: string, data: any) => {
  //   try {

  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  const userString = localStorage.getItem("user");

  if (userString !== null) {
    const user = JSON.parse(userString);
    const token = user.token;

    console.log(token);

    const response = await fetch(`http://localhost:8085/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } else {
    // Handle the case when 'userString' is null
    console.error("User data not found in localStorage");
  }
};
