const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  return date.toLocaleDateString('cs-CZ', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default formatDate;
