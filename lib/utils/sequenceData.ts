// utils/sequenceData.ts

export function addSequentialId<T extends Record<string, any>>(data: T[], realIdField: keyof T, displayIdField = "id") {
  return data.map((item, index) => ({
    ...item,
    [displayIdField]: index + 1,      
    dbId: item[realIdField],          
  }));
}
