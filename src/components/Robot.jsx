import { Html, useTexture, useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'





export default function Robot(){
    const robotAll = useGLTF('./model/robot_all.glb')

    const placeHolder = useRef()
    const [hidden, set] = useState()

    const bodytexture = useTexture('./model/robot/body2.jpg')
    const bouteilleTexture = useTexture('./model/robot/bouteille.jpg')
    const feetTexture = useTexture('./model/robot/feet.jpg')
    const metalMilieu = useTexture('./model/robot/metal_milieu.jpg')
    const metalTexture = useTexture('./model/robot/metal.jpg')
    const naturetexture = useTexture('./model/robot/nature.jpg')
    const terrainTexture = useTexture('./model/robot/terrain.jpg')
    const tuyauTexture = useTexture('./model/robot/tuyau.jpg')
    const vitreTexture = useTexture('./model/robot/vitre.jpg')
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
                    <p>Ce stage m’a permis d’apprendre de nouvelles techniques <br /> tout en consolidant celles déjà acquises ainsi que de découvrir <br /> les étapes de créations, l’environnement et l’organisation <br /> derrière un jeu vidéo. Tout en étant encadré par des <br /> professionels passionnés.
</p>
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