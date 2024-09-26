import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};
const comparePassword = async (inputPassword:string, userPassword:string) => {
  try {
    return await bcrypt.compare(inputPassword, userPassword);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};


const helpers = {
  hashPassword,
  comparePassword
};

export default helpers;
