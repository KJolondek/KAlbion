export class ItemModel {
    LocalizationNameVariable:        string;
    LocalizationDescriptionVariable: string;
    LocalizedNames:                  Localized;
    LocalizedDescriptions:           Localized;
    Index:                           string;
    UniqueName:                      string;
}

export class Localized {
    "EN-US": string;
    "DE-DE": string;
    "FR-FR": string;
    "RU-RU": string;
    "PL-PL": string;
    "ES-ES": string;
    "PT-BR": string;
    "ZH-CN": string;
    "KO-KR": string;
}