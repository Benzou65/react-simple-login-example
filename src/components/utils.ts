import sha256 from "crypto-js/sha256";
export const hashPassword = (password: string) => {
  return sha256(
    sha256((password + process.env.REACT_APP_HASH_SALT) as string)
  ).toString();
};
