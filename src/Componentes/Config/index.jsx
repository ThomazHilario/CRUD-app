import './config.css'
import left from '../../assets/icons/left.png'
import {useContext} from 'react'
import { Context } from '../../Context'
import { Link } from 'react-router-dom'


export default function Config(){
    const {id} = useContext(Context)
    return (
        <main id='main_config' className='bg-slate-900'>
            <nav id='config_navigation'>
                <Link to={`/admin/${id}`}><img src={left} alt='vetor de esquerda' id='imgVetor' /></Link>
            </nav>
        </main>
    )
}