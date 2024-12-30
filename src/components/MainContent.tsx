import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Product from './Product';
import Category from './Category';
import { Product as ProductItem } from '../types/Product';
import { Category as CategoryItem } from '../types/Category';
import { getCategories } from '../api/getCategories'


export function Search() {
	return (
		<FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
			<OutlinedInput
				size="small"
				id="search"
				placeholder="Search…"
				sx={{ flexGrow: 1 }}
				startAdornment={
					<InputAdornment position="start" sx={{ color: 'text.primary' }}>
						<SearchRoundedIcon fontSize="small" />
					</InputAdornment>
				}
				inputProps={{
					'aria-label': 'search',
				}}
			/>
		</FormControl>
	);
}

export default function MainContent() {
	const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);
	const [categories, setCategories] = useState<CategoryItem[]>([]);
	const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

	// Fetch categories and extract all products
	useEffect(() => {
		getCategories().then((fetchedCategories) => {
			setCategories(fetchedCategories);

			setAllProducts(fetchedCategories.flatMap(category => category.products ?? []));
		});
	}, []);

	const handleCategoryClick = (index: number) => {
		const category = categories[index];

		if (selectedCategory && selectedCategory.id === category.id) {
			setSelectedCategory(null);
		} else {
			setSelectedCategory(category);
		}
	};

	const displayedProducts = selectedCategory
		? selectedCategory.products ?? []
		: allProducts;

	const handleFocus = (index: number) => {
		setFocusedCardIndex(index);
	};

	const handleBlur = () => {
		setFocusedCardIndex(null);
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			{/* Header Section */}
			<div>
				<Typography variant="h1" gutterBottom>
					Menu
				</Typography>
				<Typography>Select product and click on Add-To-Order button</Typography>
			</div>

			{/* Mobile Search and RSS Section */}
			<Box
				sx={{
					display: { xs: 'flex', sm: 'none' },
					flexDirection: 'row',
					gap: 1,
					width: { xs: '100%', md: 'fit-content' },
					overflow: 'auto',
				}}
			>
				<Search />
				<IconButton size="small" aria-label="RSS feed">
					<RssFeedRoundedIcon />
				</IconButton>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column-reverse', md: 'row' },
					width: '100%',
					justifyContent: 'space-between',
					alignItems: { xs: 'start', md: 'center' },
					gap: 4,
					overflow: 'auto',
				}}
			>
				<Box
					sx={{
						display: 'inline-flex',
						flexDirection: 'row',
						gap: 3,
						overflow: 'auto',
					}}
				>
					{categories.map((category, i) => (
						<Category
							key={i}
							category={category}
							selectedCategoryId={selectedCategory?.id || null}
							onClick={() => handleCategoryClick(i)}
						/>
					))}
				</Box>

				<Box
					sx={{
						display: { xs: 'none', sm: 'flex' },
						flexDirection: 'row',
						gap: 1,
						width: { xs: '100%', md: 'fit-content' },
						overflow: 'auto',
					}}
				>
					<Search />
					<IconButton size="small" aria-label="RSS feed">
						<RssFeedRoundedIcon />
					</IconButton>
				</Box>
			</Box>

			<Grid container spacing={2} columns={12}>
				{displayedProducts.map((product, index) => (
					<Product
						product={product}
						key={index}
						handleBlur={handleBlur}
						handleFocus={handleFocus}
						focusedCardIndex={focusedCardIndex}
					/>
				))}
			</Grid>
		</Box>
	);
}