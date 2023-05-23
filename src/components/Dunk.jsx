import { shaderMaterial, Html, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, Cloud, OrbitControls, Sphere, Box, CameraShake } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'





export default function Dunk(){
    const dunk = useGLTF('./model/dunk.gltf')
    const dunkTexture = useTexture('./model/dunk_base_color.png')
    dunkTexture.flipY = false

    const placeHolder = useRef()
    const [hidden, set] = useState()



    return<>
    
    <mesh geometry={dunk.nodes.perso.geometry} position={[46, -12.5, 9]} rotation={[0.4, -0.45, 0]}>
                <meshBasicMaterial map={dunkTexture} />
                <Html
                position={[0, 0, 0]}
                 wrapperClass="label"
                 center
                 occlude={placeHolder}
                 onOcclude={set}
                    style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                }}>
                    <h1>salut</h1>
                </Html>
            </mesh>

            <mesh material ref={placeHolder} scale={10} position={[46, -12.5, 9]}>
                <sphereGeometry />
            </mesh>
           
            <mesh geometry={dunk.nodes.filet_peche.geometry} position={[46, -12.5, 9]} rotation={[0.4, -0.45, 0]}>
                <meshBasicMaterial map={dunkTexture} />
            </mesh>
            <Sparkles
		        size={ 10 }
                scale={0.4}
                position={[ 45.5, -10.5, 10.9 ]}
                speed={ 2 }
                count={ 20 }
                color={'#FFE53B'}
                noise={1}
            />
    
    </>
}