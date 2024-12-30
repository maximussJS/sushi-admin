import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Box,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Button,
	TextField,
	CircularProgress,
	Snackbar,
	Alert
} from '@mui/material';
import { Product } from '../types/Product';
import { getProductById } from "../api/getProductById";
import { updateProductById } from "../api/updateProductById"; // We'll create this API function
import { getProductImageUrl } from "../utils/getProductImageUrl";
import AppAppBar from "../components/AppNavBar";
import Footer from "../components/Footer";
import AppTheme from '../theme/AppTheme';
import Container from "@mui/material/Container";

export default function ProductDetail(props: { disableCustomTheme?: boolean }) {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedName, setEditedName] = useState<string>('');
	const [editedDescription, setEditedDescription] = useState<string>('');
	const [editedCategoryId, setEditedCategoryId] = useState<string>('');
	const [editedPrice, setEditedPrice] = useState<number>(0);
	const [saving, setSaving] = useState<boolean>(false);

	const [successMessage, setSuccessMessage] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		if (!id) {
			setError('No product ID provided.');
			setLoading(false);
			return;
		}

		getProductById(id)
		.then((fetchedProduct) => {
			setProduct(fetchedProduct);
			setEditedName(fetchedProduct.name);
			setEditedDescription(fetchedProduct.description);
			setEditedCategoryId(fetchedProduct.categoryId);
			setEditedPrice(fetchedProduct.price);
			setLoading(false);
		})
		.catch((err) => {
			console.error(err);
			setError('Failed to fetch product details.');
			setLoading(false);
		});
	}, [id]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		if (product) {
			setEditedName(product.name);
			setEditedDescription(product.description);
			setEditedCategoryId(product.categoryId);
			setEditedPrice(product.price)
		}
		setIsEditing(false);
		setErrorMessage('');
		setSuccessMessage('');
	};

	const handleSave = async () => {
		if (!product) return;

		const dataToUpdate: {
			name?: string;
			description?: string;
			categoryId?: string;
			price?: number;
		} = {}

		if (editedName !== product.name) {
			dataToUpdate.name = editedName;
		}

		if (editedDescription !== product.description) {
			dataToUpdate.description = editedDescription
		}

		if (editedCategoryId !== product.categoryId) {
			dataToUpdate.categoryId = editedCategoryId;
		}

		if (editedPrice !== product.price) {
			dataToUpdate.price = editedPrice;
		}

		setSaving(true);
		try {
			const updatedProduct = await updateProductById(product.id, dataToUpdate);
			setProduct(updatedProduct);
			setIsEditing(false);
			setSuccessMessage('Product updated successfully!');
		} catch (err) {
			console.error(err);
			setErrorMessage('Failed to update product. Please try again.');
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<Box sx={{ p: 4 }}>
				<Typography>Loading...</Typography>
			</Box>
		);
	}

	if (error || !product) {
		return (
			<Box sx={{ p: 4 }}>
				<Typography color="error">{error || 'Product not found.'}</Typography>
				<Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
					Go Back
				</Button>
			</Box>
		);
	}

	return (
		<AppTheme {...props}>
			<AppAppBar />
			<Container
				maxWidth="lg"
				component="main"
				sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
			>
				<Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
					<Card sx={{ maxWidth: 600, width: '100%' }}>
						<CardMedia
							component="img"
							height="300"
							image={getProductImageUrl(product)}
							alt={product.name}
						/>
						<CardContent>
							{isEditing ? (

								<TextField
									label="Product Price"
									variant="outlined"
									fullWidth
									value={editedPrice}
									onChange={(e) => setEditedPrice(Number(e.target.value))}
									sx={{ mt: 2 }}
								/>
							) : (
								<Typography variant="caption" component="div">
									{product.price} UAH
								</Typography>
							)}

							{
								isEditing ? (
									<TextField
										label="Category ID"
										variant="outlined"
										fullWidth
										value={editedCategoryId}
										onChange={(e) => setEditedCategoryId(e.target.value)}
										sx={{ mt: 2 }}
									/>
								) : (
									<Typography variant="caption" component="div">
										{product.categoryId}
									</Typography>
								)}

							{isEditing ? (
								<TextField
									label="Product Name"
									variant="outlined"
									fullWidth
									value={editedName}
									onChange={(e) => setEditedName(e.target.value)}
									sx={{ mt: 2 }}
								/>
							) : (
								<Typography variant="h4" component="div">
									{product.name}
								</Typography>
							)}

							{isEditing ? (
								<TextField
									label="Product Description"
									variant="outlined"
									fullWidth
									multiline
									minRows={3}
									value={editedDescription}
									onChange={(e) => setEditedDescription(e.target.value)}
									sx={{ mt: 2 }}
								/>
							) : (
								<Typography variant="body1" sx={{ mt: 2 }}>
									{product.description}
								</Typography>
							)}
						</CardContent>

						<Box sx={{ textAlign: 'right', p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
							{isEditing ? (
								<>
									<Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
										{saving ? <CircularProgress size={24} /> : 'Save'}
									</Button>
									<Button variant="outlined" color="secondary" onClick={handleCancelEdit} disabled={saving}>
										Cancel
									</Button>
								</>
							) : (
								<>
									<Button variant="contained" color="primary" onClick={handleEdit}>
										Edit
									</Button>
									<Button variant="contained" onClick={handleBack}>
										Back
									</Button>
								</>
							)}
						</Box>
					</Card>
				</Box>
			</Container>

			{/* Feedback Messages */}
			<Snackbar
				open={!!successMessage}
				autoHideDuration={6000}
				onClose={() => setSuccessMessage('')}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
					{successMessage}
				</Alert>
			</Snackbar>

			<Snackbar
				open={!!errorMessage}
				autoHideDuration={6000}
				onClose={() => setErrorMessage('')}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
					{errorMessage}
				</Alert>
			</Snackbar>

			<Footer />
		</AppTheme>
	);
};
