import './admin.css'
import {useParams} from 'react-router-dom'
import { database, auth } from '../../Services/firebaseConnection'
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore'
import {signOut} from 'firebase/auth'
import { useState,useEffect } from 'react'

export default function Admin(){
    // Id do usuario
    const {id} = useParams()

    // state lista usuarios
    const [lista,setLista] = useState([])

    // pegando usuarios da lista
    useEffect(() => {

        //Função loadLista
        async function loadLista(){

            // docRef
            const docRef = doc(database,'clientes',id)

            // snap
            const docSnap = await getDoc(docRef)

           //
            if(docSnap.data().clientes){
                setLista(docSnap.data().clientes)
            }
        }

        // chamando funcao loadLista
        loadLista()
    },[])

    // state - campos forms
    const [nome,setNome] = useState('')
    const [idade,setIdade] = useState('')
    const [email,setEmail] = useState('')
    const [telefone,setTelefone] = useState('')

    // openModal
    function openModal(){
        /* modal cadastro */
        let modal = document.getElementById('modal_cadastro')

        if(modal.style.display === 'grid'){
            modal.style.display = 'none'
        } else{
            modal.style.display = 'grid'
        }
    }

    // addPerson
    async function addPerson(e){
        try {
            // Cancelando formulario
            e.preventDefault()

           if(nome !== '' && idade !== '' && email !== '' && telefone !== ''){
                // Setando a lista nova
                setLista([...lista,{
                    nome:nome, 
                    idade:idade,
                    email:email,
                    telefone:telefone
                }])

                // Adicionando lista no banco de dados especifico
                await setDoc(doc(database,'clientes',id),{
                    clientes: [...lista,{
                        nome:nome, 
                        idade:idade,
                        email:email,
                        telefone:telefone
                    }]
                })

                // Mudando o display do Modal
                document.getElementById('modal_cadastro').style.display = 'none'

                // Resetando os valores das states
                setNome('')
                setIdade('')
                setEmail('')
                setTelefone('')
           }
        } catch (error) {
            console.log(error)
        }
    }

    // deleteUser
    async function deleteUser(index){
        try {
            // Tirando usuario da lista
            lista.splice(index,1)

            // Setando nova lista na state lista
            setLista([...lista])

            // Pegando a referencia do banco de dados
            const docRef = doc(database,'clientes',id)

            // Fazendo a atualização da propriedade clientes
            await updateDoc(docRef,{
                clientes:lista
            })

        } catch (error) {
            console.log(error)
        }
    }

    // Logout
    async function logOutUser(){
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <main>
            {/* Header */}
            <header>
                <button id='openModal' onClick={openModal}>Incluir usuario</button>
                <button id='logoutUser' onClick={logOutUser}>Sair</button>
            </header>

            <div id='container_table'>

                {/* Modal de cadastro */}
                <form id='modal_cadastro'>

                    <div className='campo_nome'>
                        <label>Nome:</label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>

                    <div className='campo_idade'>
                        <label>Idade:</label>
                        <input value={idade} onChange={(e) => setIdade(e.target.value)}/>
                    </div>

                    <div className='campo_telefone'>
                        <label>Telefone:</label>
                        <input value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                    </div>

                    <div className='campo_email'>
                        <label>Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div>
                        <button id='btn-incluir' onClick={addPerson}>Incluir</button>
                    </div>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Acao</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lista.map((item,idx) => {
                            return(
                                <tr key={idx}>
                                    <td>{item.nome}</td>
                                    <td>{item.idade}</td>
                                    <td>{item.email}</td>
                                    <td>{item.telefone}</td>
                                    <td><button className='btn-delete' onClick={() => deleteUser(idx)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    
                </table>
            </div>
        </main>
    )
}