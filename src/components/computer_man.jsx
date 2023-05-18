import { useAnimations, useGLTF, Html, Box, Sphere } from '@react-three/drei'
import { useState, useRef } from 'react'
import * as THREE from 'three'

export default function Computer_man()
{   
    const computer = useGLTF('./model/computer_man.glb')
    
    const { nodes, materials } = useGLTF("./model/computer_man.glb");

   const placeHolder = useRef()

   const [hidden, set] = useState()

    // Parcourir tous les matériaux de la scène et mettre en mode wireframe
    Object.values(materials).forEach((material) => {
        material.wireframe = true;
    });
    

    return <> 
    <primitive 
    object={computer.scene}
    position={[15, -3, 5]}
    >
        <Html
                 position={ [ 0.1, 0.1, 0.0 ] }
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
                 > <p>this is a man</p> 
            </Html>
    </primitive>

    <Sphere material position={[15, -3, 5]} scale={5}>
    </Sphere>

    </>
}