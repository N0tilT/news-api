import React from 'react';
import { useDispatch } from 'react-redux';
import type { Product } from '../features/cart/types';
import { addItem } from '../features/cart/cartSlice';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <button
                    onClick={() => dispatch(addItem(product))}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductItem;