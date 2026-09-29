import type { Locale } from "@/lib/i18n";
import { DICT_EN } from "./dict.en";
import { DICT_KO, type Dict } from "./dict.ko";

export type { Dict };

const DICTS: Record<Locale, Dict> = { ko: DICT_KO, en: DICT_EN };

export function getDict(locale: Locale): Dict {
  return DICTS[locale];
}
