import { useLayoutEffect, useState, useRef } from "react";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 30px;
  color: ${(props) => (props.itemUnavailable ? "red" : "#67a167")};
`;

const Toast = () => {
  const cart = useStoreState((state) => state.cart);
  const itemUnavailable = useStoreState((state) => state.itemUnavailable);

  const [showToast, setShowToast] = useState(false);
  const initMount = useRef(true);

  const message = itemUnavailable ? "Item Unavailable." : "Added to Cart!";
  const duration = 3000;

  useLayoutEffect(() => {
    if (initMount.current) {
      initMount.current = false;
      return;
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), duration);
  }, [cart]);

  return (
    (showToast && <ToastContainer itemUnavailable={itemUnavailable}>{message}</ToastContainer>) ||
    null
  );
};
export default Toast;
