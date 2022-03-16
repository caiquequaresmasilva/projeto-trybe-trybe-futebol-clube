interface IUser {
  [index: string]: number | string | undefined
  id: number
  username: string
  role: string
  email: string
  password?:string
}

interface ILogin{
  email: string
  password: string
}

interface ILoginResponse{
  user: IUser
  token: string
}

export default IUser;
export { ILogin, ILoginResponse };
