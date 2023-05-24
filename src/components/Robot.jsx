import { shaderMaterial, Html, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, Cloud, OrbitControls, Sphere, Box, CameraShake } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'





export default function Robot(){
    const robotAll = useGLTF('./model/robot_all.glb')

    const placeHolder = useRef()
    const [hidden, set] = useState()

    const bodytexture = useTexture('./model/robot/body.jpg')
    const bouteilleTexture = useTexture('./model/robot/bouteille.png')
    const feetTexture = useTexture('./model/robot/feet.png')
    const metalMilieu = useTexture('./model/robot/metal_milieu.png')
    const metalTexture = useTexture('./model/robot/metal.png')
    const naturetexture = useTexture('./model/robot/nature.png')
    const terrainTexture = useTexture('./model/robot/terrain.png')
    const tuyauTexture = useTexture('./model/robot/tuyau.png')
    const vitreTexture = useTexture('./model/robot/vitre.png')
    bodytexture.flipY = false
    bouteilleTexture.flipY = false
    feetTexture.flipY = false
    metalMilieu.flipY = false
    metalTexture.flipY = false
    naturetexture.flipY = false
    terrainTexture.flipY = false
    tuyauTexture.flipY = false
    vitreTexture.flipY = false

    return<>
    
            <group position={[ 88, -41, 11 ]}>
            <mesh geometry={robotAll.nodes.body.geometry}>
                <meshBasicMaterial map={bodytexture} />
                <Html
                position={[0.5, 1, 0]}
                 wrapperClass="label"
                 center
                 distanceFactor={ 3 }
                 occlude={[placeHolder]}
                 onOcclude={set}
                    style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                }}>
                    <h1>Coucou</h1>
                </Html>
            </mesh>

            <mesh material position={[-1, 0, 3]} ref={placeHolder} scale={5}>
                <sphereGeometry />
            </mesh>

            <mesh geometry={robotAll.nodes.metal.geometry}>
                <meshBasicMaterial map={metalTexture} />
            </mesh>
            <mesh geometry={robotAll.nodes.bouteille.geometry}>
                <meshBasicMaterial map={bouteilleTexture} />
            </mesh>
            <mesh geometry={robotAll.nodes.feet.geometry}>
                <meshBasicMaterial map={feetTexture} />
            </mesh>
            <mesh geometry={robotAll.nodes.metal_milieu.geometry}>
                <meshBasicMaterial map={metalMilieu} />
            </mesh>
            <mesh geometry={robotAll.nodes.nature.geometry}>
                <meshBasicMaterial map={naturetexture} />
            </mesh>
            <mesh geometry={robotAll.nodes.sol.geometry}>
                <meshBasicMaterial map={terrainTexture} />
            </mesh>
            <mesh geometry={robotAll.nodes.tuyau.geometry}>
                <meshBasicMaterial map={tuyauTexture} />
            </mesh>
            <mesh geometry={robotAll.nodes.vitre.geometry}>
                <meshBasicMaterial map={vitreTexture} />
            </mesh>
            </group>
    
    </>
}