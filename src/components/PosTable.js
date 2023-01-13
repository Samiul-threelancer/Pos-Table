import React, { useEffect, useState } from 'react'
import { product_submit, get_product, del_product } from './API';
import { PlusOutlined, DeleteOutlined, Button, Card, Input, message, Table, Select } from 'antd';
import { HiTrash, HiPlus } from "react-icons/hi2";
import { SelectProduct } from './SelectProduct';
import { PrinterOutlined } from '@ant-design/icons';
import { TOKEN } from './Action/actiontype';
import ReactPrint from 'react-to-print'
import {useRef} from 'react'

import './table.scss'



export const PosTable = () => {
    
    

   //console.log(cardInfo)\
   const ref = useRef();
    const [productinfo, setproductinfo] = useState([])


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
    
  
    const PrintHandle = () =>{
      console.log('print of the pos');
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



    }, [])

    const SelectProduct =(id)=>{
      setProductPrice([
        ...selectProduct, id
      ])
      console.log(selectProduct)
    

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

                // message.success(res.data.message)
              } 
                  catch (err) {
                  console.warn(err.message)             
              }
    }
    
    // const purchase_date =() =>
    // {
      
    //   var day = purchaseDate.getDate();
    //   var Month = purchaseDate.getMonth();
    //   var Year = purchaseDate.getYear();
    //   var purchase_date_string = day +'-'+ Month +'-'+ Year
    //   console.log(purchase_date_string)

    // }



    const columns = [
   
   
      {
        title: 'Product Name',
        dataIndex: 'ProductName',
        filteredValue:[Query],
          onFilter: (value, record) =>{
            return String(record.ProductName)
            .toLowerCase().
            includes(value.toLowerCase());
          },
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

//hello
      
      {
        title:'Action',
        dataIndex: '',
        key:'',
       
      }
  
   
      
      
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

      
      {/* <Button className='button' >+Add Card</Button> */}
      <button type='submit' className='add_card_btn' onClick={TableSubmit}><HiPlus size={15} /> Add Product</button>

     
      </div>
      </div>
      </Card>

      <div>
        

        <Card style={{ width: 350, height: 300 }}>
          <div ref={ref}>
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

        <ReactPrint trigger={() => <Button size={25} onClick={PrintHandle}><PrinterOutlined />Confirm & Print</Button>} content={()=>ref.current} />

        

        </Card>
      </div>
         
      </div>



      <div className='user_history_page' >
      <div className="user_history_conatiner">
      <div className="table_section">


      <div className="table_data_section">

        {/* <Select.Option disabled>Select Airline</Select.Option>
        {char_IATA.length ? char_IATA.map((items, i) => {

        return (

        <Select.Option key={i} value={items.char_IATA}>{items.char_IATA} </Select.Option>
        )
        }): null}
        </Select> */}
       
          <Input.Search 
          placeholder='type text here...'
          onSearch={(value) =>{setQuery(value);
          }}
          onChange={(e)=>{
            setQuery(e.target.value);
          }}/>

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



