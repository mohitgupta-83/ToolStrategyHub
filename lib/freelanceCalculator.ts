export interface FreelanceParams {
    desiredIncome: number;
    expenses: number;
    taxRate: number; // percentage
    billableHoursPerWeek: number;
    vacationWeeks: number;
    profitMargin: number; // percentage
}

export interface FreelanceResult {
    hourlyRate: number;
    monthlyRetainer: number;
    projectRateSuggestion: number; // assuming 40h project
    warnings: string[];
    totalRevenueTarget: number;
    workingWeeks: number;
}

export function calculateFreelanceRate(params: FreelanceParams): FreelanceResult {
    const {
        desiredIncome,
        expenses,
        taxRate,
        billableHoursPerWeek,
        vacationWeeks,
        profitMargin
    } = params;

    // 1. Working weeks
    const workingWeeks = 52 - vacationWeeks;

    // 2. Base costs before taxes
    // Net desired income = (Gross - Expenses) * (1 - TaxRate) --> ignoring profit margin complication for a moment
    // Actually, Total Revenue = desiredIncome + taxes + expenses + profit
    // A standard way to calculate: TotalRevenue = (DesiredIncome + Expenses) / (1 - TaxRate/100)
    const preTaxTarget = (desiredIncome + expenses) / (1 - (taxRate / 100));

    // Add profit margin
    const totalRevenueTarget = preTaxTarget * (1 + (profitMargin / 100));

    // 3. Billable hours per year
    const totalBillableHours = workingWeeks * billableHoursPerWeek;

    // 4. Rates
    const hourlyRate = totalBillableHours > 0 ? totalRevenueTarget / totalBillableHours : 0;

    // Retainer based on expected monthly hours (totalBillableHours / 12)
    const monthlyRetainer = (totalBillableHours > 0) ? (hourlyRate * (totalBillableHours / 12)) : 0;

    // Standard project (e.g. 2 weeks fulltime = 80 hours total, let's say a medium 40h project)
    const projectRateSuggestion = hourlyRate * 40;

    // 5. Sustainability warnings
    const warnings: string[] = [];
    if (billableHoursPerWeek > 30) {
        warnings.push("High Billable Hours: Above 30 hours billable per week is rare. Marketing, admin, and sales usually consume 40% of your time.");
    }
    if (vacationWeeks < 2) {
        warnings.push("Burnout Risk: Planning less than 2 weeks of vacation can lead to long-term burnout.");
    }
    if (hourlyRate < 25 && hourlyRate > 0) {
        warnings.push("Low Rate Warning: This hourly rate is very low for typical freelance work. Check if you've set your desired income too low or billable hours too high.");
    }
    if (profitMargin < 10) {
        warnings.push("Low Profit Margin: Consider adding 10-20% profit margin to reinvest in your business and weather slow months.");
    }

    return {
        hourlyRate: isNaN(hourlyRate) ? 0 : Math.ceil(hourlyRate),
        monthlyRetainer: isNaN(monthlyRetainer) ? 0 : Math.ceil(monthlyRetainer),
        projectRateSuggestion: isNaN(projectRateSuggestion) ? 0 : Math.ceil(projectRateSuggestion),
        warnings,
        totalRevenueTarget: Math.ceil(totalRevenueTarget),
        workingWeeks
    };
}
