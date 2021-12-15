{
  /*
  PLEASE BEGIN THIS BY READING THE README.md FILE
*/
}
import "./styles.css";
import PieChart from "./components/PieChart";
import StyledTable from "./components/Table";
import Buttons from "./components/Buttons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { axiosClient } from "./helpers/axiosClient";

export default function App() {
  const [records, setRecord] = useState([]);
  const [dateFromBtn, setDateFromBtn] = useState("2021-05-09");
  const [vaccinatedCount, setVaccinatedCount] = useState(0);

  useEffect(() => {
    console.log("Iam running 1");
    // Get user data
    axiosClient
      .get("/vaccine_dates.json")
      .then((res) => {
        setRecord(res.data);
        getCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCount();
  }, [dateFromBtn]);

  const getCount = (record = records) => {
    let count = record.filter((eachRow) => {
      return (
        new Date(JSON.stringify(eachRow.vaccination_date)) >
        new Date(JSON.stringify(dateFromBtn))
      );
    }).length;
    setVaccinatedCount(count);
  };

  return (
    <div className="App">
      <section className="float-left">
        <div className="chart">
          <PieChart
            data={[vaccinatedCount, records.length - vaccinatedCount]}
          />
        </div>
        <div className="buttons">
          <Buttons passDate={setDateFromBtn} />
        </div>
        <b style={{ textAlign: "center" }}>
          {vaccinatedCount} out of {records && records.length} persons have been
          vaccinated.
        </b>
      </section>
      <div className="table">
        <StyledTable tableData={records} currentDate={dateFromBtn} />
      </div>
    </div>
  );
}
