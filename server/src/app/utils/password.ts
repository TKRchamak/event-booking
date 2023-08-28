// const bcrypt = require('bcryptjs');
import * as bcrypt from "bcrypt";

export const encryptPassword = async (password: string | Buffer) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const checkPassword = async (password: string | Buffer, encryptedPassword: string) => {
    return await bcrypt.compare(password, encryptedPassword);
}