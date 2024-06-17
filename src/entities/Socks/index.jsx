// Base
import React, { useMemo, useState } from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { socksModel } from '@/public'

// Initial coordinates
const initialLeftSockLogoPosition = { x: 0.1367, y: 0.182 }
const initialRightSockLogoPosition = { x: -0.021, y: 0.182 }

const Socks = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the socks
	const { nodes, materials } = useGLTF(socksModel)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	const [leftSockLogoPosition, setLeftSockLogoPosition] = useState(
		initialLeftSockLogoPosition
	)
	const [rightSockLogoPosition, setRightSockLogoPosition] = useState(
		initialRightSockLogoPosition
	)

	const handlePointerDown = (e, setPosition) => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setPosition(prevPosition => ({
				x: prevPosition.x + movementX * 0.001,
				y: prevPosition.y - movementY * 0.001,
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
			XXS: 0.75,
			XS: 0.8,
			S: 0.85,
			M: 0.9,
			L: 0.95,
			XL: 1,
			XXL: 1.05,
			'3XL': 1.1,
			'4XL': 1.15,
			'5XL': 1.2,
			'6XL': 1.25,
			'7XL': 1.3,
		}
		return sizeMap[size] || 1.0
	}

	const sizeScale = useMemo(
		() => getSizeScale(snap.currentSize),
		[snap.currentSize]
	)

	return (
		<group key={stateString}>
			{/* Left sock */}
			<mesh
				geometry={nodes['sock-left-b_medias_0'].geometry}
				material={materials.lambert1}
				material-roughness={1}
				scale={[sizeScale, sizeScale, sizeScale]}
				position={[0.02, -0.4, 0]}
				dispose={null}
				rotation={[0, 0.05, 0]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0.134, 0.098, 0]}
						rotation={[0, 0, 0]}
						scale={0.388}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[leftSockLogoPosition.x, leftSockLogoPosition.y, 0]}
						rotation={[0, 0, 0]}
						scale={0.06}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={e => handlePointerDown(e, setLeftSockLogoPosition)}
					/>
				)}
			</mesh>
			{/* Right sock */}
			<mesh
				geometry={nodes['sock-right-b_medias001_0'].geometry}
				material={materials.lambert1}
				material-roughness={1}
				position={[0.02, -0.4, 0]}
				scale={[sizeScale, sizeScale, sizeScale]}
				dispose={null}
				rotation={[0, 0.05, 0]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[-0.021, 0.098, 0]}
						rotation={[0, 0, 0]}
						scale={0.388}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[rightSockLogoPosition.x, rightSockLogoPosition.y, 0]}
						rotation={[0, 0, 0]}
						scale={0.06}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						onPointerDown={e => handlePointerDown(e, setRightSockLogoPosition)}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Socks
