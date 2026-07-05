import cron from "node-cron";

cron.schedule("*/10 * * * * *", () => {
  console.log("Running every 10 seconds");
})