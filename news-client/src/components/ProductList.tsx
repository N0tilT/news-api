import React from 'react';
import ProductItem from './ProductItem';
import type { Product } from '../features/cart/types';

const ProductList: React.FC = () => {
    // Статичные данные товаров (в реальном проекте загружались бы с API)
    const products: Product[] = [
        {
            id: 1,
            name: 'Ноутбук',
            price: 999.99,
            description: 'Мощный игровой ноутбук',
        },
        {
            id: 2,
            name: 'Смартфон',
            price: 699.99,
            description: 'Флагманский смартфон',
        },
        {
            id: 3,
            name: 'Наушники',
            price: 199.99,
            description: 'Беспроводные наушники с шумоподавлением',
        },
        {
            id: 4,
            name: 'Планшет',
            price: 499.99,
            description: '10-дюймовый планшет',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <h2 className="text-2xl font-bold col-span-full">Товары</h2>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;