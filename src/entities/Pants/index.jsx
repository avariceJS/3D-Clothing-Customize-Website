// Base
import React, { useMemo, useState } from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

//Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { pantsModel } from '@/public'

// Initial coordinates
const initialPantsLogoPosition = { x: -0.185, y: 0.8 }
const initialBackLogoPosition = { x: 0.12, y: 0.8 }

const Pants = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the socks
	const { nodes, materials } = useGLTF(pantsModel)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	const [pantsLogoPosition, setPantsLogoPosition] = useState(
		initialPantsLogoPosition
	)

	const handlePointerDown = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setPantsLogoPosition(prevPosition => ({
				x: prevPosition.x + movementX * 0.0025,
				y: prevPosition.y - movementY * 0.0025,
			}))
		}

		const handlePointerUp = () => {
			document.removeEventListener('mousemove', handlePointerMove)
			document.removeEventListener('mouseup', handlePointerUp)
		}

		document.addEventListener('mousemove', handlePointerMove)
		document.addEventListener('mouseup', handlePointerUp)
	}

	const [backLogoPosition, setBackLogoPosition] = useState(
		initialBackLogoPosition
	)
	
	const handlePointerDownBack = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setBackLogoPosition(prevPosition => ({
				x: prevPosition.x - movementX * 0.0025,
				y: prevPosition.y - movementY * 0.0025,
			}))
		}

		const handlePointerUp = () => {
			document.removeEventListener('mousemove', handlePointerMove)
			document.removeEventListener('mouseup', handlePointerUp)
		}

		document.addEventListener('mousemove', handlePointerMove)
		document.addEventListener('mouseup', handlePointerUp)
	}

	const getSizeScale = size => {
		const sizeMap = {
			XXS: 0.24,
			XS: 0.25,
			S: 0.26,
			M: 0.27,
			L: 0.28,
			XL: 0.29,
			XXL: 0.3,
			'3XL': 0.31,
			'4XL': 0.32,
			'5XL': 0.33,
			'6XL': 0.34,
			'7XL': 0.35,
		}
		return sizeMap[size] || 1.0
	}

	const sizeScale = useMemo(
		() => getSizeScale(snap.currentSize),
		[snap.currentSize]
	)

	const rotation = snap.currentRotate ? [0, -3.14, 0] : [0, 0, 0]

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.defaultMaterial.geometry}
				material={materials.lambert1}
				rotation={rotation}
				position={[0.01, -0.13, 0]}
				material-roughness={1}
				scale={[sizeScale, sizeScale, sizeScale]}
				dispose={null}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0.04, 0.01, 0.2]}
						rotation={[0, 0, 0]}
						scale={2.1}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[pantsLogoPosition.x, pantsLogoPosition.y, 0.2]}
						rotation={[0, 0, 0]}
						scale={0.2}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={handlePointerDown}
					/>
				)}
				{snap.isBackLogoTexture && (
					<Decal
						position={[backLogoPosition.x, backLogoPosition.y, -0.145]}
						rotation={[0, Math.PI, 0]}
						scale={0.2}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={handlePointerDownBack}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Pants
