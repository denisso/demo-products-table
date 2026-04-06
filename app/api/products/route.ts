import { createRoute } from '../create-route';

const fetchProducts = async (token: string) => {
  return fetch('https://dummyjson.com/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const GET = createRoute(fetchProducts);
