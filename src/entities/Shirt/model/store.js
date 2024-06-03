import { proxy } from 'valtio'

const state = proxy({
	intro: true,
	color: '#8f24d1',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: '/src/public/image/markformelle.png',
	fullDecal: '/src/public/image/markformelle.png',
	currentClothing: localStorage.getItem('currentClothing') || 'shirt',
})

export default state
