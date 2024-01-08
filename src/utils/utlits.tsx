import { format } from "date-fns";
import i18n from "../i18n/i18n";

export const getInitialLanguage = () => {
  const storageData = localStorage.getItem("language");
  return storageData ? storageData : "en";
};

export const isValidEmail = (email: any) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const getFormatedDate = (createdDate: string) => {
  const date = new Date(createdDate);
  return format(date, "MMMM d HH:mm");
};
