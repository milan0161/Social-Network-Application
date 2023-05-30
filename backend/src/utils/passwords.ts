import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
  const hashPassword = bcrypt.hash(password, 12);
  return hashPassword;
};

const verifyPassword = (loginPassword: string, userPassword: string) => {
  const comparePasswords = bcrypt.compare(loginPassword, userPassword);

  return comparePasswords;
};

export { hashPassword, verifyPassword };
