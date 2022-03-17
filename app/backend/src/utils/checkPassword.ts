import { compare } from 'bcryptjs';

const checkPassword = (password: string, hash: string): Promise<boolean> => compare(password, hash);

export default checkPassword;
