import React, { useEffect, useState } from 'react'
import { HiTrash, HiPlus } from "react-icons/hi2";
import { PlusOutlined, DeleteOutlined, Button, Card, Input, message, Table, Select } from 'antd';



export const PosFunction = () => {

    const [productinfo, setproductinfo] = useState({
        productname: "",
        productsize: "",
        productprice: "",
        productquantity:"",
        Purchasedate:""
  
  })
  const handleInput =(e)=>{
    const name = e.target.name
    const value = e.target.value
    setproductinfo({...setproductinfo, [name]:value})

  }
  const handleButton =()=>{
    localStorage.setItem('', )
    localStorage.setItem('', )
    localStorage.setItem('', )
    localStorage.setItem('', )
  }
  //console.log(productinfo)

  return (
    <div className='container'>
         <Card title="Add Product"  style={{ width: 400 }}>
   
      <div className=''>


      <Input className='input-field' type='input' placeholder='Product Name' name="productname" value={setproductinfo.productname} onChange={handleInput} required />
      <Input className='input-field' type='number' placeholder='Product Size' name="productsize" value={setproductinfo.productsize} onChange={handleInput} required />   
      <Input className='input-field' type='number' placeholder='Price' name="productprice"  value={setproductinfo.productprice} onChange={handleInput} required />
      <Input className='input-field' type='number' placeholder='Quantity' name="productquantity" value={setproductinfo.productquantity} onChange={handleInput} required />
      <div>
      <button type='submit' className='add_card_btn' onClick={handleButton}><HiPlus size={25} /> Add Product</button>
      </div>
      </div>
      </Card>
        
    </div>
  )
}
