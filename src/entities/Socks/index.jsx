import { Decal, useGLTF, useTexture } from '@react-three/drei'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from './model/store'

const Socks = () => {
    const snap = useSnapshot(state)
    console.log(snap.color)
    const { nodes, materials } = useGLTF('/src/public/3dModel/socks.glb')
    console.log(nodes)
    const logoTexture = useTexture(snap.logoDecal)
    logoTexture.anisotropy = 16

    const fullTexture = useTexture(snap.fullDecal)
    fullTexture.anisotropy = 16

    const stateString = JSON.stringify(snap)

    return (
        <group key={stateString}>
            <mesh
                geometry={nodes['sock-left-b_medias_0'].geometry}
                material={materials.lambert1}
                material-roughness={1}
                scale={[1, 1, 1]}
								position={[0, -0.1, 0]}
                dispose={null}
            >
                <meshStandardMaterial color={snap.color} />
                {snap.isFullTexture && (
                    <Decal
                        position={[0.01, 0.01, 0.01]}
                        rotation={[0, 0, 0]}
                        scale={1}
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
            <mesh
                geometry={nodes['sock-right-b_medias001_0'].geometry}
                material={materials.lambert1}
                material-roughness={1}
								position={[0, -0.1, 0]}
                scale={[1, 1, 1]}
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
