export default function formatDateTime(date: string | number | Date) {
  const newDate = new Date(date);

  if (newDate.getFullYear() === 1969 || newDate.toString() === 'Invalid Date') {
    console.log('A data fornecida é inválida.');
    return '!';
  }

  return newDate
    .toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .split(',')
    .join('');
}
