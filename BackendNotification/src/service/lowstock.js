import axios from "axios";
import { send_low_stock_notification } from "./emailservice.js";
/****
 * why because this code will create the aboject of object not array of object
 *  stock[item.user.email] = [item.productname]; // make stock the object of object
 */
// export const lowstock = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:4000/api/v1/inventory/getlowstock"
//     );

//     const result = response.data.lowstock;

//     const stock = [];

//     result.forEach((item) => {
//       if (stock[item.user.email]) {
//         stock[item.user.email].push(item.productname);
//       } else {
//         stock[item.user.email] = [item.productname];
//       }
//     });

//     console.log("Low Stock Response", stock);
//   } catch (error) {
//     console.log("Error in LowStock Controller", error);
//   }
// };

export const lowstock = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/inventory/getlowstock"
    );

    const result = response.data.lowstock;

    const stock = []; // Initialize an array

    result.forEach((item) => {
      // Check if the email already exists in the stock array
      const existingUser = stock.find(
        (entry) => entry.email === item.user.email
      );

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

    forEach(async (stock) => {
      const response = await send_low_stock_notification(stock);

      if (response instanceof Error) {
        throw new Error("Failed to send low stock notification");
      }
    });

    console.log("Low Stock Response", stock);
  } catch (error) {
    console.log("Error in LowStock Controller", error);
  }
};
