export const subjects = [
  "English",
  "Hindi",
  "Tamil",
  "Physics",
  "Chemistry",
  "Biology",
  "Maths",
  "Science",
  "Social",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "PET",
  "Sociology",
  "Psychology",
  "Political Science",
];

export const validateName = (name: string): boolean => {
  const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return re.test(name);
};

export const validateSubject = (value: string): boolean => {
  return subjects.toString().toLowerCase().includes(value.toLowerCase());
};

export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string): boolean => {
  const specialChars = /^(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return specialChars.test(password);
};
