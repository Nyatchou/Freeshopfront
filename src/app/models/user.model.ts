export class User {
  _id: string;
  _username: string;
  _firstname: string;
  _lastname: string;
  _sexe: string;
  _email: string;
  _telephone: string;
  _profileUrl: string;

  constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    id?: string,
    telephone?: string,
    sexe?: string,
    profileUrl?: string
  ) {
    this._username = username;
    this._firstname = firstname;
    this._lastname = lastname;
    this._email = email;
    this._id = id;
    this._sexe = sexe;
    this._telephone = telephone;
    this._profileUrl = profileUrl;
  }

  set id(id: string){
      this._id = id;
  }

  get id(): string{
      return this._id;
  }

  get username(): string{
    return this._username;
  }

  set username(username: string){
      this._username = username;
  }

  get firstname(): string{
      return this._firstname;
  }

  set firstname(firstname: string){
      this._firstname = firstname;
  }

  get lastname(): string{
      return this._lastname;
  }

  set lastname(lastname: string){
      this._lastname = lastname;
  }

  get email(): string{
      return this._email;
  }

  set email(email: string){
      this._email = email;
  }

  get telephone(): string{
      return this._telephone;
  }

  set telephone(telephone: string){
      this._telephone = telephone;
  }

}
