// import { createContext, useReducer, useState } from "react";

// const CartContext = createContext({
//   items: [],
//   addItem: (item) => {},
//   removeItem: (id) => {},
// });

// function cartReducer(state, action) {
//   //state helps to return updated state and action helps to know how to return that state
//   if (action.type === "ADD_ITEM") {
//     //.. update the state to add the item

//     //item.id is the id we are looking for in the items id and action.item.id is the id that we receive from component as an action
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.item.id
//     );

//     //updatedItems will contain all the old items because we are using spread operator
//     const updatedItems = [...state.items];

//     //existingCartItemIndex will return -1 as index if does not find an item in items array
//     //the below if condition means that item already exists in that case we have to update a quantity property
//     if (existingCartItemIndex > -1) {
//       const existingItem = state.items[existingCartItemIndex];
//       const updatedItem = {
//         ...existingItem,
//         quantity: existingItem.quantity + 1,
//       };
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       //THE ELSE CONDITION IS USED TO ADD AN ITEM TO ARRAY
//       updatedItems.push({ ...action.item, quantity: 1 });
//     }

//     //NOT A GOOD IDEA WE DON'T WANT TO ADD AN ITEM MULTIPLE TIME
//     // state.items.push(action.item);

//     return { ...state, items: updatedItems };
//   }

//   if (action.type === "REMOVE_ITEM") {
//     //update the state to remove the item

//     //item.id is the id we are looking for in the items id and action.item.id is the id that we receive from component as an action
//     const existingCartItemIndex = state.items.findIndex(
//       (item) => item.id === action.id
//     );

//     const existingCartItem = state.items[existingCartItemIndex];

//     const updatedItems = [...state.items];

//     if (existingCartItem.quantity === 1) {
//       //remove the whole item
//       updatedItems.splice(existingCartItemIndex, 1);
//     } else {
//       //in this else block the quantity of the item is more than 1 so we decrease the quantity and then update the quantity
//       const updatedItem = {
//         ...existingCartItem,
//         quantity: existingCartItem.quantity - 1,
//       };
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }
//     return { ...state, items: updatedItems };
//   }

//   return state;
// }

// //data management is managed by the below function
// export function CartContextProvider({ children }) {
//   //usereducer helps to manage more complex state
//   //usereducer takes the reducer function as an input

//   const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

//   function addItem(item) {
//     dispatchCartAction({ type: "ADD_ITEM", item });
//   }

//   function removeItem(id) {
//     dispatchCartAction({ type: "REMOVE_ITEM", id });
//   }

//   //to use the cartContext we need to pass the cart context
//   const cartContext = {
//     //whenever the cart in usereducer changes then the below cart.items will be changed
//     items: cart.items,
//     addItem,
//     removeItem,
//   };

//   return (
//     <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
//   );
// }

// export default CartContext;




import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
