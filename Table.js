// import _ from 'lodash';
// import React, { useState } from 'react';
// function Table(props){
//      const filteredArrByBatch = _(
//     props.ungroupedData.filter((item) => {
//       return item.batch ;
//     })
//   )
//     .groupBy('batch')
//     .map((objs, key) => {
//       const numerator = _.minBy(objs, 'free').free;
//       let denominator = _.maxBy(objs, 'deal').deal;
//       denominator = denominator === 0 ? 1 : denominator;
//       const ratio = numerator / denominator;
//       return {
//         name: _.uniqBy(objs, 'name')[0].name,
//         stock: _.sumBy(objs, 'stock'),
//         mrp: _.maxBy(objs, 'mrp').mrp,
//         rate: _.maxBy(objs, 'rate').rate,
//         exp: _.minBy(objs, 'exp').exp,
//         batch: key,
//         free: ratio,
//         deal: ratio,
//       };
//     })
//     .value();
//     return (
//     <React.Fragment>
//       {props.items.length > 0 && (
//         <div className="table-container">
//           <table className="table">
//             <thead>
//               <tr className="fixed-head">
//                 <th>Name</th>
//                 <th>Batch</th>
//                 <th>Stock</th>
//                 <th>Deal</th>
//                 <th>Free</th>
//                 <th>MRP</th>
//                 <th>Rate</th>
//                 <th>EXP</th>
//               </tr>
//             </thead>
//             <tbody>
//               { (
//                 <Batch
//                   key={filteredArrByBatch[0].name}
//                   name={filteredArrByBatch[0].name}
//                   batch={filteredArrByBatch[0].batch}
//                   stock={filteredArrByBatch[0].stock}
//                   deal={filteredArrByBatch[0].deal}
//                   free={filteredArrByBatch[0].free}
//                   mrp={filteredArrByBatch[0].mrp}
//                   rate={filteredArrByBatch[0].rate}
//                   exp={filteredArrByBatch[0].exp}
//                 />
//               )}
//               </tbody>
//               </table>
//               </div>)}
//               </React.Fragment>);
// }
// export default Table;