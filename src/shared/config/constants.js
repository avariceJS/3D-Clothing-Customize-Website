import {
	fileIcon,
	logoShirt,
	sizeShirts,
	stylishShirt,
	swatch,
} from '@/public/index.js'

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
