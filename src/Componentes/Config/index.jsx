import './config.css'
import left from '../../assets/icons/left.png'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


export default function Config(){
    // id do usuario
    const {idUser} = useParams()

    // buscando informacoes do usuario
    useEffect(() => {
        // Configurando header para a página
        document.getElementById('header_flexivel').style.display = 'flex'
        document.getElementById('container_admin').style.gridTemplateColumns = '1fr 8fr'
        
    },[])


    return (
        <main id='main_config' className='bg-slate-900'>
            <nav id='config_navigation'>
                <Link to={`/admin/${idUser}`}><img src={left} alt='vetor de esquerda' id='imgVetor' /></Link>
            </nav>

            <div id='container_config'>
                <div id='container_delete'>

                </div>
            </div>
        </main>
    )
}