export function generateInvoiceNumber(date = new Date(), seq = 1) {
    const datePart = date.toISOString().slice(0,10).replace(/-/g,"");
    const seqPart = seq.toString().padStart(3, "0");
    return `INV-${datePart}-${seqPart}`;
}