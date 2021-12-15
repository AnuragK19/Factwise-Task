import { useState, useEffect } from "react";
import { axiosClient } from "../helpers/axiosClient";

export default function ({ passDate }) {
  const [date, setDate] = useState(0);

  const incrementDate = (dte) => {
    let date = new Date(dte);
    date.setDate(date.getDate() + 1);
    setDate(date.toISOString().split("T")[0]);
    passDate(date.toISOString().split("T")[0]);
  };

  const decrementDate = (dte) => {
    let date = new Date(dte);
    date.setDate(date.getDate() - 1);
    setDate(date.toISOString().split("T")[0]);
    passDate(date.toISOString().split("T")[0]);
  };

  useEffect(() => {
    axiosClient
      .get("/current_date.json")
      .then((res) => {
        setDate(res.data.current_date);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <button onClick={() => incrementDate(date)}>+</button>
      <p> {date} </p>
      <button onClick={() => decrementDate(date)}>-</button>
    </>
  );
}
