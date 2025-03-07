import './config.css'

// imports react
import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../../Context'

// import react-icons
import { FaArrowLeft } from "react-icons/fa6"

// imports components
import Header from '../../Componentes/Header'
import { FormDetails } from '../../Componentes/Config/FormDetails'
import { UpdateImageProfile } from '../../Componentes/Config/UpdateImageProfile'
import { UpdateThemeSystem } from '../../Componentes/Config/UpdateThemeSystem'

export default function Config(){
    // id do usuario
    const {idUser} = useParams()

    const {lightMode} = useContext(Context)

    // buscando informacoes do usuario
    useEffect(() => {

        // Salvando o valor do themeMode da localstorage no input
        document.getElementById('themeTag').checked = JSON.parse(localStorage.getItem('themeMode'))

        // Pegando informações na localStorage
        let data = localStorage.getItem('user') !== '' ? JSON.parse(localStorage.getItem('user')) : null

        // Armazenando valor na state user
        setUser(data)
        
    },[])

    // state - user
    const [user, setUser] = useState({})

    return (
        <section id='section_config' className={lightMode ? 'section_config lightMode' : 'section_config'}>
            
            {/* Header component */}
            <Header/>

            <article id='container_config'>

                <nav id='config_navigation'>
                    <Link to={`/admin/${idUser}`}><FaArrowLeft color={lightMode ? 'black' : 'white'} size={35}/></Link>
                </nav>

                {/* Title config */}
                <h2 className='titleConfig'>Detalhes da conta</h2>

                {/* UpdateImageProfile */}
                <UpdateImageProfile idUser={idUser}/>

                {/* UpdateThemeSystem */}
                <UpdateThemeSystem/>

                {/* Formulario de detalhes da conta */}
                <FormDetails uid={user.uid} email={user.email}/>

            </article>
        </section>
    )
}
