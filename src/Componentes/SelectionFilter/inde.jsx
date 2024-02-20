import * as Dialog from '@radix-ui/react-dialog'

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
            <Dialog.Trigger className='h-8 text-start pl-3 bg-white/100 text-black'>{selectValue}</Dialog.Trigger>

                <Dialog.Content className='absolute top-32 sm:right-[7.7vw] sm:top-40 lg:top-14 lg:right-[1.25vw]'>
                    <menu className='flex flex-col gap-1  rounded-sm bg-white h-30 w-[170px] p-2'>
                        <Dialog.Close className='text-black w-[9.7rem] hover:bg-black/30' onClick={(e) => selectFilter(e.target.textContent)}>Recentes</Dialog.Close>
                        <Dialog.Close className='text-black w-[9.7rem] hover:bg-black/30' onClick={(e) => selectFilter(e.target.textContent)}>Ordem alfabetica</Dialog.Close>
                    </menu>
                </Dialog.Content>
        </Dialog.Root>
    )
}