import './config.css'
import left from '../../assets/icons/left.png'
import { useEffect, useState, useContext } from 'react'
import { Context } from '../../Context'
import { Link, useParams } from 'react-router-dom'
import {auth, database, storage} from '../../Services/firebaseConnection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {doc, deleteDoc, updateDoc} from 'firebase/firestore'
import {deleteUser} from 'firebase/auth'
import defaultImg from '../../assets/icons/userDefault.png'
import Header from '../Header'


export default function Config(){
    // id do usuario
    const {idUser} = useParams()


    // buscando informacoes do usuario
    useEffect(() => {
        // Pegando informações na localStorage
        let data = localStorage.getItem('user') !== '' ? JSON.parse(localStorage.getItem('user')) : null

        // Armazenando valor na staate user
        setUser(data)
        
    },[])

    // state - user
    const [user, setUser] = useState({})

    return (
        <main id='main_config' className='bg-slate-900 flex'>
            
            {/* Header component */}
            <Header/>

            <div id='container_config'>

                <nav id='config_navigation'>
                    <Link to={`/admin/${idUser}`}><img src={left} alt='vetor de esquerda' id='imgVetor' /></Link>
                </nav>

                {/* Title config */}
                <h2 className='titleConfig'>Detalhes da conta</h2>

                {/* UpdateImageProfile */}
                <UpdateImageProfile/>

                {/* Formulario de detalhes da conta */}
                <FormDetails uid={user.uid} email={user.email}/>

            </div>
        </main>
    )
}

// Component FormDetails
function FormDetails({uid,email}){

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
                    <label>Id:</label>
                    <input type='text' defaultValue={uid} disabled/>
                </div>


                <div className='campos_form_config'>
                    <label>Email:</label>
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

            <button>Salvar</button>
        </div>
    )
}