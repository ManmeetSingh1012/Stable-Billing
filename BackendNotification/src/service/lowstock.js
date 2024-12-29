import axios from "axios";
import { send_low_stock_notification } from "./emailservice.js";

// Configuration constants
const CONFIG = {
  MAX_RETRIES: 3,
  BATCH_SIZE: 5, // Number of emails to process in parallel
};

const processStockData = (result) => {
  const stock = []; // Initialize an array

  result.forEach((item) => {
    // Check if the email already exists in the stock array
    const existingUser = stock.find((entry) => entry.email === item.user.email);

    if (existingUser) {
      // If found, push the product name to the existing array
      existingUser.products.push(item.productname);
    } else {
      // Otherwise, create a new entry for the email
      stock.push({
        email: item.user.email,
        products: [item.productname],
      });
    }
  });

  return stock;
};

const send_email = async (stockData) => {
  // Process emails in batches

  // promiseHooks.all accepts array of promise [promise 1, promise 2...] =>  map return promise , batch.map returns promise
  // Batch is use to send emails in 5 batches.
  for (let i = 0; i < stockData.length; i += CONFIG.BATCH_SIZE) {
    const batch = stockData.slice(i, i + CONFIG.BATCH_SIZE);
    await Promise.all(
      batch.map(async (item) => {
        try {
          await send_low_stock_notification(item);
        } catch (error) {
          throw new Error("Failed to send low stock notification");
        }
      })
    );
  }
};

export const lowstock = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/inventory/getlowstock"
    );

    const result = response.data.lowstock;

    const stock = processStockData(result);

    await send_email(stock);
  } catch (error) {
    console.log("Error in LowStock Controller", error);
  }
};
