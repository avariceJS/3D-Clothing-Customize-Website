import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '@/entities/Shirt/model/store'
import ProductDisplay from '@/widgets/ProductDisplay'
import ColorSelector from '@/features/ColorSelector'
import CustomButton from '@/features/CustomButton'
import ImageFileSelector from '@/features/ImageFileSelector'
import SizePicker from '@/features/SizePicker'
import Tab from '@/features/Tab'
import { DecalTypes, EditorTabs, FilterTabs, СlothesСhoice } from '@/shared/config/constants'
import { fadeAnimation, slideAnimation } from '@/shared/config/motion'
import { reader } from '@/shared/libs/helpers'

const Customizer = () => {
    const snap = useSnapshot(state)

    const [file, setFile] = useState('')
    const [prompt, setPrompt] = useState('')
    const [generatingImg, setGeneratingImg] = useState(false)
    const [activeEditorTab, setActiveEditorTab] = useState('')
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })

    const handleClickEditorTab = (tabName) => {
        if (activeEditorTab === tabName) {
            setActiveEditorTab('');
        } else {
            setActiveEditorTab(tabName);
        }
    };

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorSelector />
            case 'filepicker':
                return <ImageFileSelector file={file} setFile={setFile} readFile={readFile} />
            case 'sizepicker':
                return (
                    <SizePicker
                        prompt={prompt}
                        setPrompt={setPrompt}
                        generatingImg={generatingImg}
                        handleSubmit={handleSubmit}
                    />
                )
            default:
                return null
        }
    }

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

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type]

        state[decalType.stateProperty] = result

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    const handleActiveFilterTab = tabName => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName]
                break
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName]
                break
            default:
                state.isLogoTexture = true
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

    const readFile = type => {
        reader(file).then(result => {
            handleDecals(type, result)
            setActiveEditorTab('')
        })
    }

    const handleClothingChoice = clothing => {
        localStorage.setItem('currentClothing', clothing)
        state.currentClothing = clothing
        window.location.reload()
    }

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key='custom'
                        className='absolute top-0 left-0 z-10'
                        {...slideAnimation('left')}
                    >
                        <div className='min-h-screen bg-gray-100'>
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map(tab => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => handleClickEditorTab(tab.name)}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className='absolute z-10 top-5 right-5'
                        {...fadeAnimation}
                    >
                        <CustomButton
                            image='/src/public/image/leftArrow.png'
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
                        {СlothesСhoice.map(tab => (
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
