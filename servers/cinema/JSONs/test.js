// const fs = require('fs');

// const raw = fs.readFileSync("users.json");
// const users = JSON.parse(raw);

// users[0].id = 5;

// const newUsers = JSON.stringify(users);

// fs.writeFileSync("users.json", newUsers)

const jf = require("jsonfile");


const readWrite = () => {
  jf.readFile("./users.json", (err, users) => {
    if (err) console.dir(err);

    users[0].id = 292;

    jf.writeFile("users.json", users, (err) => {
      if (err) console.log(err);
    });
  });
};

readWrite();