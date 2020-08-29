exports.getHashParams = (REACT_APP_NOT_SECRET_CODE) => {
  return window.location.hash.substring(1) === REACT_APP_NOT_SECRET_CODE
}