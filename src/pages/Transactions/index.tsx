import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Bus, Pencil, Trash, X } from 'phosphor-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as zod from 'zod'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import {
  TransactionsContext,
  Transport,
} from '../../contexts/TransactionContext'
import { api } from '../../lib/axios'
import {
  dateFormatter,
  dayFormatter,
  priceFormatter,
} from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  ActionButton,
  ActionsCell,
  CloseButton,
  Content,
  ErrorMessage,
  Overlay,
  TableWrapper,
  TransactionsContainer,
  TransactionsTable,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const editTransportFormSchema = zod.object({
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

type EditTransportFormInputs = zod.infer<typeof editTransportFormSchema>

export function Transactions() {
  const { report, setReport } = useContextSelector(
    TransactionsContext,
    (context) => context,
  )

  const [isEditing, setIsEditing] = useState(false)
  const [editingTransport, setEditingTransport] = useState<Transport | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditTransportFormInputs>({
    resolver: zodResolver(editTransportFormSchema),
    defaultValues: {
      itinerary: '',
      type: 'municipal',
      quantity: 1,
      unitPrice: '',
    },
  })

  const handleEditTransport = (transport: Transport, dailyRecord: any) => {
    console.log('Transporte que está sendo editado:', transport)

    reset({
      itinerary: dailyRecord.itinerary,
      type: transport.type,
      quantity: transport.quantity,
      unitPrice: transport.unitPrice.toString().replace('.', ','), // Converte para formato brasileiro
    })

    setIsEditing(true)
    setEditingTransport({
      ...transport,
      itinerary: dailyRecord.itinerary,
    })
  }

  const handleDeleteTransport = (transport: Transport) => {
    if (window.confirm('Tem certeza que deseja excluir este transporte?')) {
      const updatedDailyRecords = report?.dailyRecords.map((dailyRecord) => ({
        ...dailyRecord,
        transports: dailyRecord.transports.filter((t) => t.id !== transport.id),
      }))

      if (updatedDailyRecords) {
        setReport({
          ...report,
          dailyRecords: updatedDailyRecords,
        })

        // Fazer requisição para o servidor para atualizar o arquivo server.json
        api.patch('/report', {
          dailyRecords: updatedDailyRecords,
        })
      }
    }
  }

  const onSubmit = async (data: EditTransportFormInputs) => {
    if (editingTransport) {
      const updatedTransport = {
        ...editingTransport,
        ...data,
        unitPrice: data.unitPrice, // Já está convertido pelo Zod
        quantity: data.quantity,
      }

      const updatedDailyRecords = report?.dailyRecords.map((dailyRecord) => ({
        ...dailyRecord,
        transports: dailyRecord.transports.map((t) =>
          t.id === editingTransport.id ? updatedTransport : t,
        ),
      }))

      if (updatedDailyRecords) {
        try {
          await api.patch('/report', {
            dailyRecords: updatedDailyRecords,
          })

          setReport((prevReport) => ({
            ...prevReport,
            dailyRecords: updatedDailyRecords,
          }))

          setIsEditing(false)
          setEditingTransport(null)
        } catch (error) {
          console.error('Erro ao atualizar transporte:', error)
          alert('Erro ao salvar as alterações. Tente novamente.')
        }
      }
    }
  }

  if (!report || !report.dailyRecords) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TableWrapper>
          <TransactionsTable>
            {/* ... cabeçalho da tabela permanece o mesmo ... */}
            <tbody>
              {report.dailyRecords?.map((record) =>
                record.transports?.map((transport) => {
                  const date = new Date(record.date)
                  return (
                    <tr key={transport.id}>
                      <td>{dateFormatter.format(date)}</td>
                      <td>{dayFormatter.format(date)}</td>
                      <td>{record.itinerary}</td>
                      <td>{transport.type}</td>
                      <td>{transport.quantity}</td>
                      <td>{priceFormatter.format(transport.unitPrice)}</td>
                      <td>
                        {priceFormatter.format(
                          transport.quantity * transport.unitPrice,
                        )}
                      </td>
                      <ActionsCell>
                        <ActionButton
                          type="button"
                          onClick={() => handleEditTransport(transport, record)}
                          variant="edit"
                        >
                          <Pencil size={20} />
                        </ActionButton>
                        <ActionButton
                          type="button"
                          onClick={() => handleDeleteTransport(transport)}
                          variant="delete"
                        >
                          <Trash size={20} />
                        </ActionButton>
                      </ActionsCell>
                    </tr>
                  )
                }),
              )}
            </tbody>
          </TransactionsTable>
        </TableWrapper>
      </TransactionsContainer>

      <Dialog.Root open={isEditing} onOpenChange={setIsEditing}>
        <Dialog.Portal>
          <Overlay />
          <Content>
            <CloseButton onClick={() => setIsEditing(false)}>
              <X size={24} />
            </CloseButton>
            <Dialog.Title>Edição de transporte</Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                {...register('itinerary')}
                placeholder="Itinerário"
              />
              {errors.itinerary && (
                <ErrorMessage>{errors.itinerary.message}</ErrorMessage>
              )}

              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton
                      value="municipal"
                      $variant="municipal"
                      type="button"
                      $isActive={field.value === 'municipal'}
                    >
                      <Bus size={24} />
                      Municipal
                    </TransactionTypeButton>
                    <TransactionTypeButton
                      value="intermunicipal"
                      $variant="intermunicipal"
                      type="button"
                      $isActive={field.value === 'intermunicipal'}
                    >
                      <Bus size={24} />
                      Intermunicipal
                    </TransactionTypeButton>
                  </TransactionType>
                )}
              />
              {errors.type && (
                <ErrorMessage>{errors.type.message}</ErrorMessage>
              )}

              <input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                placeholder="Quantidade"
              />
              {errors.quantity && (
                <ErrorMessage>{errors.quantity.message}</ErrorMessage>
              )}

              <input
                type="text"
                {...register('unitPrice')}
                placeholder="Valor Unitário"
              />
              {errors.unitPrice && (
                <ErrorMessage>{errors.unitPrice.message}</ErrorMessage>
              )}

              <button type="submit">Salvar</button>
            </form>
          </Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
