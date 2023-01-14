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
    


  //   const setData = (data1) => {
  //     let { id, productname, productSize, productPrice, productQuantity }=data1;
  //     localStorage.setItem('ID', id);
  //     localStorage.setItem('Product Name', productname);
  //     localStorage.setItem('Product size', productSize);
  //     localStorage.setItem('Product Price', productPrice);
  //     localStorage.setItem('Product Quantity', productQuantity)
      
  // }
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
  // const ClearAll = async() =>{

  //   for (const i=0; i<productinfo.length-1; i++){
  //     {del_product(i, TOKEN)}
  //   }
  // }
    
      // const getApi =()=>{
        
      //   const ac = new AbortController();

      //   (async () => {
      //       try {

      //           const product = await get_product( TOKEN,{signal: ac.signal } )

      //           console.log(product.data)
      //           setproductinfo(product.data)
      //           setpurchaseDate(product.data.PurchaseDate)
      //           // console.log(first)
              

      //       } catch (err) {
      //           console.warn(err.message)
      //       }
      //   })()


      //   return () => ac.abort();
      // }
    

   
    //  useEffect(() => {


    //   getApi()

    // }, [useLocation()])


    
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
            "VatTotal": totalPrice,
            "NetTotal": vatTotal,
          
            }
            // console.log(payload)

            // try {

            //     const res = await SavedProduct(payload, TOKEN)
            //     message.success("New product added")
            //     console.log("paylodad", payload)

            //   } 
            //       catch (err) {
            //       console.warn(err.message)             
            //   }
    }


    // const TableSubmit = async(e)=>{
    //   e.preventDefault()
        
    //     //console.log(CardHolder, CardNumber, ExpiaryDate, CVC)

    //     if (productname==='' ||productSize==='' ||productPrice==='' ||productQuantity===''){
    //       setcardErr('Please fill up the fields.')
    //       return
    //     }

    //     const data = {
    //         "ProductName": productname,
    //         "ProductSize": productSize,
    //         "ProductPrice": productPrice,
    //         "ProductQuantity": productQuantity,
          
    //         }

    //         try {

    //             const res = await product_submit(data, TOKEN)
    //             message.success("New product added")
    //             console.log(data)
    //             document.getElementById('reset').reset()
                

    //             // message.success(res.data.message)
    //           } 
    //               catch (err) {
    //               console.warn(err.message)             
    //           }
    // }
    



    
  
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
      <Input className='input-field' type='input' placeholder='Product Name' name="" value={productname} onChange={(e) => setproductname(e.target.value) } required />
      <Input className='input-field' type='number' placeholder='Product Size' name="" value={productSize} onChange={(e) => setProductSize(e.target.value)} required />   
      <Input className='input-field' type='number' placeholder='Price' name="" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
      <Input className='input-field' type='number' placeholder='Quantity' name="" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
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
              <td>Qty</td>
              <td>UP</td> 
              <td>Amount </td>
             
              
              </tr>
              </thead>

              {productinfo.map((id, i)=>{
                console.log("productinfo", productinfo)
            return(
              <tr>
              <td>{id.productname}:</td>
             
              <td>{id.productQuantity}</td>
              <td>{id.productPrice}/-</td>
              <td>{parseFloat(id.productPrice)*id.productQuantity}/-</td>
              
              <td style={{visibility:"hidden"}}>{parseFloat(totalprice = totalprice+parseFloat(id.productPrice))}</td>
             


              </tr>
            )
               })}

               
           ________________________
              <tr>   
              <td>VAT & Taxes</td>
              <td onClick={()=>setvatTotal(vat_value)}>{vat_value =parseFloat(totalprice)* 0.15 }&nbsp;BDT</td>

              </tr>
            
            ________________________
              <tr>   
              <td>Net Total</td>
              <td onClick={()=>setSelectProduct(totalprice)}>{totalprice = parseFloat(totalprice)+vat_value}&nbsp;BDT</td>
              {/* {setSelectProduct(totalprice)} */}
              
              
              </tr>
              {console.log(vatTotal, totalPrice)}

              
            ________________________ 
              <tr>
              <td>Billed By:</td>
              <td>Mr Chandler </td>
              
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
          pageStyle="@page {size: 8.5in 8.5in}"/>

        
              <Button onClick={(e)=>SubmitSavedproduct(e)}>Confirm</Button>
            
      
        </div>
         
     



      <div className='user_history_page' >
      <div className="user_history_conatiner">
      <div className="table_section">
       <div className="table_data_section">

      
   

        <Button onClick={(e)=>ClearAll(e)} type="primary" danger ghost>
        Clear all
        </Button>

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



