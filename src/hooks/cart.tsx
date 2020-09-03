import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const cartProductsStorage = await AsyncStorage.getItem(
        '@GoMarketPlace:Cart',
      );
      if (cartProductsStorage != null) {
        const productsCart: Product[] = JSON.parse(cartProductsStorage);
        setProducts(() => [...productsCart]);
      } else {
        setProducts([]);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function updateStorage(): Promise<void> {
      await AsyncStorage.setItem(
        '@GoMarketPlace:Cart',
        JSON.stringify(products),
      );
    }
    updateStorage();
  }, [products]);

  const addToCart = useCallback(
    async ({ id, image_url, price, title }: Omit<Product, 'quantity'>) => {
      const productCartItem = products
        .map(productCart => productCart.id)
        .indexOf(id);

      const productsCart = products;

      if (productCartItem !== -1) {
        productsCart[productCartItem].quantity += 1;
      } else {
        productsCart.push({ id, image_url, price, title, quantity: 1 });
      }
      setProducts(() => [...productsCart]);
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const productsCart = products;
      const productCartItem = products
        .map(productCart => productCart.id)
        .indexOf(id);
      if (productCartItem !== -1) {
        productsCart[productCartItem].quantity += 1;
      }
      setProducts(() => [...productsCart]);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      let productsCart = products;
      const productCartItem = products
        .map(productCart => productCart.id)
        .indexOf(id);
      if (productCartItem !== -1) {
        productsCart[productCartItem].quantity -= 1;
        if (productsCart[productCartItem].quantity <= 0) {
          productsCart = products.filter(product => product.id !== id);
          setProducts([]);
        }
      }
      setProducts(() => [...productsCart]);
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
