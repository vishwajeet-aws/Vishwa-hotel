import dayjs from 'dayjs';

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const formatDate = (value: string) => dayjs(value).format('DD MMM YYYY');

export const formatMonthDay = (value: string) => dayjs(value).format('DD MMM');

export const getStarLabel = (value: number) => value.toFixed(1);
