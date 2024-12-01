import React, { useEffect } from "react";
import { useState } from "react";

export default function App(){
  const [items,setitems] = useState([])
  const[packedAmount,setpackedAmount] = useState(0)

  const itemsHandler = (item) =>{
   setitems( items => [...items, item] )
  }

  const deleteHandler = (id) => {
    setitems(item => item.filter(item=>item.id !== id))
   }

   const toggleHandler = (id) => {
    setitems(item=>item.map(item=> item.id == id ? {...item,packed:!item.packed} : item ))
   }

   useEffect(function(){
    let count = 0
    items.forEach(item=>{
      if(item.packed){
        count++;
      }
    })
    setpackedAmount(count)
   }, [items])
   

return(
<div className="app">
  <Logo/>
  <Form onAddItems = {itemsHandler} items = {items} setItems = {setitems}/>
  <PackingList items ={items} onDeleteItems = {deleteHandler} onToggleItems = {toggleHandler}/>
  <Status amount={items.length} packedAmount = {packedAmount}/>
</div>
)
}


function Logo(){
  return <h1>🌴 Far away 👜</h1>
}

function Form({onAddItems,items}){
  const[discription,setDiscription] = useState('')
  const [quantity,setquantity] = useState(1)
  
 function submitHandler(e){
  e.preventDefault()
  if(!discription) return;
   const newItem = ({discription,quantity,isPacked:false,id:Date.now()})
   onAddItems(newItem)
   setDiscription('')
   setquantity(1)
  }

  return(
  <div>
     <h4>What do you need for your 😍 trip</h4>

<form onSubmit={submitHandler} className="add-form">
 <select value={quantity} onChange={(e)=>setquantity(+e.target.value)} >
  {
 Array.from({length:20},(_,i)=>i+1).map(num=>(
    <option value={num} key={num}>{num}</option>    
 ))} 
</select>
 <input type="text" placeholder="item..." value={discription} onChange={(e)=>setDiscription(e.target.value)}/>
 <button>Add</button>
 </form>
  </div>
  )
}

function PackingList({items,onDeleteItems,onToggleItems}){
  return <div className="list">
    <ul>
      {
        items.map(item => <Item item={item} onDeleteItems = {onDeleteItems} onToggleItems = {onToggleItems} key={item.id} /> )
      }
    </ul> 
  </div>
}

function Item({item,onDeleteItems,onToggleItems}){
      return (
      <li><span style={item.packed ? {textDecoration:'line-through'}: {}}>{<input type="checkbox" 
      value={item.packed} onChange={()=> onToggleItems(item.id)}/>} 
       {item.quantity} {item.discription} 
      <button onClick={()=>onDeleteItems(item.id)}>❌</button></span></li>
      )
}

function Status({amount,packedAmount}){
  return(
    <footer className="stats">
      <em>👜 You have {amount} items on your list, and you already packed {packedAmount} ( {!amount || !packedAmount ? '0' : Math.ceil((( packedAmount  / amount ) * 100))}%)</em>
    </footer>
  )
}
