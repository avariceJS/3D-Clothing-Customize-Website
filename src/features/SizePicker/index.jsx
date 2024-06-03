import React, { useState } from 'react'

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

const SizePicker = ({ readFile, tabWidth }) => {
	const [activeButton, setActiveButton] = useState(null)

	const handleButtonClick = name => {
		setActiveButton(name === activeButton ? null : name)
		readFile(name)
	}

	const modalWidth = tabWidth * 0.9

	return (
		<div className='filepicker-container' style={{ width: `${modalWidth}px` }}>
			<div className='grid grid-cols-4 gap-4'>
				{sizes.map((size, index) => (
					<div key={index} className='flex justify-between w-24 h-14'>
						<button
							className={`
                                text-xs w-full h-full flex items-center mr-5 justify-center border border-gray-300 rounded
                                ${
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
