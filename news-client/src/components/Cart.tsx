import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { CartItem } from '../features/cart/types';
import { removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const { items, total } = useSelector((state: RootState) => state.cart);

    const handleQuantityChange = (item: CartItem, quantity: number) => {
        dispatch(updateQuantity({ id: item.id, quantity }));
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Корзина</h2>
                {items.length > 0 && (
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="text-red-600 hover:text-red-800"
                    >
                        Очистить корзину
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <p className="text-gray-500">Корзина пуста</p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200">
                        {items.map(item => (
                            <li key={item.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border rounded">
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>

                                    <button
                                        onClick={() => dispatch(removeItem(item.id))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 pt-4 border-t border-gray-300">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Итого:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
                            Оформить заказ
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;