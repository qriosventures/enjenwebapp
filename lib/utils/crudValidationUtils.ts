import { showToastMessage } from "@/components/common/ToastMessage"

/**
 * Checks if given datasets are available.
 * @param dataSets An object where keys are dataset names and values are arrays.
 * @param entityName Optional context name (e.g., "warehouse", "city").
 * @returns `true` if all datasets exist, otherwise shows an error toast and returns `false`.
 */
export function validateRequiredData(
  dataSets: Record<string, any[]>,
  entityName?: string
): boolean {
  const missingData = Object.entries(dataSets)
    .filter(([_, arr]) => !arr || arr.length === 0)
    .map(([key]) => capitalizeFirstLetter(key))

  if (missingData?.length > 0) {
    const message =
      missingData.length === 1
        ? `${missingData[0]} data is missing.`
        : `${missingData.join(" and ")} data are missing.`

    const prefix = entityName
      ? `Cannot create ${entityName} - `
      : "Missing dependencies - "

    showToastMessage.error(`${prefix}${message}`)
    return false
  }

  return true
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
