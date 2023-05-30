export const getAToken = () => {
  const aToken = document.cookie
    .split('; ')
    .find((row) => {
      return row.startsWith('aToken=');
    })
    ?.split('=')[1];
  return aToken;
};

export const getRToken = () => {
  const rToken = document.cookie
    .split('; ')
    .find((cookie) => {
      return cookie.startsWith('rToken=');
    })
    ?.split('=')[1];
  return rToken;
};
