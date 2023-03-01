import React, { useState } from "react";

function ShowResult() {
  const [disresults,setDisResults]=useState(false)
  const [htnum, setHtnum] = useState();
  const [studata, setData] = useState();
  let total
  const handleHTnum = () => {
    const formData = new FormData();
    formData.append("htnum", htnum);
    fetch(`http://localhost:5000/studentresults?htnum=${htnum}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
      setDisResults(true)
  };
  console.log(studata);

  if (disresults && studata)
  { total=parseInt(studata.sub1.split(",")[1]) +
  parseInt(studata.sub2.split(",")[1]) +
  parseInt(studata.sub3.split(",")[1]) +
  parseInt(studata.sub4.split(",")[1]) +
  parseInt(studata.sub4.split(",")[1])
  }
  return (
    <div>
      <label htmlFor="htmun">Enter Your H.T Number</label>
      <input
        type="text"
        name=""
        id="htnum"
        placeholder="Enter HallticketNumber"
        value={htnum}
        onChange={(e) => setHtnum(e.target.value)}
      />
      <button onClick={handleHTnum}>Search</button>
      {/* {studata && <div>{JSON.stringify(studata.StudentResult.name)}</div>} */}
      {disresults?      <table>
        <thead>
          <tr>
        <th colSpan={4} className="Heading" >H.T number : {htnum}</th>
          </tr>
          <tr>
          <th colSpan={4} className="Heading" >Name: {studata && studata.name}</th>
          </tr>
          <tr>
            <th>S.no</th>
            <th>Subject Name</th>
            <th>Marks</th>
            <th>P/F</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              {studata && studata.sub1 !== undefined
                ? studata.sub1.split(",")[0]
                : null}
            </td>
            <td>
              {studata && studata.sub1 !== undefined
                ? studata.sub1.split(",")[1]
                : null}
            </td>
            <td>
            {studata && parseInt(studata.sub1.split(",")[1]) < 25 ? "F" : ""}
            {studata && parseInt(studata.sub1.split(",")[1]) > 25 ? "P" : ""}
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              {studata && studata.sub2 !== undefined
                ? studata.sub2.split(",")[0]
                : null}
            </td>
            <td>
              {studata && studata.sub2 !== undefined
                ? studata.sub2.split(",")[1]
                : null}
            </td>
            <td>
            {studata && parseInt(studata.sub2.split(",")[1]) < 25 ? "F" : ""}
            {studata && parseInt(studata.sub2.split(",")[1]) >= 25 ? "P" : ""}
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              {studata && studata.sub3 !== undefined
                ? studata.sub3.split(",")[0]
                : null}
            </td>
            <td>
              {studata && studata.sub3 !== undefined
                ? studata.sub3.split(",")[1]
                : null}
            </td>
            <td>
            {studata && parseInt(studata.sub3.split(",")[1]) < 25 ? "F" : ""}
            {studata && parseInt(studata.sub3.split(",")[1]) >= 25 ? "P" : ""}
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              {studata && studata.sub4 !== undefined
                ? studata.sub4.split(",")[0]
                : null}
            </td>
            <td>
              {studata && studata.sub4 !== undefined
                ? studata.sub4.split(",")[1]
                : null}
            </td>
            <td>
            {studata && parseInt(studata.sub4.split(",")[1]) < 25 ? "F" : ""}
            {studata && parseInt(studata.sub4.split(",")[1]) >= 25 ? "P" : ""}
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              {studata && studata.sub5 !== undefined
                ? studata.sub5.split(",")[0]
                : ""}
            </td>
            <td>
              {studata && studata.sub5 !== undefined
                ? studata.sub5.split(",")[1]
                : ""}
            </td>
            <td>
            {studata && parseInt(studata.sub5.split(",")[1]) < 25 ? "F" : ""}
            {studata && parseInt(studata.sub5.split(",")[1]) >= 25 ? "P" : ""}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Total Marks :  {isNaN(total)?null:total}</td>
          </tr>
          <tr>
            <td colSpan={4}>Final Grade : {studata && parseInt(studata.sub1.split(",")[1]) >= 25 && parseInt(studata.sub2.split(",")[1]) && parseInt(studata.sub3.split(",")[1]) && parseInt(studata.sub4.split(",")[1]) && parseInt(studata.sub5.split(",")[1]) >= 25>= 25>= 25>= 25?"Pass":"Fail"}</td>
          </tr>
        </tfoot>
      </table>:null}

    </div>
  );
}

export default ShowResult;
