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
const initialPositions = {
	leftFront: { x: 0.1367, y: 0.182 },
	leftBack: { x: 0.1367, y: 0.182 },
	rightFront: { x: -0.021, y: 0.182 },
	rightBack: { x: -0.021, y: 0.182 },
}

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

	const [logoPositions, setLogoPositions] = useState(initialPositions)

	const handlePointerDown = (e, positionKey, isBack) => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setLogoPositions(prevPositions => ({
				...prevPositions,
				[positionKey]: {
					x:
						prevPositions[positionKey].x +
						(isBack ? -movementX : movementX) * 0.001,
					y: prevPositions[positionKey].y - movementY * 0.001,
				},
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

	const rotation = snap.currentRotate ? [0, -3.1, 0] : [0, 0.07, 0]
	const position = snap.currentRotate ? [0.195, -0.45, 0] : [0.095, -0.45, 0]

	const renderSock = (geometry, positionKeyFront, positionKeyBack) => (
		<mesh
			geometry={geometry}
			material={materials.lambert1}
			material-roughness={1}
			position={position}
			scale={[sizeScale, sizeScale, sizeScale]}
			dispose={null}
			rotation={rotation}
		>
			<meshStandardMaterial color={snap.color} />
			{snap.isFullTexture && (
				<Decal
					position={[logoPositions[positionKeyFront].x, 0.098, 0]}
					rotation={[0, 0, 0]}
					scale={0.388}
					map={fullTexture}
				/>
			)}
			{snap.isLogoTexture && (
				<Decal
					position={[
						logoPositions[positionKeyFront].x,
						logoPositions[positionKeyFront].y,
						0,
					]}
					rotation={[0, 0, 0]}
					scale={0.06}
					map={logoTexture}
					depthTest={false}
					depthWrite={true}
					onPointerDown={e => handlePointerDown(e, positionKeyFront, false)}
				/>
			)}
			{snap.isBackLogoTexture && (
				<Decal
					position={[
						logoPositions[positionKeyBack].x,
						logoPositions[positionKeyBack].y,
						-0.07,
					]}
					rotation={[0, Math.PI, 0]}
					scale={0.06}
					map={logoTexture}
					depthTest={false}
					depthWrite={true}
					onPointerDown={e => handlePointerDown(e, positionKeyBack, true)}
				/>
			)}
		</mesh>
	)

	return (
		<group key={stateString}>
			{renderSock(
				nodes['sock-left-b_medias_0'].geometry,
				'leftFront',
				'leftBack'
			)}
			{renderSock(
				nodes['sock-right-b_medias001_0'].geometry,
				'rightFront',
				'rightBack'
			)}
		</group>
	)
}

export default Socks
