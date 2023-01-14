import React, { useEffect, useState } from 'react'
import { product_submit, get_product, del_product, SavedProduct } from './API';
import { PlusOutlined, DeleteOutlined, Button, Card, Input, message, Table, Select } from 'antd';
import { HiTrash, HiPlus } from "react-icons/hi2";
import { SelectProduct } from './SelectProduct';
import { PrinterOutlined } from '@ant-design/icons';
import { TOKEN } from './Action/actiontype';
import ReactToPrint from 'react-to-print'
import {useRef} from 'react'
import { useLocation } from 'react-router-dom';
import './table.scss'
import { Item } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

// import { SubmitSavedproduct } from './SubmitSavedproduct';



export const PosTable = () => {
    
   const ref = useRef();
   var totalprice = 0;
   
   var vat_value = 0;
   

   const getDataLocal =()=>{
    const data = localStorage.getItem('products')
    if (data){
      return JSON.parse(data);
    }
    else{
      return[]
    }
  }
  const total_price_before = getDataLocal().reduce(( prev, next ) => ( prev  + parseInt( next.productPrice) * parseInt(next.productQuantity)), 0 )
  const vat_price = getDataLocal().reduce(( prev, next ) => ( prev +total_price_before*0.25 ), 0 )
    const total_price = getDataLocal().reduce(( prev, next ) => ( prev  + total_price_before + vat_price), 0 )
    

  console.log("getDataLocal", getDataLocal())
  console.log("total price before vat", total_price_before)




  console.log("vat__price", vat_price)
  console.log("total__price", total_price)
   //mian product info
    const [productinfo, setproductinfo] = useState(getDataLocal())

    const [productname, setproductname] = useState('')
    const [productSize, setProductSize] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [purchaseDate, setpurchaseDate] = useState('')
    const [totalPrice, setTotalPrice] = useState()
    const [vatTotal, setvatTotal] = useState()

    const [carddErr, setcardErr] = useState()
    const [selectProduct, setSelectProduct] = useState([])
    
    


  const ClearAll =()=>{
    message.warning("All data clear")
    setproductinfo([])

  }
    



  console.log(productinfo)
    const handleSubmit =(e)=>{
      e.preventDefault();
     
      let product={
        ID: uuidv4(),
        productname,
        productSize,
        productPrice,
        productQuantity

      }
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



 

  const Onclick =()=>{

    const PrintHandle = () =>{
      console.log('print of the pos');
      
      message.success("Print Done")
    }
    
  }
 


    
//..............invoice..........saved_product....
    const SubmitSavedproduct = async(e)=>{
      e.preventDefault()  
      console.log("savedproduct")
          
        // console.log(productname, productSize)

        const payload = {
            // ...productinfo,
            "ProductName": productname,
            "ProductSize": productSize,
            "ProductPrice": productPrice,
            "ProductQuantity": productQuantity,
            "VatTotal": vat_value,
            "NetTotal": totalprice,
          
            }
            console.log(payload)

            try {

                const res = await SavedProduct(payload, TOKEN)
                message.success("New product added")
                console.log("paylodad", payload)

              } 
                  catch (err) {
                  console.warn(err.message)             
              }
              
              //auto cursor
      
        {    
          var elts = document.getElementsByClassName('name')
          Array.from(elts).forEach(function(elt){
          elt.addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13 || elt.value.length == 3) {
          // Focus on the next sibling
          elt.nextElementSibling.focus()
          }
          });
          })
        }


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
    <form action="" id='reset'>
      <div className='card-info'>
      <Card title="Add Product"  style={{ width: 400 }}>
      
      <div className=''>

      <span>{carddErr}</span>
      
      <Input className='input-field' type='input' placeholder='Product Name' name="name" id="input1" value={productname} onChange={(e) => setproductname(e.target.value) }  required />

      <Input className='input-field' type='input' placeholder='Product Size' name="name" id="input2" value={productSize} onChange={(e) => setProductSize(e.target.value)} required />   
      <Input className='input-field' type='number' placeholder='Price' name="name" id="input3" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
      <Input className='input-field' type='number' placeholder='Quantity' name="name" id="input4" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
      <div>
      <button type='submit' className='add_card_btn' onClick={handleSubmit} ><HiPlus size={15} /> Add Product</button>
      </div>


      </div>
      </Card>

     
        

       
        <div ref={ref} className="invoice" id='invoice' >
          
              <table style={{}} key={uuidv4}>
                 <thead>
              <tr>
              <td>Product</td> 
    
              {/* <td> <h4>Sz</h4></td> */}
             
       
              <td>Qty*Unit </td>
             
              
              </tr>
              </thead>

              {productinfo.map((id, i)=>{
                console.log("productinfo", productinfo)
            return(
              <tr key={i}>
              <td>{id.productname}:</td>
             
              
              
              <td>{`${id.productQuantity}*${id.productPrice}=${id.productPrice*id.productQuantity}`}</td>
              
              
             


              </tr>
            )
               })}

               
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
             

              
            ________________________ 
              <tr>
              <td>Billed By:</td>
              <td>Mr Chandler </td>
              
              </tr>
              <ReactToPrint 
          trigger={() => 
          <Button size={25} 
          onClick={Onclick}
          
          >
          <PrinterOutlined />Print</Button>} 
          content={()=>ref.current} 
          pageStyle="@page {size: 8.5in 8.5in}"/>
      
        </table>
      

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
