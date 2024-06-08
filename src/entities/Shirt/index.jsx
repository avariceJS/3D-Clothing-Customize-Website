// Base
import React from 'react'

// 3D Graphics
import { Decal, useGLTF, useTexture } from '@react-three/drei'

// State
import { useSnapshot } from 'valtio'

// Shared -> Config
import state from '@/shared/config/store'

// 3D Model
import { shirtModel } from '@/public'

const Shirt = () => {
	const snap = useSnapshot(state)

	// Load the 3D model for the shirt
	const { nodes, materials } = useGLTF(shirtModel)

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
			<mesh
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				position={[0.035, -0.01, 0]}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0, 0, 0]}
						rotation={[0, 0, 0]}
						scale={0.6999}
						map={fullTexture}
					/>
				)}

				{snap.isLogoTexture && (
					<Decal
						position={[0, 0.04, 0.15]}
						rotation={[0, 0, 0]}
						scale={0.15}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
					/>
				)}
			</mesh>
		</group>
	)
}

export default Shirt
