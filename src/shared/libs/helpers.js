// Function to download the current canvas content as an image
export const downloadCanvasToImage = () => {
	const canvas = document.querySelector('canvas')

	if (!canvas) {
		console.error('No canvas element found')
		return
	}

	const dataURL = canvas.toDataURL()
	const link = document.createElement('a')

	link.href = dataURL
	link.download = 'canvas.png'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

// Function to read a file and return its data URL
export const reader = file =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader()

		fileReader.onload = () => resolve(fileReader.result)
		fileReader.onerror = () => reject(new Error('Error reading file'))
		fileReader.readAsDataURL(file)
	})

// Function to get a contrasting color (black or white) based on the input color's brightness
export const getContrastingColor = color => {
	const hex = color.replace('#', '')

	if (hex.length !== 6) {
		throw new Error('Invalid hex color')
	}

	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)

	const brightness = (r * 299 + g * 587 + b * 114) / 1000

	return brightness > 128 ? 'black' : 'white'
}
