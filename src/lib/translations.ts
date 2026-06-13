import translationsJson from './translations.json'

export const translations = translationsJson
export type Lang = keyof typeof translations
export type Translations = (typeof translations)['en']
