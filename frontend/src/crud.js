// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// //metodo GET para extraer datos de la base de datos
// export default function GETProducts(){
//     const GETProducts = () => {
//         const [products, setProducts] = useState([]);
//       useEffect(() => {
//         fetchProducts();
//       }, []);
//       const fetchProducts = () => {
//         axios
//           .get('http://localhost:3001/api')
//           .then((res) => {
//             console.log(res);
//             setProducts(res.data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };
//       return (
//           <div>
//             {/* <h1>Featured Products</h1>
//             <div className='item-container'>
//               {products.map((product) => (
//                  <div className='card' key={product.id}>
//                  <h3>{product.nombre}</h3>
//                  <p>{product.precio}</p>
//                </div>
//               ))}
//             </div> */}
//           </div>
      
//         );
//       };

// }

//metodo POST para registrar datos en mongo


// export default function HttpPost() {
//   const [userName, createProducts] = useState('')
//   const onSubmit = async (e) => {
//     e.preventDefault()
//     const post = { userName: userName }
//     try {
//       const res = await axios.post('http://localhost:3001/create', post)
//       console.log(res.data)
//     } catch (e) {
//       alert(e)
//     }
//   }
//   return (
//     <div className="container mt-2">
//       <h2>React HTTP Post Request Example</h2>
//       <form onSubmit={onSubmit}>
//         <div className="mb-2 mt-3">
//           <input
//             type="text"
//             placeholder="Name"
//             className="form-control"
//             onChange={(event) => {
//               createProducts(event.target.value)
//             }}
//             value={userName}
//           />
//         </div>
//         <button type="submit" className="btn btn-danger">
//           Create
//         </button>
//       </form>
//     </div>
//   )
// }