import Grid from "@mui/material/Grid2";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Product as ProductItem } from "../types/Product";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../utils/getProductImageUrl";

const StyledButton = styled(Button)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const StyledCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: 0,
	height: '100%',
	backgroundColor: (theme.vars || theme).palette.background.paper,
	'&:hover': {
		backgroundColor: 'transparent',
		cursor: 'pointer',
	},
	'&:focus-visible': {
		outline: '3px solid',
		outlineColor: 'hsla(210, 98%, 48%, 0.5)',
		outlineOffset: '2px',
	},
}));


const StyledTypography = styled(Typography)({
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	WebkitLineClamp: 2,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

const StyledCardContent = styled(CardContent)({
	display: 'flex',
	flexDirection: 'column',
	gap: 4,
	padding: 16,
	flexGrow: 1,
	'&:last-child': {
		paddingBottom: 16,
	},
});

type ProductProps = {
	key: number;
	handleFocus: (index: number) => void;
	handleBlur: () => void;
	focusedCardIndex: number | null;
	product: ProductItem
}

export default function Product(props: ProductProps) {
	const { handleFocus, handleBlur, focusedCardIndex, product, key } = props;

	return (
		<Grid size={{ xs: 12, md: 4 }}>
			<StyledCard
				variant="outlined"
				onFocus={() => handleFocus(key)}
				onBlur={handleBlur}
				tabIndex={0}
				className={focusedCardIndex === key ? 'Mui-focused' : ''}
				sx={{ height: '100%' }}
			>
				<CardMedia
					component="img"
					alt="green iguana"
					image={getProductImageUrl(product)}
					sx={{
						height: { sm: 'auto', md: '50%' },
						aspectRatio: { sm: '16 / 9', md: '' },
					}}
				/>
				<StyledCardContent>
					<Typography gutterBottom variant="caption" component="div">
						{product.price} UAH
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{product.name}
					</Typography>
					<StyledTypography variant="body2" color="text.secondary" gutterBottom>
						{product.description}
					</StyledTypography>
				</StyledCardContent>
				<CardActions>
					<Button fullWidth
					        variant="contained" component={Link} to={`/product/${product.id}/page`}> View</Button>
				</CardActions>
			</StyledCard>
		</Grid>
	);
}