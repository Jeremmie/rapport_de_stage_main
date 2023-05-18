import { shaderMaterial, useAnimations, Sparkles, Environment, Sky, Stars, Center, useTexture, useGLTF, OrbitControls, Cloud, Html, Box, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useDebugValue, useRef, useState } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import Swimming from "./swimming.jsx"
import Computer_man from './computer_man.jsx'
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
    /**perf
     * 
     */
    

    /**
     * debug pannel
     */
    const {orbitCamera} = useControls({ orbitCamera: true })
    const {rotation} = useControls({
        rotation:{
            value: {x: 0, y: 0},
            step: 0.01
        }
    })
    const {radius} = useControls({
        radius:{
            value: 1,
            step: 0.1
        }
    })

    const { sunPosition, turbidity, mieCoefficient } = useControls('sky', {
        sunPosition: { value: [ 2.3, 0.6, -3.6 ], step: 0.1 },
        turbidity:{value: 0.1, step: 0.1},
        mieCoefficient: {value: 0.01, step: 0.1}
    })

    const { nodes } = useGLTF('./model/tower_v2.glb')
    

    const bakedTexture = useTexture('./model/tower_material.jpg')
    bakedTexture.flipY = false
    
    const portalMaterial = useRef()
    const placeHolder = useRef()

    const [hidden, set] = useState()
    
    
    /* useFrame((state, delta) =>
    {
        portalMaterial.current.uTime += delta
    }) */

    return <>
        <Stars attach={'background'} />

        <Perf position="top-left" />

        <ambientLight intensity={1} />
       {/*  <color args={["#f5bfd7"]} attach={"background"} /> */}

       <Sky sunPosition={sunPosition} turbidity={turbidity} mieCoefficient={mieCoefficient} />

        { orbitCamera && <OrbitControls makeDefault /> }

        <Center>
            
            <mesh geometry={ nodes.tower.geometry }  >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh geometry={ nodes.terrain.geometry } >
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            <mesh geometry={ nodes.porte.geometry } >
                <portalMaterial ref={ portalMaterial } />
            </mesh>

            {/* <mesh geometry={ nodes.cube.geometry }>
            <Html
                 position={ [ 2, 1, 0 ] }
                 wrapperClass="label"
                 center
                 distanceFactor={ 3 }
                 occlude={[placeHolder]}
                 onOcclude={set}
                    style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                    }}
                 > <p>this is a tower</p> 
            </Html>

                <meshBasicMaterial wireframe />
            </mesh> */}

            <Swimming></Swimming>

            <Computer_man></Computer_man>

            
           
            
            

           {/*  <mesh geometry={ nodes.poleLightA.geometry } position={ nodes.poleLightA.position }>
                
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh geometry={ nodes.poleLightB.geometry } position={ nodes.poleLightB.position }>
            <Html
                 
                position={ [ 0.1, 0.1, 0.0 ] }
                wrapperClass="label"
                center
                distanceFactor={ 3 }
                > <p>this is a lamp</p> 
                </Html>
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh geometry={ nodes.portalLight.geometry } position={ nodes.portalLight.position } rotation={ nodes.portalLight.rotation }>
                <portalMaterial ref={ portalMaterial } />
            </mesh> */}

            <Sparkles
		        size={ 10 }
                scale={ [ 10, 5, 10 ] }
                position-y={ 1 }
                speed={ 0.2 }
                count={ 40 }
                color={'#caf0f8'}
            />

            {/* <Sky distance={50} rayleigh={0.03} sunPosition={[0, 1, 0]} turbidity={1} inclination={0} azimuth={0.5} /> */}
            {/* <Cloud
                position={[5, 0, 0]}
                opacity={0.3}
                speed={0.05} // Rotation speed
                width={20} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={10} // Number of particles
/> */}
        
        </Center>

    </>
}

