import { useState, useCallback, useEffect } from "react";
import { useForm, Controller, set } from "react-hook-form";
import Input2 from "../../Components/input.component2";
import Register from "../Register";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import {
  getinventory,
  postinventory,
  deleteinventory,
  updateinventory,
} from "../../constant/const";

export default function Inventory() {
  const [inventory, setinventory] = useState([]);
  const [error, seterror] = useState();

  const [loading, setloading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [leng, setLeng] = useState(0);

  const [inventoryquantity, setinventoryquantity] = useState("");
  const [inventorysize, setinventorysize] = useState("");

  const [update, setupdate] = useState(false);
  const [id, setid] = useState("");

  const acess_token = useSelector((state) => state.auth.accessToken);

  const caclculate = (data) => {
    let size = 0;
    let total = 0;

    data.map((data) => {
      size = size + data.unitprice * data.quantity;
      total = total + data.quantity;
    });

    let newsize = size.toLocaleString();

    setinventorysize(newsize);
    setinventoryquantity(total);
  };

  const fetchdata = async () => {
    setloading(true);
    try {
      await axios
        .get(getinventory, {
          headers: { Authorization: `Bearer ${acess_token}` },
        })

        .then((response) => {
          setinventory(response.data.data);
          setLeng(response.data.data.length);
          caclculate(response.data.data);
          console.log("data", inventory);
          //console.log("data length", parties.length)
          seterror("");
          //console.log("data", response.data.data)

          setloading(false);
        })
        .catch((error) => {
          console.log("error", error);
          if (error.response.data.message !== "No inventory found") {
            seterror(error.response.data.message);
          } else {
            setinventory([]);
          }
          setloading(false);
        });
    } catch (error) {
      console.log("error", error);
      seterror(error.message);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [reloadData]);

  const [cardvisible, setcardvisible] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    paymentoptions: ["pay", "recieve"],
  });

  const create = (data) => {
    console.log("check", data);

    data.unitprice = Number(data.unitprice);
    data.quantity = Number(data.quantity);
    data.minstock = Number(data.minstock);

    setcardvisible(!cardvisible);

    if (update) {
      try {
        axios
          .put(`${updateinventory}/${id}`, data, {
            headers: { Authorization: `Bearer ${acess_token}` },
          })
          .then((response) => {
            //console.log(response)
            setReloadData(!reloadData);
            seterror("");
          })
          .catch((error) => {
            console.log("error", error);
            seterror(error.response.data.message);
          })
          .finally(() => {
            setValue("productname", "");
            setValue("productid", "");
            setValue("minstock", "");
            setValue("quantity", "");
            setValue("unitprice", "");

            setupdate(!update);

            setid("");
          });
      } catch (error) {
        console.log("error", error);
        seterror(error.message);
      }
    } else {
      try {
        axios
          .post(postinventory, data, {
            headers: { Authorization: `Bearer ${acess_token}` },
          })
          .then((response) => {
            console.log(response);
            setReloadData(!reloadData);
            seterror("");
          })
          .catch((error) => {
            console.log("error", error);
            seterror(error.response.data.message);
          });
      } catch (error) {
        console.log("error", error);
        seterror(error.message);
      }
    }
  };

  const togglecard = () => {
    setcardvisible(!cardvisible);
    console.log(cardvisible);
    //alert("button clicked")

    setValue("productname", "");
    setValue("productid", "");
    setValue("minstock", "");
    setValue("quantity", "");
    setValue("unitprice", "");

    //setupdate(!update);

    setid("");
  };

  const deletinventory = async (id) => {
    const url = `${deleteinventory}/${id}`;

    try {
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${acess_token}` },
        })
        .then((response) => {
          console.log(response);
          setReloadData(!reloadData);
          seterror("");
        })
        .catch((error) => {
          console.log("error", error);
          seterror(error.response.data.message);
        })
        .finally(() => {
          fetchdata();
        });
    } catch (error) {
      console.log("error", error);
      seterror(error.message);
    }
  };

  const updateinventry = async (data) => {
    setValue("productname", data.productname);
    setValue("productid", data.productid);
    setValue("minstock", data.minstock);
    setValue("quantity", data.quantity);
    setValue("unitprice", data.unitprice);

    setupdate(!update);
    setcardvisible(!cardvisible);
    setid(data._id);
  };

  return (
    <div>
      {loading ? (
        <div>
          <h1 className="text-center p-2 ">Loading...</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-center p-2 text-red-600">{error}</h1>
          {inventory.length == 0 ? (
            <div>
              <div className="w-full">
                <div
                  className={` ${
                    cardvisible ? "hidden" : "visible"
                  } flex flex-col justify-center text-center items-center align-middle content-center mt-24 `}
                >
                  <h1 className=" text-justify text-gray-700 text-2xl font-bold">
                    Nothing To Show
                  </h1>
                  <p className=" text-justify text-gray-500 text-base mb-2">
                    Add Your first product here{" "}
                  </p>
                  <button
                    onClick={togglecard}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300"
                  >
                    {"Add Your 1st Parties >"}{" "}
                  </button>
                </div>

                <div
                  className={` ${
                    cardvisible ? "visible" : "hidden"
                  }  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`}
                >
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <h1 className=" p-5 text-gray-700 text-lg ">
                        Add Product
                      </h1>
                    </div>

                    <div>
                      <button
                        onClick={togglecard}
                        className=" text-gray-700 text-lg  font-bold  transition-colors duration-300"
                      >
                        {"X"}{" "}
                      </button>
                    </div>
                  </div>

                  <div>
                    <form
                      className="content-center"
                      onSubmit={handleSubmit(create)}
                    >
                      <div className="flex flex-row flex-wrap ">
                        <Input2
                          placeholder="Product Name"
                          lable="Product Name"
                          type="text"
                          className="p-5"
                          {...register("productname", {
                            required: true,
                          })}
                        />

                        <Input2
                          placeholder="Quantity"
                          lable="Quantity"
                          type="number"
                          className="p-5"
                          {...register("quantity", {
                            required: true,
                          })}
                        />
                      </div>

                      <div className="flex flex-row flex-wrap ">
                        <Input2
                          placeholder="Product Id"
                          lable="Product Id"
                          type="text"
                          className="p-5"
                          {...register("productid", {
                            required: true,
                          })}
                        />

                        <Input2
                          placeholder="Min Stock"
                          lable="Min Stock"
                          type="text"
                          className="p-5"
                          {...register("minstock", {
                            required: true,
                          })}
                        />
                      </div>

                      <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                      <div className="flex flex-row flex-wrap ">
                        <Input2
                          placeholder="Unit Price"
                          lable="Unit Price"
                          type="number"
                          className="p-5"
                          {...register("unitprice", {})}
                        />
                      </div>

                      <div className="flex flex-row flex-wrap w-full">
                        <button
                          type="submit"
                          className="bg-orange-500 text-white px-4 mx-5 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300"
                        >
                          {"Save"}{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full">
                <div
                  className={` ${
                    cardvisible ? "visible" : "hidden"
                  }  flex flex-col w-fit h-min  mt-14 border border-solid border-gray-400   bg-white shadow-lg rounded mx-auto  p-5`}
                >
                  <div className="flex flex-row items-center justify-between">
                    <div>
                      <h1 className=" p-5 text-gray-700 text-lg ">
                        Add Product
                      </h1>
                    </div>

                    <div>
                      <button
                        onClick={togglecard}
                        className=" text-gray-700 text-lg  font-bold  transition-colors duration-300"
                      >
                        {"X"}{" "}
                      </button>
                    </div>
                  </div>

                  <div>
                    <form
                      className="content-center"
                      onSubmit={handleSubmit(create)}
                    >
                      <div className="flex flex-row flex-wrap ">
                        <Input2
                          placeholder="Product Name"
                          lable="Product Name"
                          type="text"
                          className="p-5"
                          {...register("productname", {
                            required: true,
                          })}
                        />

                        <Input2
                          placeholder="Quantity"
                          lable="Quantity"
                          type="number"
                          className="p-5"
                          {...register("quantity", {
                            required: true,
                          })}
                        />
                      </div>

                      <div className="flex flex-row flex-wrap ">
                        <Input2
                          placeholder="Product Id"
                          lable="Product Id"
                          type="text"
                          className="p-5"
                          {...register("productid", {
                            required: true,
                          })}
                        />

                        <Input2
                          placeholder="Min Stock"
                          lable="Min Stock"
                          type="text"
                          className="p-5"
                          {...register("minstock", {
                            required: true,
                          })}
                        />
                      </div>

                      <hr class=" h-px m-3 bg-gray-200 border-0 dark:bg-gray-300"></hr>

                      <div className="flex flex-row flex-wrap ">
                        <Input2
                          placeholder="Unit Price"
                          lable="Unit Price"
                          type="number"
                          className="p-5"
                          {...register("unitprice", {})}
                        />
                      </div>

                      <div className="flex flex-row flex-wrap w-full">
                        <button
                          type="submit"
                          className="bg-orange-500 text-white px-4 mx-5 py-2 rounded-lg  hover:bg-orange-600 transition-colors duration-300"
                        >
                          {"Save"}{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className={`${cardvisible ? "hidden" : "visible"}`}>
                  <div className="w-full flex flex-col flex-wrap  bg-gray-200">
                    <div className="m-2 bg-white rounded-sm shadow-md p-5">
                      <h1 className="text-justify text-gray-900 text-xl font-normal">
                        Total Inventory Item:{" "}
                        <span className="text-justify text-gray-700 text-base">
                          {" "}
                          {`${leng} Products`}
                        </span>{" "}
                      </h1>

                      <div className="flex flex-row flex-wrap justify-start">
                        <div className="bg-green-300 shadow-md rounded-lg relative p-3 m-3">
                          <p className="text-justify text-gray-900 text-base font-semibold">
                            Total Inventory Size
                          </p>

                          <p className="text-justify text-gray-900 text-base font-semibold">{`Rs.${inventorysize}`}</p>
                        </div>

                        <div className="bg-green-300 shadow-md rounded-lg relative p-3 m-3">
                          <p className="text-justify text-gray-900 text-base font-semibold">
                            Total Inventory Quantity
                          </p>

                          <p className="text-justify text-gray-900 text-base font-semibold">{`${inventoryquantity}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col flex-wrap  bg-gray-200">
                    <div className="mx-2 mb-2 bg-white rounded-sm shadow-md p-5">
                      <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold">Inventory Details</h2>
                        <div class="flex items-center">
                          <svg
                            class="w-[27px] h-[27px] text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          <button
                            onClick={togglecard}
                            class="text-gray-600 text-sm ml-1"
                          >
                            Add Inventory
                          </button>
                        </div>
                      </div>

                      <div class="overflow-x-auto">
                        <table className="table-fixed w-full border-collapse border border-gray-200">
                          <thead>
                            <tr>
                              <th className="px-2 py-2 w-1/5 text-start">
                                S.No
                              </th>
                              <th className="px-2 py-2 w-1/5 text-start">
                                Product Name
                              </th>
                              <th className="px-2 py-2 w-1/5 text-start">
                                Product Serial No
                              </th>
                              <th className="px-2 py-2 w-1/5 text-start">
                                Quantity
                              </th>
                              <th className="px-2 py-2 w-1/5 text-start">
                                Unit Price
                              </th>
                              <th className="px-2 py-2 w-1/5 text-start">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {inventory.map((data, index) => (
                              <tr key={data._id}>
                                <td className="px-2 py-2 w-1/5 text-start">
                                  {index}
                                </td>
                                <td className="px-2 py-2 w-1/5 text-start">
                                  {data.productname}
                                </td>
                                <td className="px-2 py-2 w-1/5 text-start">
                                  {data.productid}
                                </td>
                                <td className="px-2 py-2 w-1/5 text-start">
                                  {data.quantity}
                                </td>
                                <td className="px-2 py-2 w-1/5 text-start">
                                  {data.unitprice}
                                </td>
                                <td className={`px-4 py-2 w-1/5 text-start`}>
                                  <div className="flex flex-row flex-wrap space-x-1">
                                    <div onClick={() => updateinventry(data)}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-5"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                      </svg>
                                    </div>

                                    <div
                                      onClick={() => deletinventory(data._id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-5"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
