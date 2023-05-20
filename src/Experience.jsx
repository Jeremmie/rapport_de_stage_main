import { shaderMaterial, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, Cloud, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import Swimming from "./components/swimming.jsx"
import Computer_man from './components/computer_man.jsx'
import { Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#FFFFFF'),
        uColorEnd: new THREE.Color('#555555') 
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })



export default function Experience()
{
    /**
     * debug pannel
     */
    
    const { sunPosition, turbidity, mieCoefficient } = useControls('sky', {
        sunPosition: { value: [ 2.3, 0.6, -3.6 ], step: 0.1 },
        turbidity:{value: 0.1, step: 0.1},
        mieCoefficient: {value: 0.01, step: 0.1}
    })
    const {orbitCamera} = useControls('Camera',{
        orbitCamera: false
    })


    
    /**
     * model
     */
    const { nodes } = useGLTF('./model/tower_v2.glb')
    const dunk = useGLTF('./model/dunk.gltf')

    /**
     * Textures
     */
    const bakedTexture = useTexture('./model/tower_material.jpg')
    bakedTexture.flipY = false

    /**
     * PlaceHolder (hide Html element when camera goes far)
     */
    const placeHolder = useRef()
    const [hidden, set] = useState()
    
    /**
     * portal material
     */
    const portalMaterial = useRef()
    useFrame((state, delta) =>
    {
        portalMaterial.current.uTime += delta
    })

    return <>
        
        {/* Debugging */}
        {/* <Perf position="top-left" /> */}
        
        
        {/* Camera */}
        { orbitCamera && <OrbitControls makeDefault /> }
        

        {/* Environnement */}
        <Sky sunPosition={sunPosition} turbidity={turbidity} mieCoefficient={mieCoefficient} />
        <Stars />
        <Cloud
                position={[5, 0, 0]}
                opacity={0.4}
                speed={0.05} // Rotation speed
                width={20} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={10} // Number of particles
        />
        

        {/* Light */}
        <ambientLight intensity={1} />

        <Center>
            <mesh geometry={ nodes.tower.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh geometry={dunk.nodes.perso.geometry} position={[8, -4, 5]} rotation={[0, -0.2, 0]}>
                <meshBasicMaterial color={'#A690A4'} />
            </mesh>

            <mesh geometry={dunk.nodes.filet_peche.geometry} position={[8, -4, 5]} rotation={[0, -0.2, 0]}>
                <meshBasicMaterial color={'#A690A4'} />
            </mesh>

            <Sparkles
		        size={ 10 }
                scale={0.4}
                position={[7.7, -1.7, 6]}
                speed={ 2 }
                count={ 20 }
                color={'#F2E94E'}
                noise={1}
            />

            <mesh geometry={ nodes.terrain.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh geometry={ nodes.porte.geometry } >
                <portalMaterial ref={ portalMaterial } />
            </mesh>

            <Swimming></Swimming>
            <Computer_man></Computer_man>
        </Center>

    </>
}

