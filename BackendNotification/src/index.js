import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import ConnectDB from "./Database/index.js";
import app from "./app.js";
import cron from "node-cron";
import { lowstock } from "./service/lowstock.js";

const task = cron.schedule(
  " */1 * * * * *",
  () => {
    lowstock();
    console.log("Cron Job Running every 1 minute");
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running at port ${process.env.PORT || 4000}`);
      task.start();
    });
  })
  .catch((error) => {
    console.log({
      "MongoDB Error ": error.errors,
      "Mongo DB Status Code ": error.statusCode,
    }); // here we have used api error class to handle error
  });

app.on("error", (error) => {
  console.log("Server Errors :", error);
});
