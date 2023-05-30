const removeTokens = () => {
  document.cookie = `aToken=; max-age=0`;
  document.cookie = `rToken=; max-age=0`;
};

export default removeTokens;
