import axios from "axios";

export const lowstock = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/inventory/getlowstock"
    );

    const result = response.data.lowstock;

    const stock = [];

    result.forEach((item) => {
      if (stock[item.user.email]) {
        stock[item.user.email].push(item.productname);
      } else {
        stock[item.user.email] = [item.productname];
      }
    });

    console.log("Low Stock Response", stock);
  } catch (error) {
    console.log("Error in LowStock Controller", error);
  }
};
