const fs = require("fs/promises");
const path = require("path");

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  async newUser() {
      let flag = await this.#checkUser()

      if(!flag) {
          await this.#saveData()
      } else{
          console.log("User already exists");
      }
  }

  async countUsers(){
      let response = await fs.readFile(
          path.join(__dirname, "db.json"),
          "utf-8"
      )

      response = await JSON.parse(response)
      return response.users.length

  }

  async #saveData() {

    let user = {
        name: this.name,
        age: this.age,
    }

    let users = await fs.readFile(path.join(__dirname, "db.json"), "utf-8")
    users = await JSON.parse(users)
    users = users.users
    users.push(user)

      await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify({users: users}));
  }

  async #checkUser() {
    let db = await fs.readFile(path.join(__dirname, "db.json"), "utf-8");
    db = await JSON.parse(db);

    let users = db.users;
    let user = users.find(
      (user) => user.name.toLowerCase() === this.name.toLowerCase()
    );

    return user ? true : false;
  }
}


let user1 = new User("Abror", 23)

user1.newUser()