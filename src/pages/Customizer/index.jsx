// Base
import React, { useState } from 'react'

// Animations
import { AnimatePresence, motion } from 'framer-motion'

// State
import { useSnapshot } from 'valtio'

// Features
import ColorSelector from '@/features/ColorSelector'
import CustomButton from '@/features/CustomButton'
import ImageFileSelector from '@/features/ImageFileSelector'
import SizePicker from '@/features/SizePicker'
import Tab from '@/features/Tab'

// Shared -> Config; Libs
import state from '@/shared/config/store'
import { fadeAnimation, slideAnimation } from '@/shared/config/motion'
import { reader } from '@/shared/libs/helpers'
import {
	DecalTypes,
	EditorTabs,
	FilterTabs,
	ClothesChoice,
} from '@/shared/config/constants'

// Widgets
import ProductDisplay from '@/widgets/ProductDisplay'

// Icons
import { leftArrowIcon } from '@/public'

const Customizer = () => {
	const snap = useSnapshot(state)
	const [tabWidth, setTabWidth] = useState(388)
	const [file, setFile] = useState('')
	const [prompt, setPrompt] = useState('')
	const [generatingImg, setGeneratingImg] = useState(false)
	const [activeEditorTab, setActiveEditorTab] = useState('')
	const [activeFilterTab, setActiveFilterTab] = useState({
		logoShirt: true,
		backLogo: false,
		stylishShirt: false,
	})

	// Handle editor tab click
	const handleClickEditorTab = tabName => {
		if (activeEditorTab === tabName) {
			setActiveEditorTab('')
		} else {
			setActiveEditorTab(tabName)
		}
	}

	// Handle mouse movement to resize the tab width
	const handleMouseMove = e => {
		const newWidth = e.clientX
		if (newWidth >= 280 && newWidth <= 640) {
			setTabWidth(newWidth)
		} else if (newWidth < 280) {
			setTabWidth(280)
		} else if (newWidth > 640) {
			setTabWidth(640)
		}
	}

	// Remove event listeners and allow text selection again
	const handleMouseUp = () => {
		document.body.classList.remove('no-select')
		window.removeEventListener('mousemove', handleMouseMove)
		window.removeEventListener('mouseup', handleMouseUp)
	}

	// Add event listeners and prevent text selection
	const handleMouseDown = () => {
		document.body.classList.add('no-select')
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
	}

	// Generate content based on the active editor tab
	const generateTabContent = () => {
		switch (activeEditorTab) {
			case 'colorpicker':
				return <ColorSelector />
			case 'filepicker':
				return (
					<ImageFileSelector
						file={file}
						setFile={setFile}
						readFile={readFile}
						tabWidth={tabWidth}
					/>
				)
			case 'sizepicker':
				return (
					<SizePicker
						prompt={prompt}
						setPrompt={setPrompt}
						generatingImg={generatingImg}
						handleSubmit={handleSubmit}
						tabWidth={tabWidth}
					/>
				)
			default:
				return null
		}
	}

	// Handle form submission to generate an image
	const handleSubmit = async type => {
		if (!prompt) return alert('Please enter a prompt')

		try {
			setGeneratingImg(true)

			const response = await fetch('http://localhost:8080/api/v1/dalle', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt,
				}),
			})

			const data = await response.json()

			handleDecals(type, `data:image/png;base64,${data.photo}`)
		} catch (error) {
			alert(error)
		} finally {
			setGeneratingImg(false)
			setActiveEditorTab('')
		}
	}

	// Handle decal application
	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type]

		state[decalType.stateProperty] = result

		if (!activeFilterTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab)
		}
	}

	// Handle active filter tab toggle
	const handleActiveFilterTab = tabName => {
		switch (tabName) {
			case 'logoShirt':
				state.isLogoTexture = !activeFilterTab[tabName]
				break
			case 'backLogo':
				state.isBackLogoTexture = !activeFilterTab[tabName]
				break
			case 'rotation':
				state.currentRotate = !snap.currentRotate
				break
			case 'stylishShirt':
				state.isFullTexture = !activeFilterTab[tabName]
				break
			default:
				state.isLogoTexture = true
				state.isBackLogoTexture = false
				state.isFullTexture = false
				break
		}

		setActiveFilterTab(prevState => {
			return {
				...prevState,
				[tabName]: !prevState[tabName],
			}
		})
	}

	// Handle file reading
	const readFile = type => {
		reader(file).then(result => {
			handleDecals(type, result)
			setActiveEditorTab('')
		})
	}

	// Handle clothing choice
	const handleClothingChoice = clothing => {
		localStorage.setItem('currentClothing', clothing)
		state.currentClothing = clothing
		window.location.reload()
	}

	const handleRotate = () => {
		state.currentRotate = !snap.currentRotate
	}
	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key='custom'
						className='absolute top-0 left-0 z-10'
						style={{ width: `${tabWidth}px` }}
						{...slideAnimation('left')}
					>
						<div className='min-h-screen bg-gray-500 relative'>
							<div
								className='editortabs-container'
								style={{ width: `${tabWidth}px` }}
							>
								{EditorTabs.map(tab => (
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() => handleClickEditorTab(tab.name)}
									/>
								))}
								{generateTabContent()}
							</div>
							{/* Resizer element */}
							<div className='resizer' onMouseDown={handleMouseDown}></div>
						</div>
					</motion.div>

					<motion.div
						className='absolute z-10 top-5 right-5'
						{...fadeAnimation}
					>
						<CustomButton
							image={leftArrowIcon}
							type='filled'
							title='Назад'
							imagePosition='left'
							handleClick={() => (state.intro = true)}
							customStyles='w-fit px-12 py-2.5 font-bold text-lg'
						/>
					</motion.div>

					<motion.div
						className='filtertabs-container'
						{...slideAnimation('up')}
					>
						{FilterTabs.map(tab => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilterTab
								isActiveTab={activeFilterTab[tab.name]}
								handleClick={() => handleActiveFilterTab(tab.name)}
							/>
						))}
					</motion.div>

					<motion.div
						className='clothestabs-container'
						{...slideAnimation('up')}
					>
						{ClothesChoice.map(tab => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilterTab
								isActiveTab={activeFilterTab[tab.name]}
								handleClick={() => handleClothingChoice(tab.name)}
							/>
						))}
					</motion.div>
					<ProductDisplay currentClothing={snap.currentClothing} />
				</>
			)}
		</AnimatePresence>
	)
}

export default Customizer
