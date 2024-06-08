// Base
import React from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { socksModel } from '@/public'

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

	return (
		<group key={stateString}>
			{/* Left sock */}
			<mesh
				geometry={nodes['sock-left-b_medias_0'].geometry}
				material={materials.lambert1}
				material-roughness={1}
				scale={[1, 1, 1]}
				position={[0, -0.15, 0]}
				dispose={null}
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
						position={[0.1367, 0.182, 0]}
						rotation={[0, 0, 0]}
						scale={0.06}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
					/>
				)}
			</mesh>
			{/* Right sock */}
			<mesh
				geometry={nodes['sock-right-b_medias001_0'].geometry}
				material={materials.lambert1}
				material-roughness={1}
				position={[0, -0.15, 0]}
				scale={[1, 1, 1]}
				dispose={null}
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
						position={[-0.021, 0.182, 0]}
						rotation={[0, 0, 0]}
						scale={0.06}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Socks
