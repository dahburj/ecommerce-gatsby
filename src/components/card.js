import React, { useContext, useState } from "react"
import { StripeProvider, Elements } from "react-stripe-elements"
import { CartContext } from "../context/cart"
import { CartUIContext } from "../context/cartUI"
import { PaymentSection } from "./card-styles"
import Checkout from "./checkout"

const Payment = () => {
  const [email, updateEmail] = useState("")
  const [complete, updateComplete] = useState(false)
  const [cart, updateCart] = useContext(CartContext)
  const [cartUIStatus, updateCartUI] = useContext(CartUIContext)

  return (
    <PaymentSection>
      <h3>Please enter your payment details:</h3>
      <label htmlFor="email">Email</label>
      <br />
      <input
        id="email"
        type="email"
        value={email}
        onChange={event => updateEmail(event.target.value)}
        placeholder="name@example.com"
      />
      <br />
      <label htmlFor="card">Credit Card</label>
      <br />
      <small>
        Test using this credit card:
        <span className="cc-number"> 4242 4242 4242 4242</span>, and enter any 5
        digits for the zip code
      </small>
      <StripeProvider apiKey="pk_test_pHFAJrGAwCzxc8yPyzeRfMu200uQx2Wheh">
        <Elements>
          <Checkout
            updateComplete={updateComplete}
            email={email}
            complete={complete}
            cart={cart}
            updateCart={updateCart}
            updateCartUI={updateCartUI}
          ></Checkout>
        </Elements>
      </StripeProvider>
    </PaymentSection>
  )
}

const Failure = () => {
  return (
    <>
      <h3>Oh No!</h3>
      <p>Something went wrong!</p>
      <button>Please try again</button>
    </>
  )
}

const Loading = () => {
  return (
    <>
      <h4>Please hold, we're filling up your cart with goodies</h4>
      <p>Placeholder image</p>
    </>
  )
}

const Success = () => {
  return <h4>Success!</h4>
}

const Card = () => {
  const [cartUIStatus, updateCartUI] = useContext(CartUIContext)
  return (
    <>
      {cartUIStatus === "idle" ? <Payment /> : null}
      {cartUIStatus === "failure" ? <Failure /> : null}
      {cartUIStatus === "loading" ? <Loading /> : null}
      {cartUIStatus === "success" ? <Success /> : null}
    </>
  )
}

export default Card
