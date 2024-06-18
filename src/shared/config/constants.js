// Icons
import {
	stylishShirtIcon,
	fileSelection,
	logoShirtIcon,
	backLogoIcon,
	rotationIcon,
	sizePicker,
	hoodieIcon,
	boxerIcon,
	pantsIcon,
	socksIcon,
	shirtIcon,
	swatch,
} from '@/public/index.js'

// Array representing different types of clothing and their icons
export const ClothesChoice = [
	{
		name: 'underpants',
		icon: boxerIcon,
	},
	{
		name: 'pants',
		icon: pantsIcon,
	},
	{
		name: 'socks',
		icon: socksIcon,
	},
	{
		name: 'shirt',
		icon: shirtIcon,
	},
	{
		name: 'hoodie',
		icon: hoodieIcon,
	},
]

// Array representing editor tabs and their icons
export const EditorTabs = [
	{
		name: 'colorpicker',
		icon: swatch,
	},
	{
		name: 'filepicker',
		icon: fileSelection,
	},
	{
		name: 'sizepicker',
		icon: sizePicker,
	},
]

// Array representing filter tabs and their icons
export const FilterTabs = [
	{
		name: 'logoShirt',
		icon: logoShirtIcon,
	},
	{
		name: 'stylishShirt',
		icon: stylishShirtIcon,
	},
	{
		name: 'backLogo',
		icon: backLogoIcon,
	},
	{
		name: 'rotation',
		icon: rotationIcon,
	},
]

// Object representing decal types, their associated state properties, and filter tabs
export const DecalTypes = {
	logo: {
		stateProperty: 'logoDecal',
		filterTab: 'logoShirt',
	},
	full: {
		stateProperty: 'fullDecal',
		filterTab: 'stylishShirt',
	},
}
