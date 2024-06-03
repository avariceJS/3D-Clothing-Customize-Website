import {
	fileIcon,
	logoShirt,
	sizeShirts,
	stylishShirt,
	swatch,
	boxerIcons, pantsIcons, socksIcons, shirtIcons
} from '@/public/index.js'

export const СlothesСhoice = [
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
		icon: shirtIcons
	},
]

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
