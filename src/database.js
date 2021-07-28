const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongo/notes-db-app",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,

  })
  
  .then((db) => console.log("db is connected to", db.connection.host))
  .catch((err) => console.error(err));
