import './admin.css'
import {useParams, Link} from 'react-router-dom'
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

           // condição caso tenha clientes
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

    // index
    const [index,setindex] = useState(null)

    // openModal - incluir
    function openModal(){
        /* modal cadastro */
        let modal = document.getElementById('modal_cadastro')

        if(modal.style.display === 'grid'){
            modal.style.display = 'none'
            document.getElementById('openModal').textContent = 'Incluir usuario'
        } else{
            modal.style.display = 'grid'
            document.getElementById('openModal').textContent = 'Fechar'

            setNome('')
            setIdade('')
            setEmail('')
            setTelefone('')
        }
    }

    // openModal - edicao
    function openModalEdicao(value){
        /* modal cadastro */
        let modal = document.getElementById('modal_edicao')

        if(modal.style.display === 'grid'){
            document.querySelectorAll('.btn-edit')[value].textContent ='Editar'
            modal.style.display = 'none'

            // Valor padrao do state index
            setindex(null)
        } else{
            document.querySelectorAll('.btn-edit')[value].textContent ='Fechar'
            modal.style.display = 'grid'
            
            // setando valor na state de index
            setindex(value)

            // Pegando o obj pelo index
            const item = lista[value]

            // Setando os valores das propriedades do objeto nas states
            setNome(item.nome)
            setIdade(item.idade)
            setEmail(item.email)
            setTelefone(item.telefone)
        }
    }

    // addPerson
    async function addPerson(e){
        try {

            // Cancelando formulario
            e.preventDefault()
            
            // Mudando o display do Modal
            document.getElementById('modal_cadastro').style.display = 'none'

            // Mudando o valor do button
            document.getElementById('openModal').textContent = 'Incluir usuario'

           if(nome !== '' && idade !== '' && email !== '' && telefone !== ''){
                // Setando a lista nova
                setLista([...lista,{
                    nome:nome, 
                    idade:idade,
                    email:email,
                    telefone:`(${telefone.substring(0,2)}) ${telefone.substring(2,7)}-${telefone.substring(7,11)}`
                }])

                // Adicionando lista no banco de dados especifico
                await setDoc(doc(database,'clientes',id),{
                    clientes: [...lista,{
                        nome:nome, 
                        idade:idade,
                        email:email,
                        telefone:`(${telefone.substring(0,2)}) ${telefone.substring(2,7)}-${telefone.substring(7,11)}`
                    }]
                })
                
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

    // editperson
    async function editPerson(e){
        try {

            // Cancelando o envio do formulario
            e.preventDefault()

            // Mudando o display do modal_edicao para none
            document.getElementById('modal_edicao').style.display = 'none'

            // Mudando o texto do button
            document.querySelectorAll('.btn-edit')[index].textContent = 'Editar'

            // Editando propriedade do index escolhido
            lista[index].nome = nome
            lista[index].idade = idade
            lista[index].telefone = telefone
            lista[index].email = email

            // Setando alteracoes na lista
            setLista(lista)

            // Atualizar no banco de dados
            const docRef = doc(database,'clientes',id)

            // Salvando a nova lista no banco de dados
            await updateDoc(docRef,{
                clientes:lista
            })

            // Resetando state index
            setindex(null)

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
        <main id='main_admin'>
            {/* Header */}
            <header className='bg-slate-800'>
                <button id='openModal' onClick={openModal}>Incluir usuario</button>
                
                <nav id='configuracoes'>
                    <Link id='configButton'  className='rounded-sm' to={`/config/${id}`}>Configurações</Link>
                    <button id='logoutUser' onClick={logOutUser}>Sair</button>
                </nav>
            </header>

            <div id='container_table' className='bg-slate-900'>

                {/* Modal de cadastro */}
                <form className='modal' id='modal_cadastro'>

                    <div className='campo_nome'>
                        <label>Nome:</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>

                    <div className='campo_idade'>
                        <label>Idade:</label>
                        <input type='text' value={idade} onChange={(e) => setIdade(e.target.value)}/>
                    </div>

                    <div className='campo_telefone'>
                        <label>Telefone:</label>
                        <input type='tel' value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    </div>

                    <div className='campo_email'>
                        <label>Email:</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div>
                        <button id='btn-incluir' onClick={addPerson}>Incluir</button>
                    </div>
                </form>

                {/* Modal de edição */}
                <form className='modal' id='modal_edicao'>
                    <div className='campo_nome'>
                        <label>Nome:</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>

                    <div className='campo_idade'>
                        <label>Idade:</label>
                        <input type='text' value={idade} onChange={(e) => setIdade(e.target.value)}/>
                    </div>

                    <div className='campo_telefone'>
                        <label>telefone:</label>
                        <input type='tel' value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                    </div>

                    <div className='campo_email'>
                        <label>Email:</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div>
                        <button id='btn-editar' onClick={editPerson}>Editar</button>
                    </div>
                </form>

                <table className='text-white table-auto'>
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
                        
                        {lista.map((item,idx) => <LinhasTable
                        key={idx}
                        idx={idx} 
                        nome={item.nome} 
                        idade={item.idade} 
                        email={item.email} 
                        telefone={item.telefone}
                        openModalEdicao={openModalEdicao}
                        deleteUser={deleteUser}/>)}

                    </tbody>
                    
                </table>
            </div>
        </main>
    )
}

// Componente para exibir os tr
function LinhasTable({ idx, nome, idade, email, telefone, openModalEdicao, deleteUser}){
    return(
        <tr>
            <td>{nome}</td>
            <td>{idade}</td>
            <td>{email}</td>
            <td>{telefone}</td>
            <td>
                <button className='btn-edit' id='editModal' onClick={(e) => openModalEdicao(idx)}>Editar</button>
                <button className='btn-delete' onClick={() => deleteUser(idx)}>Delete</button>
            </td>
        </tr>
    )
}