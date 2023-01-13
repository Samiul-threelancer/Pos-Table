import axios from "axios";
const baseurl = 'http://127.0.0.1:8000';

export const product_submit = async (data, TOKEN) => await axios.post(` ${baseurl}/products/`, data, {headers: {Authorization: `Bearer ${TOKEN}`}})
export const get_product = async ( TOKEN, signal) => await axios.get(` ${baseurl}/products/`, {headers: {Authorization: `Bearer ${TOKEN}`}}, signal);
export const del_product = async (id, TOKEN) => await axios.delete(` ${baseurl}/products/${id}/`, {headers: {Authorization: `Bearer ${TOKEN}`}});
export const loginAPI = async(data) => await axios.post(` ${baseurl}/api/login/`, data);