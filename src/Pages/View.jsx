import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem} from '../REDUX/Slices/wishlistSlice'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function View() {


  const cart = useSelector(state=>state.cartReducer)
    const wishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()

  const [product,setProduct] = useState({})
  const {id} = useParams()
// console.log(id);

useEffect(()=>{
  if(sessionStorage.getItem("allProducts")){
    const allProducts = JSON.parse
    (sessionStorage.getItem("allProducts"))
    // console.log("allProducts");
    setProduct(allProducts.find(item=>item.id==id))
  }
},[])
// console.log(product);
const handleWishlist = (product)=>{
    if(wishlist?.includes(product)){
      toast.info("Item Is Already In The Wishlist")
    }else{
      dispatch(addWishlistItem(product))
    }
}

const handleCart = (product)=>{
  const existingProduct = cart?.find(item=>item.id==product.id)
  if(existingProduct){
    dispatch(addToCart(product))
    toast.success("products are added to your cart !!!")
  }else{
    dispatch(addToCart(product))
   toast.success("product added to the cart !!")
  }
}

  return (
    <>
    <Header/>
    <div style={{marginTop:'150px',height:'70vh'}} className="container d-flex align-items-center">
      <div className="row mb-5 align-items-center">
        <div className="col-lg-5">
          <img style={{height:'400px',width:'400px'}} className='img-fluid' src={product?.thumbnail} alt="" />
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-6">
          <h5>PID: {product?.id}</h5>
          <h2>{product.title}</h2>
          <h3 className='text-danger'>$ {product?.price}</h3>
          <p style={{textAlign:'justify'}}>{product.description}</p>
          <div className="d-flex justify-content-between">
            <button onClick={()=>handleWishlist(product)}  className='btn btn-outline-success'><i className="fa-solid fa-heart me-2 text-danger" ></i> Add To Wishlist</button>
            <button  onClick={()=>handleCart(product)}  className='btn btn-outline-dark'><i className="fa-solid fa-cart-plus me-2 text-success" ></i> Add To Cart</button>
          </div>
            
        </div>
      </div>
    </div>
    {/* toast */}
    <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default View