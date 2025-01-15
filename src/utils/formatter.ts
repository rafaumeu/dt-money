export const dateFormatter = new Intl.DateTimeFormat('pt-BR')
export const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
}) // Formata o dia da semana

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
