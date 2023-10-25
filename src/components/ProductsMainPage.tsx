import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsRequest, productsSuccess } from '../redux/slices/products/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import { Link } from 'react-router-dom';
import Categories from './Categories';


export default function ProductsMainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const products = state.products;
  const cartItems = state.cart.cartItems;

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    dispatch(productsRequest());

    try {
      const res = await api.get('/mock/e-commerce/products.json');
      dispatch(productsSuccess(res.data));
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="bg-white">
      <Categories />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {products.isLoading && <h3>Loading products...</h3>}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products.items.map((product) => (
            <div className="group" key={product.id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img src={product.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <Link to={`products/${product.id}`}>
                <button className="mt-1 text-lg font-medium text-gray-900">More details</button>
              </Link>
              
              <button onClick={() => dispatch(addToCart(product))   }  className="mt-1 text-lg font-medium text-gray-900">Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}