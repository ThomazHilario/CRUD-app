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
        <main id='main_config' className={lightMode ? 'main_config lightMode' : 'main_config'}>
            
            {/* Header component */}
            <Header/>

            <div id='container_config'>

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

            </div>
        </main>
    )
}

// Componente UpdateThemeSystem
function UpdateThemeSystem(){

    // context
    const { setLightMode, lightMode } = useContext(Context)

    // updateMode
    function updateMode(input){
        if(input.checked === true){
            input.checked = true

            // Setando o valor na local storage
            localStorage.setItem('themeMode',JSON.stringify(input.checked))

            // Alterando valor na state lightMode
            setLightMode(true)

        } else{
            input.checked = false

            // Setando o valor na local storage
            localStorage.setItem('themeMode',JSON.stringify(input.checked))

            // Alterando valor na state lightMode
            setLightMode(false)
        }

    }

    return(
        <form id='form_theme_system'>
            <label className={lightMode ? 'camposConfigLight' : undefined}>Theme System:</label>

            <label className="switch">
                <input type="checkbox" id='themeTag' onChange={(e) => updateMode(e.target)}/>
                <span className="slider" ></span>
            </label>

        </form>
    )
}