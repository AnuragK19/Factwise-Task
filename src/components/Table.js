export default function StyledTable({ tableData, currentDate }) {
  return (
    <div className="scroll-it">
      <table>
        <thead>
          <tr style={{ backgroundColor: "#737373", color: "white" }}>
            <th>Name</th>
            <th>Vaccination Date</th>
            <th>Vaccination Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((eachRow) =>
              new Date(JSON.stringify(eachRow.vaccination_date)) <=
              new Date(JSON.stringify(currentDate)) ? (
                <tr className="vaccinated" key={eachRow.person_id}>
                  <td>{eachRow.person_name}</td>
                  <td>{eachRow.vaccination_date}</td>
                  <td>Vaccine Done</td>
                </tr>
              ) : (
                <tr className="pending" key={eachRow.person_id}>
                  <td>{eachRow.person_name}</td>
                  <td>{eachRow.vaccination_date}</td>
                  <td>Pending</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
