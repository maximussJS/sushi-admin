import { Product } from "../types/Product";

export function getProductImageUrl(product: Product) {
	return product.images
		? product.images[0].url
		: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
}