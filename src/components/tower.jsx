import { shaderMaterial, Html, useTexture, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import { useMediaQuery } from 'react-responsive'


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

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})


    const tower = useGLTF('./model/tower_v3.glb')
    const bakedTexture = useTexture('./model/tower_material.jpg')
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
                {isDesktopOrLaptop &&
                <Html
                position={[2.1, 3, -2]} 
                 wrapperClass="label"
                 center
                 distanceFactor={10}
                 occlude={[placeHolder]}
                 onOcclude={set}
                    style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                }}>
                    <p><a href="https://digitalkingdom.ch/" target='blank'>Digital Kingdom</a> est un studio <br /> de développement de jeux vidéo <br /> indépendants basé à vevey.</p>
                    <p>Spécialisé dans le serious game, <br /> ils apportent une dimension <br /> pédagogique et émotionnelle <br /> aux projets de leurs clients.</p>
                    <p>En parallèle, ils dédient aussi une <br /> partie de leur travail au développement <br /> de leurs propres jeux vidéo comme, <br /> par exemple, leur dernier jeu : Swordship</p>
                    <div className='divTower'>
                    <a className='linkTower' href="https://digitalkingdom.ch/" target='blank'>Digital Kingdom
                    <svg version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                         <g fillRule="evenodd">
                          <path d="m233.33 177.33c-18.039 0-32.664 14.625-32.664 32.668v186.67c0 18.039 14.625 32.664 32.664 32.664h186.67c18.043 0 32.668-14.625 32.668-32.664v-70c0-7.7344 6.2656-14 14-14 7.7305 0 14 6.2656 14 14v70c0 33.504-27.164 60.664-60.668 60.664h-186.67c-33.504 0-60.664-27.16-60.664-60.664v-186.67c0-33.508 27.16-60.668 60.664-60.668h46.668c7.7305 0 14 6.2695 14 14 0 7.7344-6.2695 14-14 14z" stroke='white' strokeWidth="50"/>
                          <path d="m513.34 102.67c7.7344 0 14 6.2695 14 14v105c0 7.7305-6.2695 14-14 14-7.7305 0-14-6.2695-14-14v-71.203l-104.44 104.43c-5.4648 5.4688-14.332 5.4688-19.797 0-5.4688-5.4688-5.4688-14.332 0-19.797l104.43-104.43h-71.203c-7.7305 0-14-6.2695-14-14 0-7.7344 6.2695-14 14-14z" stroke='white' strokeWidth="50"/>
                         </g>
                        </svg>
                    </a>
                    <a className='linkTower' href="http://swordship.com/" target='blank'>SwordShip 
                    <svg version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                         <g fillRule="evenodd">
                          <path d="m233.33 177.33c-18.039 0-32.664 14.625-32.664 32.668v186.67c0 18.039 14.625 32.664 32.664 32.664h186.67c18.043 0 32.668-14.625 32.668-32.664v-70c0-7.7344 6.2656-14 14-14 7.7305 0 14 6.2656 14 14v70c0 33.504-27.164 60.664-60.668 60.664h-186.67c-33.504 0-60.664-27.16-60.664-60.664v-186.67c0-33.508 27.16-60.668 60.664-60.668h46.668c7.7305 0 14 6.2695 14 14 0 7.7344-6.2695 14-14 14z" stroke='white' strokeWidth="50"/>
                          <path d="m513.34 102.67c7.7344 0 14 6.2695 14 14v105c0 7.7305-6.2695 14-14 14-7.7305 0-14-6.2695-14-14v-71.203l-104.44 104.43c-5.4648 5.4688-14.332 5.4688-19.797 0-5.4688-5.4688-5.4688-14.332 0-19.797l104.43-104.43h-71.203c-7.7305 0-14-6.2695-14-14 0-7.7344 6.2695-14 14-14z" stroke='white' strokeWidth="50"/>
                         </g>
                        </svg>
                     </a>
                    </div>
                </Html>
                
                }
                
                {isTabletOrMobile && 
                <Html
                position={[2, 3, 2]} 
                 wrapperClass="label"
                 center
                 distanceFactor={20}
                 occlude={[placeHolder]}
                 onOcclude={set}
                    style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                }}>
                    <h1>Digital Kingdom</h1>
                    <p>ajshdkajhsdkajshd</p>
                </Html>
                }
                
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
    
    <mesh material  scale={15} >
        <sphereGeometry ref={placeHolder} />
    </mesh>
    </>
}