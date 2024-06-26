import './config.css'

// imports react
import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../../Context'

// import avatar img
import defaultImg from '../../assets/icons/userDefault.png'

// imports react-toastify
import { toast } from 'react-toastify'

// import react-icons
import { FaArrowLeft } from "react-icons/fa6"

// imports components
import Header from '../../Componentes/Header'

// imports firebase
import {auth, database, storage} from '../../Services/firebaseConnection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {doc, deleteDoc, updateDoc} from 'firebase/firestore'
import {deleteUser} from 'firebase/auth'

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
                <UpdateImageProfile/>

                {/* UpdateThemeSystem */}
                <UpdateThemeSystem/>

                {/* Formulario de detalhes da conta */}
                <FormDetails uid={user.uid} email={user.email}/>

            </div>
        </main>
    )
}

// Component FormDetails
function FormDetails({uid,email}){

    // Context
    const { lightMode } = useContext(Context)

      // Deletar a conta - handleAccount
      async function handleAccount(e){
        try {
            // Cancelando envio do formulario
            e.preventDefault()

            // Deletando usuario
            deleteUser(auth.currentUser)

            // Deletando o banco de dados do usuario
            await deleteDoc(doc(database,'clientes',uid))

            // mensagem de sucesso
            alert('Conta deletada')
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div id='container_delete'>
            
            {/* Formulario com detalhes da conta */}
            <form onSubmit={handleAccount}>

                <div className='campos_form_config'>
                    <label className={lightMode ? 'camposConfigLight' : undefined}>Id:</label>
                    <input type='text' defaultValue={uid} disabled/>
                </div>


                <div className='campos_form_config'>
                    <label className={lightMode ? 'camposConfigLight' : undefined}>Email:</label>
                    <input type='email' defaultValue={email} disabled/>
                </div>

                {/* button para excluir a conta */}
                <button type='submit'>Delete my account</button>
            </form>
        </div>
    )
}

// Component UpdateImageProfile
function UpdateImageProfile(){
    // id do usuario
    const {idUser} = useParams()

    // state img
    const {avatarUrl, setAvatarUrl} = useContext(Context)

    function changeImg(){
        // Acionando input file
        document.getElementById('fileInput').click()        
    }

    async function updateImage(input){
        // Salvando configuracoes do arquivo 
        const inputFile = input.files[0]

        // Criando a url da imagem
        const avatarUrl = URL.createObjectURL(inputFile)

        // setando nova imagem na state avatartUrl
        setAvatarUrl(avatarUrl)

        // referencia ao storage
        const storageRef = ref(storage, `imagens/${idUser}/${inputFile.name}`)

        // Salvando imagem no banco de dados
        await uploadBytes(storageRef, inputFile)

        // url da foto no banco de dados
        const urlImage = await getDownloadURL(storageRef)

        // Salvando a foto no banco de dados do usuario
        await updateDoc(doc(database,'clientes',idUser),{
            avatarUrl:urlImage
        })

        // Notificacao de sucess
        toast.success('Foto atualizada')
    }

    return(
        <div id='containerImageProfile'>
            {/* image */}
            <div id='image'>

                {/* input file */}
                <input type='file' id='fileInput' onChange={(e) => updateImage(e.target)}/>

                {/* img */}
                <img src={avatarUrl !== null ? avatarUrl : defaultImg} alt='imagem da foto' />

                {/* descricao */}
                <p onClick={changeImg}>Alterar foto</p>
            </div>
        </div>
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