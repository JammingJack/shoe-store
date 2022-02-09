export default function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      const { sku, id } = action;
      const itemInCart = state.find((i) => i.sku === sku);
      if (itemInCart)
        return state.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      else return [...state, { id, sku, quantity: 1 }];
    case "update": {
      const { quantity, sku } = action;
      return quantity === 0
        ? state.filter((item) => item.sku !== sku)
        : state.map((item) =>
            item.sku === sku ? { ...item, quantity: quantity } : item
          );
    }
    case "empty":
      return [];
    default:
      throw Error("undefined action " + action.type);
  }
}
