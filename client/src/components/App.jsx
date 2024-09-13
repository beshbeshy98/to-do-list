import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Items from './Items';

const App = () =>{
  const [listItems, setListItems] = useState([]);

  async function fetchItems (){
    const response = await axios.get("/api/items");

    setListItems(response.data);
  }
  useEffect(()=>{
    fetchItems();
  },[]);

  return(
    <div>
      <Items listTitle = {"Mylist"} listItems = {listItems} fetchItems={fetchItems}/>
    </div>
  );
};

export default App;