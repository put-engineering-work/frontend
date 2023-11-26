export const getInitialLanguage = () => {
  const storageData = localStorage.getItem("language");
  return storageData ? storageData : "en";
};

export const isValidEmail = (email: any) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};
