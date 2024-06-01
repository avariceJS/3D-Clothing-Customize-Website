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

const SizePicker = ({ file, setFile, readFile }) => {
	const [activeButton, setActiveButton] = useState(null)
	const [hoveredButton, setHoveredButton] = useState(null)

	const handleButtonClick = name => {
		setActiveButton(name)
		readFile(name)
	}

	const handleButtonHover = name => {
		setHoveredButton(name)
	}

	const rows = []
	for (let i = 0; i < sizes.length; i += 4) {
		rows.push(sizes.slice(i, i + 4))
	}

	return (
		<div className='filepicker-container'>
			{rows.map((row, index) => (
				<div key={index} className='flex justify-between mb-4 h-16 w-96'>
					{row.map((size, idx) => (
						<button
							key={idx}
							className={`
                text-xs mr-7 h-full w-20 flex items-center justify-center border border-gray-300 rounded
                ${hoveredButton === size.name ? ' border-blue-600' : ''} ${activeButton === size.name
									? 'border-red-400 text-red-500'
									: ''} 
              `}
							onClick={() => handleButtonClick(size.name)}
							onMouseEnter={() => handleButtonHover(size.name)}
							onMouseLeave={() => setHoveredButton(null)}
						>
							{size.name} ({size.range})
						</button>
					))}
				</div>
			))}
		</div>
	)
}

export default SizePicker
