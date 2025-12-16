export function generateSKU(objectId) {
  return `PRD-${objectId.toString().slice(-6).toUpperCase()}`;
}