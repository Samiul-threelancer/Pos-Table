import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { useHistory, useParams } from 'react-router-dom';


const Update = () => {
    let {id} = useParams();

    let history = useHistory();
    // const [id, setID] = useState(null);
    // const [name, setName] = useState('');
    // const [size, setSize] = useState('');
    // const [price, setPrice] = useState('');
    // const [quantity, setQuantity] = useState('');
    const[apiData, setApiData] = useState([]);

    const OnChangeApidata =(e) =>{
        setApiData({
            ...apiData, [e.target.name]:e.target.value


        })
    }

    useEffect(() => {
        // setID(localStorage.getItem('ID'));
        // setName(localStorage.getItem('Product Name'));
        // setSize(localStorage.getItem('Product size'));
        // setPrice(localStorage.getItem('Product Price'));
        // setQuantity(localStorage.getItem('Product Quantity'));
        axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`).then((response) =>{
            console.log('get ta data is:', response.data);
            setApiData(response.data);

        })
    }, [id]);
    const updateButton = () =>{
        console.log('Data is updated here');
        axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
           ...apiData
        }).then(() => {

            history.push('/products');
        })

    }
    

  return (
    <div>
        <div className="main shadow-lg rounded">
            <h1 className='header-title text-center mt-5 '>Update Product</h1>
            <Form>
                <Form.Field>
                    <label>Product Name</label>
                    <input autoComplete='nope' type='text' placeholder='name' name='name' value={apiData.name} onChange={OnChangeApidata}  />
                </Form.Field>
                <Form.Field>
                    <label>Product Size</label>
                    <input autoComplete='nope' type='text' placeholder='size' name='size' value={apiData.size} onChange={OnChangeApidata} />
                </Form.Field>
                <Form.Field>
                    <label>Product Price</label>
                    <input autoComplete='nope' placeholder='price' name='price' value={apiData.price} onChange={OnChangeApidata }/>
                </Form.Field>
                <Form.Field>
                    <label>Product Quantity</label>
                    <input autoComplete='nope' placeholder='quantity' name='quantity' value={apiData.quantity} onChange={OnChangeApidata} />
                </Form.Field>
                <Button className='card-button mt-4' type='submit' onClick={updateButton}>Update Cart</Button>
            </Form>
        </div>


    </div>
  )
}

export default Update