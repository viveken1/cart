import React from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts } from '../REDUX/Slices/productSlice'




function Header({insideHome}) {
  const dispatch = useDispatch()

  const cartCount = useSelector(state=>state.cartReducer).length
  const wishlistCount = useSelector(state=>state.wishlistReducer).length
  return (
    <>
      <Navbar style={{zIndex:'10'}} expand="lg" className="bg-primary position-fixed top-0 w-100">
        <Container>
          <Navbar.Brand > <Link to={'/'} className='text-light fw-bolder' style={{ textDecoration: 'none' }}><i className="fa-solid fa-truck-fast me-2"></i>E-carT</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            { insideHome &&
             <Nav.Link  >
                <input  onChange={(e)=>dispatch(searchProducts(e.target.value.toLowerCase()))} style={{ width: '400px' }} className='form-control' type="text" placeholder='search products!!' />
              </Nav.Link>
              
              }
              <Nav.Link ><Link className='text-light fw-bolder' style={{ textDecoration: 'none' }} to={'/wishlist'}> <i className="fa-solid fa-heart me-2 text-danger" ></i>WishList <Badge bg="secondary">{wishlistCount}</Badge> </Link>
              </Nav.Link>

              <Nav.Link ><Link className='text-light fw-bolder' style={{ textDecoration: 'none' }} to={'/cart'}> <i class="fa-solid fa-cart-plus me-2 text-success"></i>Cart <Badge bg="secondary">{cartCount}</Badge> </Link>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default Header