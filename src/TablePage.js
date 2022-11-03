import React, { useState} from 'react';
import _ from 'lodash';
import './App.css';
import SearchBar from './Search';
import Batches from './Batch';
const TablePage = (props) => {

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
  const [selectedBatch, setSelectedBatch] = useState();
 const [searching, setSearching] = useState('');
   const batchWise = (o) => {
    const selectedInputBatch = o.target.value;
    setSelectedBatch(selectedInputBatch);
  };
    let result = props.items.filter((o) => {
    return o.name.toLowerCase().includes(searching);
  });
  const batchResult=_(props.remaining.filter((o) => {
    return o.batch === selectedBatch;
  })).groupBy('batch').map((obj,key)=>{
const free = _.minBy(obj, 'free').free;
      let deal = _.maxBy(obj, 'deal').deal;
      deal = deal === 0 ? 1 : deal;
      const ratio = free / deal;
      return {
        name: obj[0].name,
        stock: _.sumBy(obj, 'stock'),
        mrp: _.maxBy(obj, 'mrp').mrp,
        rate: _.maxBy(obj, 'rate').rate,
        exp: _.minBy(obj, 'exp').exp,
        batch: key,
        free: ratio,
        deal: ratio,
      };
    })
    .value();
  

  // Get current posts
//   const indexOfLastPost = currentPage * itemsPerPage;
//   const indexOfFirstPost = indexOfLastPost - itemsPerPage;
//   const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);
 const searchHandler = (searchQuery) => {
    setSearching(searchQuery);
  };
  return (
    <React.Fragment>
      <div>{<SearchBar onSearch={searchHandler} />}</div>
      {result.length > 0 && (
        <div>
          <table>
            <thead>
              <tr >
                <th>Name</th>
                <th>Batch</th>
                <th>Stock</th>
                <th>Deal</th>
                <th>Free</th>
                <th>MRP</th>
                <th>Rate</th>
                <th>EXP</th>
              </tr>
            </thead>
            <tbody>
              {result.map((d, index) => (
                <tr key={d.name}>
                  <td>{d.name}</td>
                  <td>
                    <select onChange={batchWise}>
                      <option>All</option>
                      {[...new Set(d.batch.map(({ batch }) => batch))].map(
                        (batchItem, batchIndex) => {
                          return <option key={batchIndex}>{batchItem}</option>;
                        }
                      )}
                    </select>
                  </td>
                  <td>{d.stock}</td>
                  <td>{d.deal}</td>
                  <td>{d.free}</td>
                  <td>{d.mrp}</td>
                  <td>{d.rate}</td>
                  <td>
                    {d.exp.getDate() +'/' + (d.exp.getMonth() + 1) +'/' + d.exp.getFullYear()}
                  </td>
                </tr>
              ))}
              </tbody>
          
          </table>
        </div>
      )}
</React.Fragment>
);
};

export default TablePage;
