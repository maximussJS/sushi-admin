import { Product } from '../types/Product';

interface UpdateProductData {
	name?: string;
	description?: string;
	categoryId?: string;
	price?: number;
}

export const updateProductById = async (id: string, data: UpdateProductData): Promise<Product> => {
	const url = process.env.REACT_APP_API_URL + `/api/v1/products/${id}`;

	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error('Failed to update product');
	}

	return await response.json();
};
