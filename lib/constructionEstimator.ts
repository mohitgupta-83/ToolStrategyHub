export interface ConstructionParams {
    materialCost: number;
    wasteFactor: number; // percentage
    laborHours: number;
    laborRate: number;
    equipmentCost: number;
    markup: number; // percentage
    riskBuffer: number; // percentage
}

export interface ConstructionResult {
    totalMaterials: number;
    totalLabor: number;
    totalEquipment: number;
    subtotal: number;
    markupAmount: number;
    riskAmount: number;
    grandTotal: number;
    profitProjection: number;
}

export function calculateConstructionEstimate(params: ConstructionParams): ConstructionResult {
    const {
        materialCost,
        wasteFactor,
        laborHours,
        laborRate,
        equipmentCost,
        markup,
        riskBuffer
    } = params;

    // Materials with waste
    const totalMaterials = materialCost * (1 + (wasteFactor / 100));

    // Labor
    const totalLabor = laborHours * laborRate;

    // Subtotal (Hard Costs)
    const subtotal = totalMaterials + totalLabor + equipmentCost;

    // Markup is typically applied to the hard costs
    const markupAmount = subtotal * (markup / 100);

    // Risk buffer is applied to hard costs + markup, or just hard costs depending on strategy. Let's use hard costs.
    const riskAmount = subtotal * (riskBuffer / 100);

    const grandTotal = subtotal + markupAmount + riskAmount;

    const profitProjection = markupAmount; // if risk is unspent, it becomes profit too, but pure markup is the projected profit

    return {
        totalMaterials: Math.ceil(totalMaterials),
        totalLabor: Math.ceil(totalLabor),
        totalEquipment: Math.ceil(equipmentCost),
        subtotal: Math.ceil(subtotal),
        markupAmount: Math.ceil(markupAmount),
        riskAmount: Math.ceil(riskAmount),
        grandTotal: Math.ceil(grandTotal),
        profitProjection: Math.ceil(profitProjection)
    };
}
