let backspacehash = str => {
  let result = [];
  for (let i in str) {
    if (str[i] !== "#") {
      result.push(str[i]);
    } else {
      result.pop();
    }
  }
  return result.join("");
};
