// Icons
import {
	fileIcon,
	logoShirt,
	sizeShirts,
	stylishShirt,
	swatch,
	boxerIcons,
	pantsIcons,
	socksIcons,
	shirtIcons,
} from '@/public/index.js'

// Array representing different types of clothing and their icons
export const ClothesChoice = [
	{
		name: 'underpants',
		icon: boxerIcons,
	},
	{
		name: 'pants',
		icon: pantsIcons,
	},
	{
		name: 'socks',
		icon: socksIcons,
	},
	{
		name: 'shirt',
		icon: shirtIcons,
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
		icon: fileIcon,
	},
	{
		name: 'sizepicker',
		icon: sizeShirts,
	},
]

// Array representing filter tabs and their icons
export const FilterTabs = [
	{
		name: 'logoShirt',
		icon: logoShirt,
	},
	{
		name: 'stylishShirt',
		icon: stylishShirt,
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
