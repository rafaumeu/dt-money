import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'

const newTransactionFormSchema = zod.object({
	description: zod.string(),
	price: zod.number(),
	category: zod.string(),
	type: zod.enum(['income', 'outcome'])
})

type NewTransactionFormInput = zod.infer<typeof newTransactionFormSchema>
export function NewTransactionModal() {
	const {register, handleSubmit} = useForm<NewTransactionFormInput>({
		resolver: zodResolver(newTransactionFormSchema)
	})
	function handleCreateNewTransaction(data: NewTransactionFormInput) {
		console.log(data)
	}
  return (		
    <Dialog.Portal>
			<Overlay />
			<Content>
				<CloseButton> 
					<X size={24} />
				</CloseButton>
				<Dialog.Title>Nova Transação</Dialog.Title>
				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input type="text" placeholder='Descrição' required  {...register('description')}/>
					<input type="number" placeholder='Preço' required {...register('price', {valueAsNumber: true})}/>
					<input type="text" placeholder='Categoria' required {...register('category')} />
					<TransactionType>
						<TransactionTypeButton value="income" variant="income"><ArrowCircleUp size={24}/>Entrada</TransactionTypeButton>
						<TransactionTypeButton value="outcome" variant="outcome"><ArrowCircleDown size={24}/>Saída</TransactionTypeButton>
					</TransactionType>
					<button type="submit" disabled>Cadastrar</button>
				</form>
				
			</Content>
		</Dialog.Portal>
  )
}