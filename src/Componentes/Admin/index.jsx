import './admin.css'
import {useParams} from 'react-router-dom'
import { database} from '../../Services/firebaseConnection'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import { useState,useEffect, useContext } from 'react'
import {Context} from '../../Context'
import Header from '../Header'

import TableRow from '../TableRow'

export default function Admin(){
    // Id do usuario
    const {idUser} = useParams()

    // State global - id
    const {id, setId, setAvatarUrl} = useContext(Context)

    // state lista usuarios
    const [lista,setLista] = useState([])

    // state - seach
    const [seach, setSeach] = useState('')

    // state - filterList
    const filterList = seach !== '' ? lista.filter(item => item.nome.toLowerCase().includes(seach.toLowerCase())) : lista

    // pegando usuarios da lista
    useEffect(() => {

        // Setando id na state de id
        setId(idUser)

        if(JSON.parse(localStorage.getItem('themeMode')) === false){
            document.getElementById('main_admin').classList.remove('main_light')
            document.querySelector('table').classList.remove('main_light')
            document.querySelector('body').style.backgroundColor = 'rgb(15 23 42)'
        } else{
            document.getElementById('main_admin').classList.add('main_light')
            document.querySelector('table').classList.add('table_light')
            document.querySelector('body').style.backgroundColor = 'rgb(234, 238, 255)'
        }

        //Função loadLista
        async function loadLista(){

            try{
                // Pegando a referencia do documento
                const docRef = doc(database,'clientes',idUser)

                // Pegando o documento
                const docSnap = await getDoc(docRef)

                // Condição caso tenha clientes
                if(docSnap.data().clientes){
                    // Salvando os usuarios na state clientes
                    setLista(docSnap.data().clientes)

                    // Salvando informações da conta na state conta
                    setAvatarUrl(docSnap.data().avatarUrl)

                    // Alterando o padding do container table
                    document.getElementById('container_table').style.padding = '10px'
                }

                
                
            }catch(e){
                console.log(e)
            }
        }

        // chamando funcao loadLista
        loadLista()
        
    },[setId, idUser, id, setAvatarUrl])

    // state - campos forms
    const {nome,setNome} = useContext(Context)
    const {idade,setIdade} = useContext(Context)
    const {email,setEmail} = useContext(Context)
    const {telefone,setTelefone} = useContext(Context)

    // index
    const {index,setindex} = useContext(Context)

    // openModal - edicao
    function openModalEdicao(value){
        /* modal cadastro */
        let modal = document.getElementById('modal_edicao')

        if(window.innerWidth > 420){
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
        }else{
            if(modal.style.display === 'flex'){
                document.querySelectorAll('.btn-edit')[value].textContent ='Editar'
                modal.style.display = 'none'
    
                // Valor padrao do state index
                setindex(null)
            } else{
                document.querySelectorAll('.btn-edit')[value].textContent ='Fechar'
                modal.style.display = 'flex'
                
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
                await updateDoc(doc(database,'clientes',id),{
                    clientes: [...lista,{
                        cratedDate:new Date().toLocaleDateString(),
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

    
    return(
        <main id='main_admin' className='bg-slate-900 flex justify-between'>

            {/* header component */}
            <Header/>

            <div id='container_table'>

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


                <form className='w-[85vw] mb-5 mt-2'>
                    <input className='w-full rounded-sm p-1 pl-2 bg-transparent outline-0 border-[1px] border-white text-white' type='text' placeholder='Busque por um cliente...' autoFocus value={seach} onChange={(e) => setSeach(e.target.value)}/>
                </form>

                <table className='text-white table-auto'>
                    <thead>
                        {lista.length > 0 ? <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ação</th>   
                        </tr> : <tr><th className='border-none'>Nenhum chamado</th></tr>}
                    </thead>

                    <tbody>
                        
                        {filterList.length > 0 && filterList.map((item,idx) => <TableRow
                        key={idx}
                        idx={idx}
                        date={item.cratedDate} 
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
