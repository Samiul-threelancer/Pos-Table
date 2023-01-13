import React, { useEffect, useState, useMemo } from 'react'
import './Products.css'
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import ReactPrint from 'react-to-print'
import {useRef} from 'react'

const Products = () => {
  const ref = useRef();
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice]= useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setdate] = useState(' ');
  const [APIData, setAPIData] = useState([ ]);
  const [Query, setQuery] = useState('');
  const [arr, setArr] = useState([ ])
 
  
  const vat = 0.15;





 //Remove items from list. 
  const onRemove = (xitem, e)=>{
    e.preventDefault()
    const newarr = arr.filter((item)=> item.id !== xitem)
    setArr(newarr)

     
  }
  




   //Add items to the inventory list. 
  
  const onAddtoCart =(item, e)=>{
    e.preventDefault()
    setArr([
      ...arr, item
    ])



    
    
  }

  useEffect (() =>{
    axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`).then((response)=>{
      if(response.status === 200){
      console.log('get data is:', response);
      console.log('Product Data is here:', response.data);
      setAPIData(response.data);

      }
     
    })
  }, [] );



  const search = useMemo(()=>{
    
    let searchvar = APIData;

    if (Query){
      searchvar = searchvar.filter(item=>
        item.name.toLowerCase().includes(Query.toLowerCase())|| 
        item.size.toLowerCase().includes(Query.toLowerCase())|| 
        // item.quantity.includes(Query.toString())|| 
        item.price.includes(Query)|| 
        item.date.toLowerCase().includes(Query.toLowerCase())

      )
    }

    return searchvar


  }, [APIData, Query])
  console.log("search value", search)

  const setData = (data1) => {
    let { id, name, size, price, quantity, date } = data1;
    localStorage.setItem('ID', id);
    localStorage.setItem('Product Name', name);
    localStorage.setItem('Product size', size);
    localStorage.setItem('Product Price', price);
    localStorage.setItem('Product Quantity', quantity)
    localStorage.setItem('Product Quantity', date)
}

const dateHandler = (e) =>{
  console.log("first")
  setdate = e.target.value;

 }

  const cardButton = (e) =>{
    console.log('the card button is here:');
    e.preventDefault();

   

    axios.post(`http://127.0.0.1:8000/products`, {
     
     
    }).then((response) => {
      console.log(response);
      setName('');
      setPrice('');
      setSize('');
      setQuantity('');
      setdate('');
  })
  setAPIData([...APIData,{name, price, size, quantity, date}])


}


    
    const getData = () => {
      axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
          .then((getData) => {
           setAPIData(getData.data);
       })
  }
    const onDelete = (id) =>{
      
      axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`).then(() =>{
        getData();
      })
    }
   

    const PrintHandle = () =>{
      console.log('print of the pos');
    }

  return (
    <div className='parencontainer'>


      <div className='container1 d-flex '>


        <div className="main d-flex shadow-lg rounded">
          <div className='header-title'>
        <h1 className='header-title text-center mt-5 '>Add to Inventory</h1>
        </div>

             
            
             <div className='form'>
             
                <label className='label'>Product Name</label>
                <input type='text' placeholder='Name' value={name} onChange={ (e) => setName(e.target.value)} />
              
              </div>

              <div className='form'>
              
                <label className='label'>Product Size</label>
                <input autoComplete='nope' type='text' placeholder='Size' value={size} onChange={ (e) => setSize(e.target.value) } />
              
              </div>

              <div className='form'>
              
                <label className='label'>Product Price</label>
                <input autoComplete='nope' placeholder='Price' value={price} onChange={ (e) => setPrice (e.target.value) }/>
              
              </div>

              <div className='form'>
              
                <label className='label'>Product Quantity</label>
                <input autoComplete='nope' placeholder='Quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
              
              </div>


              <div className='form'>
              
                <label className='label'>Purchase Date</label>
                <input type="date" autoComplete='nope' placeholder='Quantity' value={date} 
                onChange={(e)=>{setdate(e.target.value); dateHandler(e.target.value)}} />
              
              </div>



              <div className='cardbutton'>
              <Button className='card-button mt-4' type='submit' onClick={cardButton}>Add Inventory</Button>
              </div>
         
        </div>
        
           

      <div className='parent_tableclass' >
      
        <div className='tableClass'>

             <div className='search'>
              <label style={{font:"2rem" }}>Search: </label>
             <input type="text" onChange={e =>setQuery(e.target.value)} placeholder="search here..."></input>       
             </div>

            <Table striped bordered hover>
              <thead>
              
                <tr className='table-row'>
                  <th>Index </th> 
                  <th>Product Name</th>
                  <th>Product Size</th>
                  <th>Product Price</th>
                  <th>Quantity</th>
                  <th>Vat</th>
                  <th>Purchase Date</th>
                  <th>Total Price</th>   
                  <th>Update</th>
                  <th>Delete</th>   
                  <th>Add</th>            
                </tr>
              </thead>
              <tbody>
              
                {search.map((item, i)=>{
                  return(
                    
                    <tr key={i} className='table-row'>
                    <td> {i} </td>
                    <td> {item.name && item.name }  </td>
                    <td> {item.size && item.size} </td>
                    <td> {item.price && item.price} </td>
                    <td> {item.quantity && item.quantity} </td>
                    <td> {Number(vat*item.price)} </td>
                    <td> {item.date} </td>
                    <td> {item.quantity * item.price + Number(vat*item.price)} </td>
                    
                    {/* ///${item.id} */}
                  <Link to={`/update/${item.id}`}> 
                  <td> <button className='btn-Edit' onClick={() => setData(item)} >Edit</button>
                    </td>               
                  </Link>
              
                  <td> <button className='btn-Delete' onClick={() => onDelete(item.id)}>Remove</button>
                    </td>    

                    <td> <button className='btn-Delete' onClick={(e) => onAddtoCart(item, e)}>Add</button>
                    </td>              
                  
                  </tr>

                  )

                
                })}
              </tbody>
            </Table>

          

        </div>
        <div  className='Pos-part mb-10px'>
      

          <table className='POS-table'>
          
          


            <div >
          <div className='NIT_header'>
          

         
          
          </div>

          
                   
                    
                   




                  <tbody ref={ref} className= "tbody" >
                    
                      
                   <div  id="print02" className="nitheader">
                    <h3 className=''>NIT SYSTEM</h3>
                    <p className=''> 1234/4 || Joey <br /> Central Perk, NY <br />
                    Phone: +998541235652</p>
                    <h5>----------------------------------</h5>
                    </div>

                   {arr.map((item, i) =>{
                   return(
                   <div className='parent'>

                   
                   <tr  key={i} id="print01" className='pos-header d-flex flex-column'>
                    {/* <td>Product Id: {i}</td> */}
                    <td>Purchase Date: {item.date} </td>
                    <td>Product Name: {item.name}</td>
                    <td>Product Size: {item.size}</td>
                    <td>Product Price: {item.price} taka</td>
                    <td>Product Quantity: {item.quantity}</td>
                    <td>Vat/Taxes: {Number(vat*item.price)} taka</td>
                    <td>Total Proce: {item.quantity * item.price + Number(vat*item.price)} taka</td>

                    
                    
                    
                    
                   </tr>   
                   <a>-------------------</a>
                   <br />
                   

                   


                   <button classname="removebutton" onClick={(e)=>onRemove(item.id, e)}>Remove</button>

                  </div>
                  
                  
                )
              })

              }
            
            </tbody> 
            </div>
            
            <div className='print-button d-flex justify-content-end'>

              {/* <button onClick={printhandle}> Print </button> */}
        <ReactPrint trigger={() => <button type="button" className=" print-btn btn btn-secondary mt-5 me-5" onClick={PrintHandle} >Print</button>} content={() => ref.current} />
        </div>
          </table>
        

          
        </div>
       
      </div>

        
      </div>

      

     


    </div>
  )
}

export default Products