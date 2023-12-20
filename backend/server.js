require("dotenv").config();

try {
  const app = require("./app");
  const db = require("./db");

  db.authenticate()
    .then(() => {
      console.log("DB connection established successfully.");
      db.sync();
      // import all models
      
      const users = require("./models/user");
      const movies = require("./models/movies");
      const images = require("./models/movies");
      const videos = require("./models/movies");
    })
    .catch((error) => {
      console.log("Unable to connect to the database", error);
    });

  app.listen(8000, () => {
    console.log("Serverv running at port 8000");
  });
} catch (error) {
  console.log("error =>", error);
}
