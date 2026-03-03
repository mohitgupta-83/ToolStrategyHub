export const CURRENCY_RATES = {
    USD: { rate: 1, symbol: '$', locale: 'en-US' },
    EUR: { rate: 0.92, symbol: '€', locale: 'de-DE' },
    INR: { rate: 83, symbol: '₹', locale: 'en-IN' }
} as const;

export type CurrencyCode = keyof typeof CURRENCY_RATES;

export function formatCurrency(amount: number, currency: CurrencyCode): string {
    const config = CURRENCY_RATES[currency];
    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}
