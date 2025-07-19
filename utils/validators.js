exports.validateRegistration = (username, password) => {
  if (!username || !password) return "Username and password required";
  if (typeof username !== "string" || typeof password !== "string")
    return "Invalid data types";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

exports.validateLogin = (username, password) => {
  if (!username || !password) return "Username and password required";
  return null;
};
