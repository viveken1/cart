import React from 'react'
import Header from '../Components/Header'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../REDUX/Slices/wishlistSlice'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';




function Wishlist() {

    const cart = useSelector(state=>state.cartReducer)

  const wishlist = useSelector(state=>state.wishlistReducer)

  const dispatch = useDispatch()

    
const handleCart = (product)=>{
  const existingProduct = cart?.find(item=>item.id==product.id)
  if(existingProduct){
    dispatch(addToCart(product))
    dispatch(removeWishlistItem(product.id))
   toast.success("products are added to your cart !!!")
  }else{
    dispatch(addToCart(product))
    dispatch(removeWishlistItem(product.id))
    // alert("product added to the cart !!")
  }
}



  return (
    <>

      <Header />
      <div className='container'>
       { wishlist?.length>0?
      <Row  style={{ marginTop: '100px' }}>
       {
       wishlist?.map(product=>(

        <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
        <Card className='shadow rounded' style={{ width: '18rem' }}>
          <Card.Img style={{ height: '180px' }} variant="top" src={product?.thumbnail} />
          <Card.Body>
            <Card.Title >{product?.title.slice(0,16)}...</Card.Title>
            <div className="d-flex justify-content-between">
              <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='btn'><i className="fa-solid fa-heart-circle-xmark text-danger"></i></button>
              <button  onClick={()=>handleCart(product)} className='btn'><i className="fa-solid fa-cart-plus text-success"></i></button>

            </div>
          </Card.Body>
        </Card>
          
      </Col>
      
       ))
      
        }

      </Row>:
       <div style={{height:"70vh",marginTop:"100px"}}  className="w-100 d-flex justify-content-center align-items-center flex-column">
       <img className='img-fluid' style={{ width: '400px' }} src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png" alt="" />
       <h3>Your Wish list is Empty !!!!</h3>
     </div>
   } 
   </div>
   <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>

  )
}

export default Wishlist