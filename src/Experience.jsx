import { shaderMaterial, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, Cloud, Html, Sphere, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useDebugValue, useRef, useState } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import Swimming from "./components/swimming.jsx"
import Computer_man from './components/computer_man.jsx'
import Camera from './components/camera.jsx'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#FFFBDB'),
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
        orbitCamera: true
    })

    /**
     * model
     */
    const { nodes } = useGLTF('./model/tower_v2.glb')

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
        <Perf position="top-left" />

        {/* Camera */}
        { orbitCamera && <OrbitControls makeDefault /> }

        {/* Environnement */}
        <Sky sunPosition={sunPosition} turbidity={turbidity} mieCoefficient={mieCoefficient} />
        
        
        <Cloud
                position={[5, 0, 0]}
                opacity={0.4}
                speed={0.05} // Rotation speed
                width={20} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={10} // Number of particles
        />
        <Stars  />

        {/* Light */}
        <ambientLight intensity={1} />

        <Center>
            <mesh geometry={ nodes.tower.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

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

