import { Product } from "../types/Product";

export async function getProductById(id: string): Promise<Product> {
	const url = process.env.REACT_APP_API_URL + `/api/v1/products/${id}`;
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (error) {
		throw new Error(`Failed to fetch product by id ${id} ` + error);
	}
}