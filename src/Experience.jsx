import { shaderMaterial, Html, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, Cloud, OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
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
    const {position} = useControls('Sparkles',{
        position: { value: [ 88, -41, 11 ], step: 1 },
    })

    
    /**
     * model
     */
    const tower = useGLTF('./model/tower_v2.glb')
    const dunk = useGLTF('./model/dunk.gltf')
    const robotAll = useGLTF('./model/robot_all.glb')

    /**
     * Textures
     */
    const bakedTexture = useTexture('./model/tower_material.jpg')
    const dunkTexture = useTexture('./model/dunk_base_color.png')

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

    bakedTexture.flipY = false
    dunkTexture.flipY = false

    /**
     * PlaceHolder (hide Html element when camera goes far)
     */
    const placeHolder = useRef()
    const [hidden, set] = useState()

    console.log(tower.nodes.terrain)
    
    /**
     * portal material
     */
    const portalMaterial = useRef()
    const towerMaterial = useRef()
    useFrame((state, delta) =>
    {
        portalMaterial.current.uTime += delta
        /* towerMaterial.current.rotation.y += delta */
    })

    return <>
        
        {/* Debugging */}
        <Perf position="top-left" />
        
        
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

        {/* <Center> */}
            <mesh geometry={ tower.nodes.tower.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh geometry={dunk.nodes.perso.geometry} position={[46, -12.5, 9]} rotation={[0.4, -0.45, 0]}>
                <meshBasicMaterial map={dunkTexture} />
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

            <group position={position}>
            <Sphere ref={placeHolder} material scale={8} />
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
            

            <mesh ref={towerMaterial} geometry={ tower.nodes.terrain.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh geometry={ tower.nodes.porte.geometry } >
                <portalMaterial ref={ portalMaterial } />
            </mesh>

            
        {/* </Center> */}

    </>
}

