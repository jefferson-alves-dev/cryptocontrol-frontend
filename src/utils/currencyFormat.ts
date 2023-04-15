const format = (value: number) => {
  const x = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return x.format(value);
};

export default format;
