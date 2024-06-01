import { proxy } from 'valtio'

const state = proxy({
	intro: true,
	color: '#EFBD48',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: '/src/public/image/markformelle.png',
	fullDecal: '/src/public/image/markformelle.png',
})

export default state
