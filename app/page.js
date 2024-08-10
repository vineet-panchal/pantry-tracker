'use client';
import React, { useState, useEffect } from 'react'; // import necessary hooks
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore'; // import all functions from firestore
import { db } from './firebase.js'; // import firestore database

export default function Home() {
  const [items, setItems] = useState([]); // set items to an array
  const [newItem, setNewItem] = useState({ name: '', quantity: '' }); // set new item to empty name and quantity
  const [total, setTotal] = useState(0); // set total to 0

  const addItem = async (e) => {
  // function to add items to the database
    e.preventDefault();
    if (newItem.name !== '' && newItem.quantity !== '') {
      // setItems([...items, newItem]);
      await addDoc(collection(db, 'items'), { // create a collection in the database called items
        name: newItem.name.trim(), // add the name field of the item
        quantity: newItem.quantity, // add the quantity field of the item
      });
      setNewItem({ name: '', quantity: '' }); // reset the newItem var
    }
  };

  // Read items from database
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Read total from itemsArr
      const calculateTotal = () => {
        const totalquantity = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.quantity),
          0
        );
        setTotal(totalquantity);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  // Delete items from database
  const deleteItem = async (id) => {
  // function to delete items from a database
    await deleteDoc(doc(db, 'items', id)); // delete item from the database
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm '>
        <h1 className='text-4xl p-4 text-center'>Pantry Tracker</h1>
        <h6 className='text-1xl pb-4 text-center'>Manage your own pantry by keeping track of each item.</h6>
        <div className='bg-indigo-900 p-4 rounded-lg' >
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              className="col-span-3 bg-[#222630] px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              placeholder="Enter Item"
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              className="col-span-2 bg-[#222630] mx-3 px-4 py-3 outline-none text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
              name="text"
              placeholder="Enter Quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            {/* <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-3 p-3 border'
              type='text'
              placeholder='Enter Item'
            /> */}
            {/* <input
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className='col-span-2 p-3 border mx-3'
              type='number'
              placeholder='Enter Quantity'
            /> */}
            <button
              onClick={addItem}
              className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl rounded-lg py-2 border-2 px-4'
              type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => ( // add the item to the list
              <li key={id} className='my-4 w-full flex justify-between bg-slate-950'>
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>Item: {item.name}</span>
                  <span>QTY: {item.quantity}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ''
          ) : (
            <div className='flex justify-between p-3'>
              <span>Total Quantity Of Items In Stock: </span>
              <span>{total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
