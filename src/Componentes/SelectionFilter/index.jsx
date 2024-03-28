import * as Dialog from '@radix-ui/react-dialog'

// import css
import './selectFilter.css'

export const SelectionFilter = ({selectValue, filterList, setSelectValue}) =>{

    function selectFilter(text){

        setSelectValue(text)

        filterList.sort((a,b) => {
            if(text === 'Ordem alfabetica'){
                return a.nome.localeCompare(b.nome)
            } else if(text === 'Recentes'){
                
                // Invertendo a data
                let dataLast = a.createdDate.split('/')
                let datalastInvertida = dataLast[2] + '-' + dataLast[1] + '-' + dataLast[0]

                // Invertendo a data
                let dataNext = b.createdDate.split('/')
                let dataNextInvertida = dataNext[2] + '-' + dataNext[1] + '-' + dataNext[0]

                // Retornando o array com ordenação em data
                return new Date(dataNextInvertida) - new Date(datalastInvertida)
            }
        })
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className='triggerSelect'>{selectValue}</Dialog.Trigger>

                <Dialog.Content className='contentSelect'>
                    <menu>
                        <Dialog.Close onClick={(e) => selectFilter(e.target.textContent)}>Recentes</Dialog.Close>
                        <Dialog.Close onClick={(e) => selectFilter(e.target.textContent)}>Ordem alfabetica</Dialog.Close>
                    </menu>
                </Dialog.Content>
        </Dialog.Root>
    )
}