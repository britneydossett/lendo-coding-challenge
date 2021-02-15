import { useLayoutEffect, useState, useRef } from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

const ToastContainer = styled.div`
  color: ${(props) => (props.itemUnavailable ? "red" : "#67a167")};
  position: absolute;
  right: 30px;
  top: 60px;
`;

const Toast = () => {
  const showAddToCart = useStoreState((state) => state.showAddToCart);
  const itemUnavailable = useStoreState((state) => state.itemUnavailable);
  const cart = useStoreState((state) => state.cart);

  const [showToast, setShowToast] = useState(false);
  const initMount = useRef(true);

  const message = itemUnavailable ? "Item Unavailable." : "Added to Cart!";
  const duration = 3000;

  useLayoutEffect(() => {
    if (initMount.current) {
      initMount.current = false;
      return;
    }
    setShowToast(showAddToCart);
    setTimeout(() => setShowToast(false), duration);
  }, [cart.length]);

  return (
    (showToast && <ToastContainer itemUnavailable={itemUnavailable}>{message}</ToastContainer>) ||
    null
  );
};
export default Toast;
