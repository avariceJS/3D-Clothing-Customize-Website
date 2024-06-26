// Base
import React, { useMemo, useState } from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { hoodieModel } from '@/public'

// Initial coordinates
const initialHoodieLogoPosition = { x: 0.009, y: 1.42 }
const initialBackLogoPosition = { x: 0.009, y: 1.42 }

const Hoodie = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the hoodie
	const { nodes, materials } = useGLTF(hoodieModel)
	console.log(nodes)

	// Load the logo texture
	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	// Load the full texture
	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	// Convert state snapshot to string for key
	const stateString = JSON.stringify(snap)

	const [HoodieLogoPosition, setHoodieLogoPosition] = useState(
		initialHoodieLogoPosition
	)

	const handlePointerDown = e => {
		e.stopPropagation()
		const handlePointerMove = e => {
			const { movementX, movementY } = e
			setHoodieLogoPosition(prevPosition => ({
				x: prevPosition.x + movementX * 0.00085,
				y: prevPosition.y - movementY * 0.00085,
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
				x: prevPosition.x - movementX * 0.001,
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
			XXS: 0.65,
			XS: 0.67,
			S: 0.69,
			M: 0.71,
			L: 0.73,
			XL: 0.75,
			XXL: 0.77,
			'3XL': 0.79,
			'4XL': 0.81,
			'5XL': 0.83,
			'6XL': 0.85,
			'7XL': 0.87,
		}
		return sizeMap[size] || 1.0
	}
	const sizeScale = useMemo(
		() => getSizeScale(snap.currentSize),
		[snap.currentSize]
	)
	console.log(sizeScale)

	const rotation = snap.currentRotate ? [0.1, -3.1, 0] : [0, 0, 0]

	const getPosition = sizeScale => {
		const basePosition = [0.035, 0.9, 0]
		const yOffset = sizeScale * -1.3
		return [basePosition[0], basePosition[1] + yOffset, basePosition[2]]
	}

	const position = getPosition(sizeScale)

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.Object_10.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				rotation={rotation}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0.02, 1.273, 0.1]}
						rotation={[0, 0, 0]}
						scale={0.5488}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[HoodieLogoPosition.x, HoodieLogoPosition.y, 0.0365]}
						rotation={[0, 0, 0]}
						scale={0.12}
						map={logoTexture}
						depthTest={false}
						depthWrite={false}
						onPointerDown={handlePointerDown}
					/>
				)}
			</mesh>
			<mesh
				geometry={nodes.Object_6.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_7.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_8.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_9.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>

			<mesh
				geometry={nodes.Object_11.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_12.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isBackLogoTexture && (
					<Decal
						position={[backLogoPosition.x, backLogoPosition.y, -0.2]}
						rotation={[0, Math.PI, 0]}
						scale={0.15}
						map={logoTexture}
						depthTest={true}
						depthWrite={false}
						onPointerDown={handlePointerDownBack}
					/>
				)}
			</mesh>
			<mesh
				geometry={nodes.Object_13.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_14.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_15.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_16.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
			<mesh
				geometry={nodes.Object_17.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={position}
				scale={[sizeScale, sizeScale, sizeScale]}
				rotation={rotation}
			>
				<meshStandardMaterial color={snap.color} />
			</mesh>
		</group>
	)
}

export default Hoodie
