const checkValue = async (arr, value) => {
  const hasName = arr.some((obj) => obj.name === value);
  return hasName;
};

module.exports = checkValue;
