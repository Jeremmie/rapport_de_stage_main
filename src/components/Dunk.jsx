import { Html, Sparkles, useTexture, useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'






export default function Dunk(){
    const dunk = useGLTF('./model/dunk.gltf')
    const dunkTexture = useTexture('./model/dunk_base_color.jpg')
    dunkTexture.flipY = false

    const placeHolder = useRef()
    const [hidden, set] = useState()



    return<>
    
    <mesh geometry={dunk.nodes.perso.geometry} position={[46, -12.5, 9]} rotation={[0.4, -0.45, 0]}>
                <meshBasicMaterial map={dunkTexture} />
                <Html
                position={[1, 2, 0.5]}
                 wrapperClass="label"
                 center
                 occlude={placeHolder}
                 onOcclude={set}
                    style={{
                    transition: 'all 0.5s',
                    opacity: hidden ? 0 : 1,
                    transform: `scale(${hidden ? 0.5 : 1})`
                }}>
                <p>Constamment à la recherche d’idées, la 3D me passionne, <br /> car elle me permet d’exprimer celles que j’ai attrapées.</p>
               
                <div className='divTower'>
                <a className='linkTower' href="https://jeremiejaouen.ch/" target='blank'>portfolio
                    <svg version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                         <g fillRule="evenodd">
                          <path d="m233.33 177.33c-18.039 0-32.664 14.625-32.664 32.668v186.67c0 18.039 14.625 32.664 32.664 32.664h186.67c18.043 0 32.668-14.625 32.668-32.664v-70c0-7.7344 6.2656-14 14-14 7.7305 0 14 6.2656 14 14v70c0 33.504-27.164 60.664-60.668 60.664h-186.67c-33.504 0-60.664-27.16-60.664-60.664v-186.67c0-33.508 27.16-60.668 60.664-60.668h46.668c7.7305 0 14 6.2695 14 14 0 7.7344-6.2695 14-14 14z" stroke='white' strokeWidth="50"/>
                          <path d="m513.34 102.67c7.7344 0 14 6.2695 14 14v105c0 7.7305-6.2695 14-14 14-7.7305 0-14-6.2695-14-14v-71.203l-104.44 104.43c-5.4648 5.4688-14.332 5.4688-19.797 0-5.4688-5.4688-5.4688-14.332 0-19.797l104.43-104.43h-71.203c-7.7305 0-14-6.2695-14-14 0-7.7344 6.2695-14 14-14z" stroke='white' strokeWidth="50"/>
                         </g>
                        </svg>
                </a>
                
                </div>
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