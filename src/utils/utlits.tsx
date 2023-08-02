export const getInitialLanguage = () => {
  const storageData = localStorage.getItem("language");
  return storageData ? storageData : "en";
};
