import { Product } from './Product';

export type Category = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	products: Product[];
	description: string;
}