import React, { useEffect, useState } from "react";

export default function Slide() {
  const [count, setCount] = useState(0);
  const image = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0427f7dd5031f47a.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/317263174e325b37.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/cc633426b89ad841.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0e4fae4d5fcab33b.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e7230486b354e4d7.jpg?q=20",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevIndex) => (prevIndex + 1) % image.length);

      return () => clearInterval(interval);
    }, 1000 * 5);
  }, []);

  console.log(count, "count");
  return (
    <div className="w-[100%] mx-auto  h-[300px]  mt-16 p-1 ">
      <img
        className=" w-[90%] h-[100%] mx-auto transition-all duration-100 ease-in-out "
        src={image[count]}
      />
    </div>
  );
}
