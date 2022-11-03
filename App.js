import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import _ from 'lodash';
import Table from"./Table.js"
import TablePage from "./TablePage.js";

function App() {
  const [stock, setStock] = useState([]);
  
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setStock(d);
    });
  };

let aggregateData = _(stock).groupBy('code').map((obj,key) =>{
  let batchData = obj.filter((e) => {
    return e['code']===key;
  });
  return {
    name: obj[0].name,
    stock:_.sumBy(obj,'stock'),
    mrp: _.maxBy(obj, 'mrp').mrp,
    rate: _.maxBy(obj, 'rate').rate,
    exp: _.minBy(obj, 'exp').exp,
    batch: batchData,
    free: 0,
    deal: 0,

  };
}).value();

 function convert(excelDate) {
    const newDate = new Date((excelDate - 25567 - 2) * 86400 * 1000);
    return newDate;
  }
  for (let item of aggregateData) {
    item['exp'] = convert(item['exp']);
  }
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
    
    <TablePage items={aggregateData} remaining = {stock}/>
    </div>
  );
}

export default App;
