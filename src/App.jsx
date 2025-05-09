/* eslint-disable no-unused-vars */
import { useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

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

  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} />

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
