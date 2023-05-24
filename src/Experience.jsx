import { shaderMaterial, Html, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, Cloud, OrbitControls, Sphere, Box, CameraShake } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import Tower from './components/Tower.jsx'
import Dunk from './components/Dunk.jsx'
import Robot from './components/Robot.jsx'


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
    const {performance} = useControls('Perfs',{
        performance: false
    })
    const {orbitCamera} = useControls('Camera',{
        orbitCamera: false
    })
  
   
    return <>
        
        {/* Debugging */}
        
        {performance && <Perf position='top-left' />}
        
        
        {/* Camera */}
        { orbitCamera && <OrbitControls makeDefault /> }
        

        {/* Environnement */}
        <Sky sunPosition={sunPosition} turbidity={turbidity} mieCoefficient={mieCoefficient} />
        <Stars />
        {/* <Cloud
                position={[5, 0, 0]}
                opacity={0.4}
                speed={0.05} // Rotation speed
                width={20} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={10} // Number of particles
        /> */}
    

        {/* Light */}
        <ambientLight intensity={1} />

            <Tower />
            <Dunk />
            <Robot />

    </>
    
}

