import { useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const EMPTY_CART_LOGO =
    "https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png";

  return (
    <>
      <div className="text-center m-4 p-4">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="w-6/12 m-auto">
          <button
            className=" p-2 m-2 bg-black text-white rounded-lg"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>

          <ItemList items={cartItems} />
        </div>
      </div>
      {cartItems?.length === 0 && (
        <>
          <div className="text-center justify-center">
            <img className="mx-96" src={EMPTY_CART_LOGO} alt="Empty Cart" />
            <h1>Your Cart is empty. Add Items to the cart!</h1>
            <h1> You can go to home page to view more restaurants</h1>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
