type ProductImage = {
	id: string;
	productId: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	images?: ProductImage[];
	categoryId: string;
	createdAt: string;
	updatedAt: string;
}