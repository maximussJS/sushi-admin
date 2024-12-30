import { Category } from "../types/Category";

export async function getCategories(): Promise<Category[]> {
	const url = process.env.REACT_APP_API_URL + "/api/v1/categories";
	try {
		const response = await fetch(url);
		return await response.json();
	} catch (error) {
		throw new Error("Failed to fetch categories: " + error);
	}
}