/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  /* Esto para APIs, para consumir cuando este listo el componente
  useEffect(() => {
    setData(db);
  },[]);
*/

  //console.log(data)

  // Lo hacemos con item para generalizarlo y poder reutilizarlo en otros proyectos
  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    if (itemExist >= 0) {
      console.log("Elemento ya existente, no se añadirá al carrito")
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      console.log("Agregando al carrito...")
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    console.log("Eliminar")
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id))
  }

  function incrementQuantity(id) {
    console.log("Incrementa")
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decrementQuantity(id) {
    console.log("Decrementa")
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
      />

      <main className='container-xl mt-5'>
        <h2 className='text-center'>Nuestra Colección</h2>

        <div className='row mt-5'>
          {data.map((guitar) => {
            return (
              <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
            )
          })}
        </div>
      </main>

      <footer className='bg-dark mt-5 py-5'>
        <div className='container-xl'>
          <p className='text-white text-center fs-4 mt-4 m-md-0'>
            GuitarES - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
