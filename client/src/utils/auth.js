exports.getHashParams = (REACT_APP_NOT_SECRET_ADMIN, REACT_APP_NOT_SECRET_CODE) => {
  let location = window.location.hash.substring(1);
  if (location === "admin") return "admin";
  if (location === "user") return "user";
}

