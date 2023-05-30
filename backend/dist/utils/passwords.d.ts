declare const hashPassword: (password: string) => Promise<string>;
declare const verifyPassword: (loginPassword: string, userPassword: string) => Promise<boolean>;
export { hashPassword, verifyPassword };
