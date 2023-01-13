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
// import { SubmitSavedproduct } from './SubmitSavedproduct';



export const PosTable = () => {
    



   const ref = useRef();
   var totalprice = 0;
   
   var vat_value = 0
    const [productinfo, setproductinfo] = useState([])
   
    

    const [productname, setproductname] = useState('')
    const [productSize, setProductSize] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [purchaseDate, setpurchaseDate] = useState('')
    const [totalPrice, setTotalPrice] = useState()
    const [vatTotal, setvatTotal] = useState()
    // const [callback, setCll]
    // console.log(productname, productSize, purchaseDate)
    const [carddErr, setcardErr] = useState()
    const [selectProduct, setSelectProduct] = useState([])
    const [Query, setQuery] = useState('')
    
  const show=()=>{
    document.getElementById('invoice').style.display='hidden';

  }
  const Onclick =()=>{

    const PrintHandle = () =>{
      console.log('print of the pos');
      
      message.success("Print Done")
    }
   
    ClearAll()
 
   

  }
  const ClearAll = async() =>{

    for (const i=0; i<productinfo.length-1; i++){
      {del_product(i, TOKEN)}
    }
  }
    
      const getApi =()=>{
        
        const ac = new AbortController();

        (async () => {
            try {

                const product = await get_product( TOKEN,{signal: ac.signal } )

                //console.log(product)
                setproductinfo(product.data)
                setpurchaseDate(product.data.PurchaseDate)
                // console.log(first)
              

            } catch (err) {
                console.warn(err.message)
            }
        })()


        return () => ac.abort();
      }
    

   
     useEffect(() => {


      getApi()

    }, [useLocation()])


    

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
            "VatTotal": totalPrice,
            "NetTotal": vatTotal,
          
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
    }


    const TableSubmit = async(e)=>{
      e.preventDefault()
        
        //console.log(CardHolder, CardNumber, ExpiaryDate, CVC)

        if (productname==='' ||productSize==='' ||productPrice==='' ||productQuantity===''){
          setcardErr('Please fill up the fields.')
          return
        }

        const data = {
            "ProductName": productname,
            "ProductSize": productSize,
            "ProductPrice": productPrice,
            "ProductQuantity": productQuantity,
          
            }

            try {

                const res = await product_submit(data, TOKEN)
                message.success("New product added")
                console.log(data)
                document.getElementById('reset').reset()
                getApi()

                // message.success(res.data.message)
              } 
                  catch (err) {
                  console.warn(err.message)             
              }
    }
    



    const columns = [
   
   
      {
        title: 'Product Name',
        dataIndex: 'ProductName',
        
      },
      {
        title: 'Product Size',
        dataIndex: 'ProductSize',
        key: '',
      },
      {
        title: 'Product Price',
        dataIndex: 'ProductPrice',
        key: '',
      },
      {
        title: 'Product Quantity',
        dataIndex: 'ProductQuantity', 
        key: '',
      },
      {
        title: 'Purchase Date',
        dataIndex: 'PurchaseDate',
        key: '',

      },
      {
        title: 'Remove',
        dataIndex: 'id',
        key: 'id',
        render: (id) => <a onClick={async()=>{
          del_product(id,TOKEN)
          message.success('This product is deleted')
          
          
        }}> <HiTrash size={25} /> </a>,
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
      <Input className='input-field' type='input' placeholder='Product Name' name="" onChange={(e) => setproductname(e.target.value) } required />
      <Input className='input-field' type='number' placeholder='Product Size' name="" onChange={(e) => setProductSize(e.target.value)} required />   
      <Input className='input-field' type='number' placeholder='Price' name="" onChange={(e) => setProductPrice(e.target.value)} required />
      <Input className='input-field' type='number' placeholder='Quantity' name=""  onChange={(e) => setProductQuantity(e.target.value)} required />
      <div>
      <button type='submit' className='add_card_btn' onClick={TableSubmit}><HiPlus size={15} /> Add Product</button>
      </div>


      </div>
      </Card>

     
        

       
        <div ref={ref} className="invoice" id='invoice'>
          
              <table style={{}} >
                 
              <tr>
              <td><h4>Product Name</h4></td> 
           
              <td> <h4>Amount</h4></td>
             
              
              </tr>

              {productinfo.map((id, i)=>{
            return(
              <tr>
              <td>{id.ProductName }=</td>
              
              <td>{id.ProductPrice }&nbsp;BDT</td>
               <td style={{visibility:"hidden"}}>{totalprice = totalprice+id.ProductPrice}</td>


              </tr>
            )
               })}

               
           ________________________
              <tr>   
              <td>VAT & Taxes</td>
              <td onClick={()=>setvatTotal(vat_value)}>{vat_value = totalprice*0.25}&nbsp;BDT</td>

              </tr>
            
            ________________________
              <tr>   
              <td>Net Total</td>
              <td onClick={()=>setSelectProduct(totalprice)}>{totalprice = totalprice+vat_value}&nbsp;BDT</td>
              {/* {setSelectProduct(totalprice)} */}
              
              
              </tr>

              
            ________________________ 
              <tr>
              <td>Billed By:</td>
              <td>Mr Joey </td>
              
              </tr>

             
      
          
      
              </table>
            

            
         
       

        </div>

        <ReactToPrint 
          trigger={() => 
          <Button size={25} 
          onClick={Onclick}
          
          >
          <PrinterOutlined />Confirm & Print</Button>} 
          content={()=>ref.current} 
          pageStyle="@page {size: 8.5in 4.25in}"/>

        
              <Button onClick={(e)=>SubmitSavedproduct(e)}>Confirm</Button>
      
        </div>
         
     



      <div className='user_history_page' >
      <div className="user_history_conatiner">
      <div className="table_section">
       <div className="table_data_section">

      
       
          {/* <Input.Search 
          placeholder='type text here...'
          onSearch={(value) =>{setQuery(value);
          }}
          onChange={(e)=>{
            setQuery(e.target.value);
          }}/> */}

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



