import Chip from "@mui/material/Chip";
import { Category as CategoryItem } from '../types/Category'

type CategoryProps = {
	category: CategoryItem;
	selectedCategoryId: string | null;
	onClick: () => void;
}

export default function Category(props: CategoryProps) {
	const { onClick, category, selectedCategoryId } = props;
	return <Chip
		onClick={onClick}
		size="medium"
		label={category.name}
		sx={selectedCategoryId === category.id ? { backgroundColor: 'primary.main' } : {
			backgroundColor: 'transparent',
			border: 'none',
		}}
	/>
}