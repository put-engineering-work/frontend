export const getToken = () => {
  const userString = localStorage.getItem("user");

  if (userString !== null) {
    const user = JSON.parse(userString);
    const token = user.token;
    return token;
  } else {
    return null;
  }
};
