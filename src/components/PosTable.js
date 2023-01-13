import React, { useEffect, useState } from 'react'
import { product_submit, get_product, del_product } from './API';
import { PlusOutlined, DeleteOutlined, Button, Card, Input, message, Table, Select } from 'antd';
import { HiTrash, HiPlus } from "react-icons/hi2";
import { SelectProduct } from './SelectProduct';
import { PrinterOutlined } from '@ant-design/icons';
import { TOKEN } from './Action/actiontype';
import ReactToPrint from 'react-to-print'
import {useRef} from 'react'
import { useLocation } from 'react-router-dom';

import './table.scss'



export const PosTable = () => {
    
    

   //console.log(cardInfo)\
   const ref = useRef();
    const [productinfo, setproductinfo] = useState([])
console.log(productinfo.length)

    const [productname, setproductname] = useState('')
    const [productSize, setProductSize] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [purchaseDate, setpurchaseDate] = useState('')
    // const [callback, setCll]
    console.log(productname, productSize, purchaseDate)
    const [carddErr, setcardErr] = useState()
    const [selectProduct, setSelectProduct] = useState([])
    const [Query, setQuery] = useState('')
    
  const show=()=>{
    document.getElementById('invoice').style.display='hidden';

  }
    const PrintHandle = () =>{
      console.log('print of the pos');
      for (const i=0; i<(productinfo.length-1); i++){
        ()=>{async()=>{del_product(i, TOKEN)}}
      }
      
    }

    

   
     useEffect(() => {

        const ac = new AbortController();

        (async () => {
            try {

                const product = await get_product( TOKEN,{signal: ac.signal } )

                console.log(product)
                setproductinfo(product.data)
                setpurchaseDate(product.data.PurchaseDate)
                // console.log(first)
              

            } catch (err) {
                console.warn(err.message)
            }
        })()


        return () => ac.abort();



    }, [useLocation()])

 


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
          message.success(`This product is deleted`)
          
        }}> <HiTrash size={25} /> </a>,
      },
    
    ];


  return ( 
    <>
    <div className='container'>
    <form action="" id='reset'>
      <div className='card-info'>
      <Card title="Add Product"  style={{ width: 400 }}>
      {/* firstcard */}
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

     
        

        <Card style={{ width: 350, height: 300 }} id='invoice'>
        <div ref={ref} className="invoice" id='invoice'>
        <h3>Invoice</h3>
        <table>
        <tr>
        <td>Product Name</td> 
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
        <td> Amount</td>
        </tr>
        <tr>
        <td>Shirt</td>
        &nbsp;<td>BDT 700</td>
        </tr>
        ----------------------
        <tr>
        <td>Vat & Taxes</td>
        &nbsp;<td>BDT 50</td>
        </tr>
        ----------------------
        <tr>
        <td>Total Price</td>
        &nbsp;<td>BDT 750</td>
        </tr>

        ----------------------
        <tr>
        <td>Billed By:</td>
        &nbsp;<td> Joye Tribianni</td>
        </tr>

        </table>
        </div>

        <ReactToPrint 
          trigger={() => <Button size={25} 
          onClick={PrintHandle}>
          <PrinterOutlined />Confirm & Print</Button>} 
          content={()=>ref.current} 
          pageStyle="@page {size: 8.5in 4.25in}"/>

        

        </Card>
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



