import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Bus, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as zod from 'zod'
import { TransactionsContext } from '../../contexts/TransactionContext'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransportFormSchema = zod.object({
  date: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida'),
  itinerary: zod.string().min(1, 'Itinerário é obrigatório'),
  type: zod.enum(['municipal', 'intermunicipal']),
  quantity: zod
    .number()
    .min(1, 'Quantidade mínima é 1')
    .max(100, 'Quantidade máxima é 100'),
  unitPrice: zod
    .string()
    .regex(
      /^\d+(,\d{1,2})?$/,
      'Preço unitário deve ser um número válido (ex: 10,99)',
    )
    .transform((value) => parseFloat(value.replace(',', '.'))),
})

type NewTransportFormInput = zod.infer<typeof newTransportFormSchema>

interface NewTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTransactionModal({
  onOpenChange,
}: NewTransactionModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<NewTransportFormInput>({
    resolver: zodResolver(newTransportFormSchema),
  })

  const createTransport = useContextSelector(
    TransactionsContext,
    (context) => context.createTransport,
  )

  async function handleCreateNewTransport(data: NewTransportFormInput) {
    try {
      await createTransport({
        date: data.date,
        itinerary: data.itinerary,
        type: data.type,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
      })

      reset()
      onOpenChange(false) // Close the modal after successful submission
    } catch (error) {
      console.error('Error creating transport:', error)
      alert('Erro ao criar transporte. Tente novamente.')
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton onClick={() => onOpenChange(false)}>
          <X size={24} />
        </CloseButton>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <form onSubmit={handleSubmit(handleCreateNewTransport)}>
          <input
            type="date"
            placeholder="Data"
            required
            {...register('date')}
          />
          <input
            type="text"
            placeholder="Itinerário"
            required
            {...register('itinerary')}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton
                    value="municipal"
                    $variant="municipal"
                    $isActive={field.value === 'municipal'}
                  >
                    <Bus size={24} />
                    Municipal
                  </TransactionTypeButton>
                  <TransactionTypeButton
                    value="intermunicipal"
                    $variant="intermunicipal"
                    $isActive={field.value === 'intermunicipal'}
                  >
                    <Bus size={24} />
                    Intermunicipal
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <input
            type="number"
            placeholder="Quantidade"
            required
            {...register('quantity', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Preço Unitário"
            required
            {...register('unitPrice')}
          />
          <button type="submit" disabled={!isValid}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
