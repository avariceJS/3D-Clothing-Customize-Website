// Base
import React, { useState } from 'react'

// State
import state from '@/shared/config/store'

// Array of size options
const sizes = [
	{ name: 'XXS', range: '40-42' },
	{ name: 'XS', range: '44-46' },
	{ name: 'S', range: '48' },
	{ name: 'M', range: '50' },
	{ name: 'L', range: '52' },
	{ name: 'XL', range: '54' },
	{ name: 'XXL', range: '56-58' },
	{ name: '3XL', range: '60-62' },
	{ name: '4XL', range: '64-66' },
	{ name: '5XL', range: '68-70' },
	{ name: '6XL', range: '72-74' },
	{ name: '7XL', range: '76-78' },
]

const SizePicker = ({ tabWidth }) => {
	const [activeButton, setActiveButton] = useState(state.currentSize)

	// Handle button click to select size
	const handleButtonClick = name => {
		setActiveButton(name === activeButton ? null : name)
		state.currentSize = name
	}

	// Calculate modal width based on tab width
	const modalWidth = tabWidth * 0.9

	// Calculate button width based on tab width
	const buttonWidth = tabWidth * 0.25

	return (
		<div className='filepicker-container' style={{ width: `${modalWidth}px` }}>
			<div className='grid grid-cols-4 gap-4'>
				{sizes.map((size, index) => (
					<div
						key={index}
						className='flex justify-between h-14'
						style={{ width: tabWidth > 373 ? '96px' : `${buttonWidth}px` }}
					>
						<button
							className={`text-xs w-full h-full flex items-center mr-5 justify-center border border-gray-300 rounded ${
								activeButton === size.name
									? 'border-red-400 text-red-500'
									: 'hover:border-blue-600'
							}
                            `}
							onClick={() => handleButtonClick(size.name)}
						>
							<div className='flex flex-col items-center justify-center'>
								<span className='text-base'>{size.name}</span>
								<sub className='text-xs'>({size.range})</sub>
							</div>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default SizePicker
