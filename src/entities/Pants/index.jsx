import { Decal, useGLTF, useTexture } from '@react-three/drei'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from './model/store'

const Pants = () => {
	const snap = useSnapshot(state)
	console.log(snap.color)
	const { nodes, materials } = useGLTF('/src/public/3dModel/pants.glb')

	const logoTexture = useTexture(snap.logoDecal)
	logoTexture.anisotropy = 16

	const fullTexture = useTexture(snap.fullDecal)
	fullTexture.anisotropy = 16

	const stateString = JSON.stringify(snap)

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.SSC_Grey_Sweatpants.geometry}
				material={materials.lambert1}
				material-roughness={1}
				scale={[0.0007, 0.0007, 0.0007]}
				dispose={null}
			>
				<meshStandardMaterial color={snap.color} />
				{snap.isFullTexture && (
					<Decal
						position={[0, 0, 0]}
						rotation={[0, 0, 0]}
						scale={1}
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

export default Pants
