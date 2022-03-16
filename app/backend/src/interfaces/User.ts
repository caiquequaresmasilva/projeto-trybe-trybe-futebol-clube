interface IUser {
  [index: string]: number | string | undefined
  id: number
  username: string
  role: string
  email: string
  password?:string
}

// interface ILoggedUser extends IUser{
//   user: IUser
//   token: string
// }

export default IUser;
// export { ILoggedUser };
