import React, { useEffect, useState } from 'react'
import { SavedProduct } from './API';
import { Button, Card, Input, message, Table } from 'antd';
import { HiTrash, HiPlus } from "react-icons/hi2";
import { PrinterOutlined } from '@ant-design/icons';
import { TOKEN } from './Action/actiontype';

import './table.scss'

import { v4 as uuidv4 } from 'uuid';





export const PosTable = () => {
  console.log(TOKEN)
    
 
   const getDataLocal =()=>{
    const data = localStorage.getItem('products')
    if (data){
      return JSON.parse(data);
    }
    else{
      return[]
    }
  }
  console.log("getDataLocal", getDataLocal())
 

 
   //mian product info
    const [productinfo, setproductinfo] = useState([getDataLocal()])

    const [productname, setproductname] = useState('')
    const [productSize, setProductSize] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState(parseInt(1))
    const [carddErr, setcardErr] = useState('')


        //mathmatical calculation
        var total_price_before = getDataLocal().reduce(( prev, next ) => ( prev  + (parseInt(next.productPrice) * parseInt(next.productQuantity))), 0 )
        var vat_price = getDataLocal().reduce(( prev, next ) => ( prev + parseInt(total_price_before)*0.05), 0 )
        var total_price = getDataLocal().reduce(( prev, next ) => ( prev  + parseInt(total_price_before) + parseInt(vat_price)), 0 )
    

        console.log("total price before vat:", total_price_before)
        console.log("vat__price:", vat_price)
        console.log("total__price:", total_price)
        

    const handleSubmit =(e)=>{
      e.preventDefault();
     
      let product={
        ID: uuidv4(),
        productname,
        productSize,
        productPrice,
        productQuantity

      }
      
          
      if (productname===''||productSize===''||productPrice===''||productQuantity===''){
        setcardErr("Please fill all the fields") 
      }    return
            setproductinfo([...productinfo, product])
      }
        useEffect(()=>{

          localStorage.setItem('products',JSON.stringify(productinfo));
        },[productinfo])


       

    const deleteProduct=(ID)=>{
      const filteredProduct = productinfo.filter((prdouct)=>{  
        return prdouct.ID !== ID;
      })
      setproductinfo(filteredProduct)
     }

     const ClearAll =()=>{
      setproductinfo([])
      message.warning("All data clear")
      
      // window.location.reload()
  
    }
 
 
    const printHandle =()=>{
      window.print()
      console.log("print is goin on")
    }


 const SubmitSavedproduct = () =>{

 }

    
  
//...........Columns...............
const columns = [ 
     
      {
        title: 'Product Name',
        dataIndex: 'productname',
        
      },
      {
        title: 'Product Size',
        dataIndex: 'productSize',
        key: '',
      },
      {
        title: 'Product Price',
        dataIndex: 'productPrice',
        key: '',
      },
      {
        title: 'Product Quantity',
        dataIndex: 'productQuantity', 
        key: '',
      },
    
      {
        title: 'Remove',
        dataIndex: 'ID',
        key: 'productname',
        render: (ID) => { return <a onClick={()=>deleteProduct(ID)}> <HiTrash size={25} /> </a>}
      },
    
    ];


  return ( 
    <>
    <div className='container'>
    <form action="" id='form'>
      <div className='card-info'>
      <Card title="Add Product"  style={{ width: 400 }}>
      
    

      <span style={{color:"red"}}>{carddErr}</span>
      
      <Input className='input-field' type='input' placeholder='Product Name' name="name" id="input1" value={productname} onChange={(e) => setproductname(e.target.value) }  required />
      <Input className='input-field' type='input' placeholder='Product Size' name="name" id="input2" value={productSize} onChange={(e) => setProductSize(e.target.value)} required />   
      <Input className='input-field' type='number' placeholder='Price' name="name" id="input3" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
      <Input className='input-field' type='number' placeholder='Quantity' name="name" id="input4" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
      <div>
      <button type='submit' className='add_card_btn' onClick={handleSubmit} ><HiPlus size={15} /> Add Product</button>
  


      </div>
      </Card>

     
        

       
          <div className="invoice" >
          
              <table key={uuidv4}>
              <thead>
              <tr>
              <th className='quantity'>Q</th>
              <th className='description'>Description</th> 
              <th className='price'>$$</th> 
              </tr>
              </thead>
              <tbody>


              {productinfo.map((id, i)=>{
                
            return(
              <tr key={id}>
              <td className='quantity'>{id.productQuantity}</td>
              <td className='description'>{id.productname}</td>
              <td className='price'>{id.productPrice}</td>
              </tr>
            
            )
               })}
               </tbody>

               <tfoot>
          
              <tr>   
              <td className='description'>VAT</td>
              <td className='price'>{vat_price.toFixed(2)}BDT</td>

              </tr>
            
          
              <tr>   
              <td className='description'>Net Total</td>
              <td className='price'>{total_price}BDT</td>    
              </tr>
      
              <tr>
              <td>Billed By:</td>
              <td>Mr Chandler </td>
              
              </tr>
              </tfoot>
              
      
        </table>
        </div>

        </div>
         
 

      <div className='table' >
     

      
   
      <Button onClick={(e)=>SubmitSavedproduct(e)}>Save Table</Button>

      <Button onClick={(e)=>ClearAll(e)} type="primary" danger ghost>Clear Table</Button>
      <Button className='hide-print' size={25} onClick={printHandle}>
          <PrinterOutlined />Print</Button>

      <Table columns={columns} dataSource={productinfo} /> 
    
      </div>

      </form>
      </div>

      </>
      )
      }
