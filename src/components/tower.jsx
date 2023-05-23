import { shaderMaterial, Html, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, Cloud, OrbitControls, Sphere, Box, CameraShake } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import { useControls } from 'leva'
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

export default function Tower(){
    const tower = useGLTF('../model/tower_v3.glb')
    const bakedTexture = useTexture('../model/tower_material.jpg')
    bakedTexture.flipY = false

    const placeHolder = useRef()
    const [hidden, set] = useState()

    const portalMaterial = useRef()
    const rockMaterial = useRef()
    const rock1Material = useRef()
    const [angle, setAngle] = useState(0)
    useFrame((state, delta) =>
    {   
        setAngle((prevAngle) => prevAngle + delta * 0.2)

        portalMaterial.current.uTime += delta
        rockMaterial.current.position.y = -(Math.cos(angle)) * 0.7
        rock1Material.current.position.y = Math.sin(angle) * 0.9
        rockMaterial.current.rotation.y = -(Math.cos(angle)) * 0.2
        rock1Material.current.rotation.y = Math.sin(angle) * 0.2
    })

    return<>
    
    <mesh geometry={ tower.nodes.tower.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
                <Html
                position={[2.1, 2, -2]} 
                 wrapperClass="label"
                 center
                 distanceFactor={10}
                 occlude={placeHolder}
                 onOcclude={set}
                    style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                }}>
                    <h1>Coucou</h1>
                </Html>
            </mesh>
            <mesh geometry={ tower.nodes.terrain.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>
            <mesh ref={rockMaterial} geometry={ tower.nodes.rock.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>
            <mesh ref={rock1Material} position={[0, 3, 0]} geometry={ tower.nodes.rock1.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh geometry={ tower.nodes.porte.geometry } >
                <portalMaterial ref={ portalMaterial } />
            </mesh>
            
            <mesh material ref={placeHolder} scale={15} >
                <sphereGeometry />
            </mesh>
    </>
}