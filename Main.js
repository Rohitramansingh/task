import react, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../Store/store";
import Slide from "./Slide";
import axios from "axios";
export default function Main() {
  const search = useSelector((state) => state.search);
  const catlist = useSelector((state) => state.categogaryList);
  

  const dispatch = useDispatch();
  dispatch(Action.userExist());

  const [filteredItems, setFilteredItems] = useState([]);
  const [checkeds, setChecked] = useState([]);
  const [source, setSource] = useState([]);

  const [price, setPrice] = useState({
    min: "",
    max: "",
  });
 
  const [category, setcategory] = useState([]);

  const labelarr = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Tv" },
    { id: 1, name: "Phone" },
    { id: 1, name: "Headphone" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/product");
      const arr = res.data;
      // dispatch(Action.setInitialData({data:arr}))
      setSource(arr);
      setFilteredItems(arr);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let productlist = source;
    console.log(productlist,"product");

    if (search !== "") {
      productlist = productlist.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category?.length !== 0) {
      productlist = productlist.filter((val) =>
        category.includes(val.categogary.toLowerCase())
      );
    }

    if (checkeds?.length !== 0) {

      productlist = productlist.filter((val) =>
        checkeds.includes(val.tag.toLowerCase())

      );
    }

    if (price.min !== "" && price.max !== "") {
      productlist = productlist.filter((val) => {
        const min = parseInt(price.min);
        const max = parseInt(price.max);
        const p = parseInt(val.price);
        return p >= min && p <= max;
      });
    }

    console.log(productlist, "xxxx");
    setFilteredItems(productlist);
  }, [checkeds, category, price, search]);

  const storage = localStorage.getItem("user");
  console.log(JSON.stringify(storage), "sss");

  let nonActive =
    "text-sm w-[100px]   border border-black bg-white p-1 px-2  md:text-sm   my-2 pointer  rounded-lg  ";
  let Active =
    "text-sm  border border-black bg-black  text-white  md:text-sm  w-[100px]   p-1 px-2  pointer  my-2   rounded-lg  ";

  function Handler(data) {
    dispatch(Action.ActiveBtn({ data: data }));

    const findIndex = category.findIndex((val) => val === data.toLowerCase());
    if (findIndex !== -1) {
      const find = category.filter((val) => val !== data.toLowerCase());
      setcategory(find);
    } else {
      setcategory((prev) => [...prev, data.toLowerCase()]);
    }


  }

  function checkChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setChecked((prev) => [...prev, value.toLowerCase()]);
      // dispatch(Action.CheckBox({data:[...checkeds,value.toLowerCase()]}))
    } else {
      const find = checkeds.filter((val) => val !== value.toLowerCase());
      setChecked(find);
      // dispatch(Action.CheckBox({data:checkeds.filter((val)=>val!==value.toLowerCase())}))
    }
  }

  const priceHandler = (e) => {
    const { value, name } = e.target;
    setPrice((prev) => {
      return { ...prev, [name]: value };
    });

    // dispatch(Action.priceFilter({data:{...price,[name]:value}}))
  };

  return (
    <div className="text-center mt-20 shadow-lg border  m-6 ">
      <Slide />

      <main className="grid grid-cols-5 gap-4  ">
        {/* filter  */}
        <filter className="h-[100%] bg-gray-200  ">
          <h2 className="font-bold mx-2 p-1 text-start mt-5  text-xl  ">Filter</h2>

          <h2 className="font-bold mx-2 p-1 text-start  ">Categogary</h2>
          <div className="flex flex-wrap  p-2 gap-1 ">
            <p
              onClick={() => Handler("sport")}
              className={`${
                catlist.findIndex((v) => v === "sport") !== -1
                  ? Active
                  : nonActive
              }`}
            >
              sport
            </p>
            <p
              onClick={() => Handler("grocery")}
              className={`${
                catlist.findIndex((v) => v === "grocery") !== -1
                  ? Active
                  : nonActive
              }`}
            >
              Grocerry
            </p>
            <p
              onClick={() => Handler("makeup")}
              className={`${
                catlist.findIndex((v) => v === "makeup") !== -1
                  ? Active
                  : nonActive
              }`}
            >
              {" "}
              Makeup{" "}
            </p>
            <p
              onClick={() => Handler("accessories")}
              className={`   ${
                catlist.findIndex((v) => v === "accessories") !== -1
                  ? Active
                  : nonActive
              }`}
            >
              Accessories
            </p>
            <p
              onClick={() => Handler("electronic")}
              className={`${
                catlist.findIndex((v) => v === "electronic") !== -1
                  ? Active
                  : nonActive
              }`}
            >
              Electronic{" "}
            </p>
          </div>

          {/* price range */}

          <h2 className="font-bold mx-2 p-1 text-start  ">Price Range</h2>
          <div className="flex p-2 space-x-4 ">
            <input
              onChange={priceHandler}
              name="min"
              className="w-[45%] p-1 "
              type="number"
              placeholder="Min"
            />
            <input
              onChange={priceHandler}
              name="max"
              className="w-[45%] p-1 "
              type="number"
              placeholder="max"
            />
          </div>

          {/* <ITEMS></ITEMS> */}

          <h2 className="font-bold mx-2 p-1 text-start  ">Categogary</h2>
          <div>
            {labelarr.map((val) => {
              return (
                <div className="flex space-x-1 p-2 ">
                  <input
                    type="checkbox"
                    value={val.name}
                    onChange={checkChange}
                    id={val.id}
                  />
                  <p>{val.name}</p>
                </div>
              );
            })}
          </div>
        </filter>

        {/* contenet div  */}
        <div className=" col-span-4 p-2 mx-2  md:grid-cols-3   grid grid-cols-4 gap-2 overflow-y-auto">
          {filteredItems &&
            filteredItems.map((val) => {
              return <Card    data={val} />;
            })}
        </div>
      </main>
    </div>
  );
}
