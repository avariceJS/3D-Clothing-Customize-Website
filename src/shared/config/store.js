// State
import { proxy } from 'valtio'

// Image
import { MarkFormelle } from '@/public'

const state = proxy({
	intro: true,
	color: '#fff',
	currentSize: 'XXL',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: MarkFormelle,
	fullDecal: MarkFormelle,
	currentClothing: localStorage.getItem('currentClothing') || 'shirt',
})

export default state
