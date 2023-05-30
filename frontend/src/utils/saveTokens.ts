export const saveTokens = (aToken: string, rToken: string) => {
  const aTokendate = new Date();
  aTokendate.setTime(aTokendate.getTime() + 60 * 60 * 1000);
  const rTokenDate = new Date();
  rTokenDate.setTime(rTokenDate.getTime() + 24 * 60 * 60 * 1000);
  document.cookie = `aToken=${aToken}; expires=${aTokendate}; path=/; SameSite=Lax; Secure`;
  document.cookie = `rToken=${rToken}; expires=${rTokenDate}; path=/; SameSite=Lax; Secure`;
};
