// import { useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from '../api/axiosClient';


// // URL pattern: /r/:restaurantId/t/:tableId
// export default function MenuPage(){
// const { restaurantId, tableId } = useParams();
// const [menu, setMenu] = useState([]);


// useEffect(()=>{
// async function fetchMenu(){
// try{
// const { data } = await axios.get(`/menu/restaurant/${restaurantId}`); // adjust to your menu API
// setMenu(data.menu || data.items || []);
// }catch(e){ console.error(e); }
// }
// fetchMenu();
// }, [restaurantId]);


// return (
// <div>
// <h1>Menu</h1>
// <p>Restaurant: {restaurantId} • Table: {tableId}</p>
// <div className="menu-grid">
// {menu.map(item => (
// <div key={item._id} className="menu-item">
// <h3>{item.name}</h3>
// <p>{item.description}</p>
// <p>Rs. {item.price}</p>
// </div>
// ))}
// </div>
// </div>
// )
// }