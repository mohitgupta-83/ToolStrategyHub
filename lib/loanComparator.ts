export interface LoanParams {
    amount: number;
    rate: number; // annual percentage
    termYears: number;
    extraPayment: number;
}

export interface LoanScenarioResult {
    monthlyPaymentBase: number; // Standard Minimum
    totalInterestPaid: number;
    payoffMonths: number;
    payoffYears: number;
    savingsFromExtra: number;
    timeSavedMonths: number;
}

// Client-side amortization 
export function calculateLoanScenario(params: LoanParams): LoanScenarioResult {
    const { amount, rate, termYears, extraPayment } = params;

    // Base monthly payment: P = r(PV) / (1 - (1+r)^-n)
    const monthlyRate = rate / 100 / 12;
    const totalMonths = termYears * 12;

    let monthlyPaymentBase = 0;
    if (monthlyRate === 0) {
        monthlyPaymentBase = amount / totalMonths;
    } else {
        monthlyPaymentBase = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    }

    // Calculate base total interest if zero extra payments
    const baseTotalPaid = monthlyPaymentBase * totalMonths;
    const baseTotalInterest = baseTotalPaid - amount;

    // Calculate actual amortization with extra payment
    let balance = amount;
    let monthsActual = 0;
    let totalInterestActual = 0;
    const actualMonthlyPayment = monthlyPaymentBase + extraPayment;

    // Failsafe limit for infinite loops (e.g., negative amortization)
    const maxIterations = totalMonths * 3;

    if (actualMonthlyPayment <= amount * monthlyRate) {
        // Payment too small to cover interest, loan grows forever
        return {
            monthlyPaymentBase,
            totalInterestPaid: Infinity,
            payoffMonths: Infinity,
            payoffYears: Infinity,
            savingsFromExtra: 0,
            timeSavedMonths: 0
        };
    }

    while (balance > 0 && monthsActual < maxIterations) {
        monthsActual++;

        // add interest
        const interestCharge = balance * monthlyRate;
        totalInterestActual += interestCharge;

        // subtract payment
        balance += interestCharge;
        balance -= actualMonthlyPayment;
    }

    // Savings
    const savingsFromExtra = baseTotalInterest - totalInterestActual;
    const timeSavedMonths = totalMonths - monthsActual;

    return {
        monthlyPaymentBase: Math.ceil(monthlyPaymentBase),
        totalInterestPaid: Math.ceil(totalInterestActual),
        payoffMonths: monthsActual,
        payoffYears: Number((monthsActual / 12).toFixed(1)),
        savingsFromExtra: Math.max(0, Math.ceil(savingsFromExtra)),
        timeSavedMonths: Math.max(0, timeSavedMonths)
    };
}
