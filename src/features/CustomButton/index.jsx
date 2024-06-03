import React from 'react'

const CustomButton = ({
	title,
	customStyles,
	handleClick,
	image,
	imagePosition,
}) => {
	const buttonClasses = `flex text-[#201f21] bg-[#b247f5] items-center px-[24px] py-[11px] flex-1 rounded-md  ${customStyles}`
	const textClasses = imagePosition === 'right' ? 'mr-2.5' : 'ml-2.5'
	const imageClasses = imagePosition === 'right' ? 'ml-2.5' : 'mr-2.5'

	return (
		<button className={buttonClasses} onClick={handleClick}>
			{image && imagePosition === 'left' && (
				<img
					width={45}
					src={image}
					alt='Button Image'
					className={imageClasses}
				/>
			)}
			<span className={textClasses}>{title}</span>
			{image && imagePosition === 'right' && (
				<img
					width={45}
					src={image}
					alt='Button Image'
					className={imageClasses}
				/>
			)}
		</button>
	)
}

export default CustomButton
