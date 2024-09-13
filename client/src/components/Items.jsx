import React , { useState } from 'react';
import axios from 'axios';

const Items=({ listTitle, listItems, fetchItems }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [newItem, setNewItem] = useState('');

  const handleEdit = (id) =>{
    setEditingItemId(id);
    };

  const handleSave = async (id) => {
    const updatedText = document.getElementById(`input${id}`).value;
    await axios.put(`/api/items/update/${id}`, { text: updatedText });
    setEditingItemId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/items/delete/${id}`);
    fetchItems();
  };

  const handleAdd = async (event) =>{
    event.preventDefault();
  
    await axios.post('/api/items/add', { title: listTitle, text: newItem });

    setNewItem("");
    fetchItems();
  };
  return (
    <div className="box ">
      <div className='box' id="heading">
        {listTitle}
      </div>
      <div className='box'>
        {listItems.map(item =>(
          <div className='item' key={item._id}>
            <div>
              <input
              type="checkbox"
              onChange={() => handleDelete(item._id)}
              />
              <span id={`title${item._id}`} hidden={editingItemId === item._id}>
                {item.text}
              </span>
              <input 
                id={`input${item._id}`}
                hidden={editingItemId !== item._id}
                type="text"
                defaultValue={item.text}
                onBlur={()=> handleSave(item._id)}
                autoFocus
              />
              <button
              id={`edit${item._id}`}
              onClick={() => handleEdit(item._id)}
              className='edit'
              >
                Edit
              </button>
            </div>

          </div>  
        ))}
        <form onSubmit={handleAdd} className='item'>
          <input
          type="text"
          name="newItem"
          placeholder='New Item'
          onChange={(e)=> setNewItem(e.target.value)}
          autoComplete='off'
          autoFocus
          />
          <button className='add' type="submit">
          +
          </button>
        </form>

      </div>

    </div>
  );
};

export default Items;
