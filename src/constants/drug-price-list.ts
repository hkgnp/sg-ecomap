import {
  type Drug,
  type DrugRaw,
  type SubventionSchemeInfo,
} from '~/features/calculator/types'
import { drugRaw } from './drug-raw'
import { subventionDrugs } from './drug-subvention'

export const DRUG_PRICE_LIST: DrugRaw[] = drugRaw

export const DRUGS: Drug[] = []

/** Map from Drug to schemes */
const SUBVENTION_SCHEMES: Record<string, SubventionSchemeInfo[]> =
  subventionDrugs

// Post-processing to nest attributes
const drugMap: Record<string, DrugRaw[]> = {}
for (const drug of DRUG_PRICE_LIST) {
  const name = drug.common_name ?? drug.name
  if (!drugMap[name]) drugMap[name] = [] // empty guard
  drugMap[name]?.push(drug)
}

for (const [name, drugs] of Object.entries(drugMap)) {
  const representativeDrug = drugs[0] // assume they share the same characteristics
  if (!representativeDrug) continue // empty guard
  DRUGS.push({
    name,
    unit: representativeDrug.unit,
    form: representativeDrug.form,
    formulations: drugs.map((drug) => ({
      name: drug.name,
      strength: drug.strength,
      price: drug.price,
      item_code: drug.item_code,
      cat: drug.cat,
      eligibleSchemes: SUBVENTION_SCHEMES[drug.item_code] ?? [],
      form: drug.form,
    })),
  })
}
