// React
import { useContext } from "react"

// import avatar img
import defaultImg from '../../../assets/icons/userDefault.png'

// Context
import { Context } from "../../../Context"

// Toast
import { toast } from "react-toastify"

// Firebase
import { database, storage } from "../../../Services/firebaseConnection"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateDoc, doc } from "firebase/firestore"

export const UpdateImageProfile = ({idUser}) => {

    const { avatarUrl, setAvatarUrl } = useContext(Context)

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

    return (
        <section id='containerImageProfile'>
            {/* image */}
            <div id='image'>

                {/* input file */}
                <input type='file' id='fileInput' onChange={(e) => updateImage(e.target)}/>

                {/* img */}
                <img src={avatarUrl !== null ? avatarUrl : defaultImg} alt='imagem da foto' />

                {/* descricao */}
                <p onClick={changeImg}>Alterar foto</p>
            </div>
        </section>
    )
}