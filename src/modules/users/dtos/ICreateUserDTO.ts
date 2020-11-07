export default interface ICreateUserDTO {
  name: string;
  email: string;
  birthday: Date;
  gender: string;
  avatar_url?: string;
  password: string;
}
