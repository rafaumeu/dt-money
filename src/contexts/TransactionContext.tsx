import { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

export interface Transport {
  id: string
  type: string
  quantity: number
  unitPrice: number
  itinerary: string // Added itinerary property
}

interface DailyRecord {
  id: string
  date: string
  day: string
  itinerary: string
  transports: Transport[]
}

interface Report {
  employee: {
    name: string
    code: string
    position: string
    supervisor: string
  }
  month: string
  year: number
  dailyRecords: DailyRecord[]
}

interface NewTransportData {
  date: string
  itinerary: string
  type: string
  quantity: number
  unitPrice: number
}

interface TransactionContextType {
  report: Report | null
  setReport: React.Dispatch<React.SetStateAction<Report | null>> // Added setReport
  fetchReport: () => Promise<void>
  createTransport: (data: NewTransportData) => Promise<void>
  fetchTransactions: (query: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
  children: React.ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [report, setReport] = useState<Report | null>(null)

  const fetchReport = useCallback(async () => {
    const response = await api.get('/report')
    setReport({
      ...response.data,
      dailyRecords: response.data.dailyRecords || [],
    })
  }, [])

  const createTransport = useCallback(
    async (data: NewTransportData) => {
      const { date, itinerary, type, quantity, unitPrice } = data

      // Verifica se já existe um dailyRecord para a data fornecida
      const existingDailyRecord = report?.dailyRecords.find(
        (record) => record.date === date,
      )

      if (existingDailyRecord) {
        // Se existir, adiciona o novo transporte ao dailyRecord existente
        const newTransport = {
          id: String(Math.random()), // Gera um ID único
          type,
          quantity,
          unitPrice,
          itinerary, // Include itinerary here
        }

        const updatedDailyRecords = report.dailyRecords.map((record) =>
          record.date === date
            ? {
                ...record,
                transports: [...record.transports, newTransport],
              }
            : record,
        )

        // Atualiza o estado do relatório
        setReport((prevReport) => {
          if (prevReport) {
            return {
              ...prevReport,
              dailyRecords: updatedDailyRecords,
            }
          }
          return prevReport
        })

        // Envia a atualização para o JSON Server
        await api.patch('/report', {
          dailyRecords: updatedDailyRecords,
        })
      } else {
        // Se não existir, cria um novo dailyRecord
        const newDailyRecord = {
          id: String(Math.random()), // Gera um ID único
          date,
          day: new Date(date).toLocaleDateString('pt-BR', { weekday: 'long' }), // Calcula o dia da semana
          itinerary,
          transports: [
            {
              id: String(Math.random()), // Gera um ID único
              type,
              quantity,
              unitPrice,
              itinerary, // Include itinerary here
            },
          ],
        }

        const updatedDailyRecords = [
          ...(report?.dailyRecords || []),
          newDailyRecord,
        ]

        // Atualiza o estado do relatório
        setReport((prevReport) => {
          if (prevReport) {
            return {
              ...prevReport,
              dailyRecords: updatedDailyRecords,
            }
          }
          return prevReport
        })

        // Envia a atualização para o JSON Server
        await api.patch('/report', {
          dailyRecords: updatedDailyRecords,
        })
      }
    },
    [report],
  )

  const fetchTransactions = useCallback(async (query: string) => {
    const response = await api.get('/report')
    const data = response.data
    const filteredDailyRecords = data.dailyRecords.filter((dailyRecord) => {
      return (
        dailyRecord.itinerary.toLowerCase().includes(query.toLowerCase()) ||
        dailyRecord.date.toLowerCase().includes(query.toLowerCase()) ||
        dailyRecord.transports.some((transport) => {
          return (
            transport.type.toLowerCase().includes(query.toLowerCase()) ||
            transport.quantity.toString().includes(query) ||
            transport.unitPrice.toString().includes(query)
          )
        })
      )
    })
    setReport({
      ...data,
      dailyRecords: filteredDailyRecords,
    })
  }, [])

  useEffect(() => {
    fetchReport()
  }, [fetchReport])

  return (
    <TransactionsContext.Provider
      value={{
        report,
        setReport,
        createTransport,
        fetchReport,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
