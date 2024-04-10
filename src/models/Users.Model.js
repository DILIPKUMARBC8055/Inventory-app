export default class UserModel {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static addUser(user) {
    const u = new UserModel(user.name, user.email, user.password);
    Users.push(u);
   
  }
  static ValidateUserLogin(user)
  {
    const result=Users.find((u)=>u.email==user.email && u.password==user.password);
    console.log(result);
    if(result)
    {
      return true;
    }
    return false;
  }
}

let Users = [];
