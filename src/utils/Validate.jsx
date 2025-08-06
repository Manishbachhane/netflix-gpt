export const checkValidDate = (email, password) => {
  const isEmailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordvalid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
      password
    );

  if (!isEmailvalid) return "Email ID is not valid";
  if (!isPasswordvalid) return "Password is not valid";

  return null;
};
