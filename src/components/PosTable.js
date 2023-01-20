import React, { useEffect, useState } from 'react'
import { InvoiceSave, product_submit, SavedProduct } from './API';
import { Button, Card, Input, message, Table } from 'antd';
import { HiTrash, HiPlus } from "react-icons/hi2";

import { PrinterOutlined } from '@ant-design/icons';
import { TOKEN } from './Action/actiontype';
import ReactToPrint from 'react-to-print'
import {useRef} from 'react'

import './table.scss'

import { v4 as uuidv4 } from 'uuid';





export const PosTable = () => {
  console.log(TOKEN)
    
   const ref = useRef();
 
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
    const [invoice, setInvoice] = useState([])


        //mathmatical calculation
        const total_price_before = getDataLocal().reduce(( prev, next ) => ( prev  + (parseInt(next.productPrice) * parseInt(next.productQuantity))), 0 )
        const vat_price = getDataLocal().reduce(( prev, next ) => ( prev + parseInt(total_price_before)*0.05), 0 )
        const total_price = getDataLocal().reduce(( prev, next ) => ( prev  + parseInt(total_price_before) + parseInt(vat_price)), 0 )
    

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



    
//..............invoice..........saved_product....
    const SubmitSavedproduct = async(e)=>{
      e.preventDefault()  

    
      
      

        const payload = {
          "ProductName" : productname,
          "ProductSize" : productSize,
          "ProductPrice" : productPrice,
          "ProductQuantity" : productQuantity,
          
     
            }
       

            try {

                const res = await product_submit(payload, TOKEN)
                message.success("New product added")
                console.log("paylodad", payload)

              } 
                  catch (err) {
                  console.warn(err.message)             
              }
              
              //auto cursor
      
        // {    
        //   var elts = document.getElementsByClassName('name')
        //   Array.from(elts).forEach(function(elt){
        //   elt.addEventListener("keyup", function(event) {
        //   // Number 13 is the "Enter" key on the keyboard
        //   if (event.keyCode === 13 || elt.value.length == 3) {
        //   // Focus on the next sibling
        //   elt.nextElementSibling.focus()
        //   }
        //   });
        //   })
        // }
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
      
      <div className=''>

      <span style={{color:"red"}}>{carddErr}</span>
      
      <Input className='input-field' type='input' placeholder='Product Name' name="name" id="input1" value={productname} onChange={(e) => setproductname(e.target.value) }  required />
      <Input className='input-field' type='input' placeholder='Product Size' name="name" id="input2" value={productSize} onChange={(e) => setProductSize(e.target.value)} required />   
      <Input className='input-field' type='number' placeholder='Price' name="name" id="input3" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
      <Input className='input-field' type='number' placeholder='Quantity' name="name" id="input4" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
      <div>
      <button type='submit' className='add_card_btn' onClick={handleSubmit} ><HiPlus size={15} /> Add Product</button>
      </div>


      </div>
      </Card>

     
        

       
        <div className="invoice" id='invoice' >
          
              <table style={{}} key={uuidv4} ref={ref}>
                 <thead>
              <tr>
              <th>Product</th> 
    
              {/* <td> <h4>Sz</h4></td> */}
             
       
              <th>Qty*Unit </th>
             
              
              </tr>
              </thead>


              <tbody>

              {productinfo.map((id, i)=>{
                
            return(
              <tr key={id}>
              <td>{id.productname}:</td>
             
              
              
              <td>{`${id.productQuantity}*${id.productPrice}=${id.productPrice*id.productQuantity}`}</td>
              
              
             


              </tr>
            
            )
               })}
               </tbody>

               <tfoot>
           ________________________
              <tr>   
              <td>VAT & Taxes</td>
              <td>{vat_price}&nbsp;BDT</td>

              </tr>
            
            ________________________
              <tr>   
              <td>Net Total</td>
              <td >{total_price}&nbsp;BDT</td>
              {/* {setSelectProduct(totalprice)} */}
              
              
              </tr>
_____________________ 
              <tr>
              <td>Billed By:</td>
              <td>Mr Chandler </td>
              
              </tr>
              </tfoot>
              
      
        </table>

        <ReactToPrint 
          trigger={() => 
          <Button size={25} 
         
          
          >
          <PrinterOutlined />Print</Button>} 
          content={()=>ref.current} 
          pageStyle="@page {size: 80mm 80mm}"/>
      

        </div>
   
        </div>
         
     



      <div className='user_history_page' >
      <div className="user_history_conatiner">
      <div className="table_section">
       <div className="table_data_section">

      
   
      <Button onClick={(e)=>SubmitSavedproduct(e)}>Save Table</Button>

      <Button onClick={(e)=>ClearAll(e)} type="primary" danger ghost>Clear Table</Button>
        

      <Table columns={columns} dataSource={productinfo} /> 
      </div> 
      </div>
      </div>
      </div>

      </form>
      </div>

      </>
      )
      }
