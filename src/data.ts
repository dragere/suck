export type UnitDictionary = { [index: string]: { name: string, shorthand: string, toBase: (x: number) => number, fromBase: (x: number) => number }[] };

export const units: UnitDictionary = {
    'Geschwindigket': [
        { name: 'Kilometer pro Stunde', shorthand: 'kmh', toBase: x => x * 1, fromBase: x => x }
        , { name: 'Meilen pro Stunde', shorthand: 'mph', toBase: x => x * 1.609344, fromBase: x => x / 1.609344 }
        , { name: 'Metric Pace', shorthand: 'mpk', toBase: x => 60 / x , fromBase: x => 60 / x }
        , { name: 'Imperial Pace', shorthand: 'mpm', toBase: x => 60 / x * 1.609344, fromBase: x => 60 / x * 1.609344 }
    ],
    'Volumen': [
        { name: 'Liter', shorthand: 'l', toBase: x => x * 1, fromBase: x => x }
        , { name: 'Zentiliter', shorthand: 'cl', toBase: x => x / 100, fromBase: x => x * 100 }
        , { name: 'Milliliter', shorthand: 'ml', toBase: x => x / 1000, fromBase: x => x * 1000 }
        , { name: 'Mikroliter', shorthand: 'µl', toBase: x => x / 1_000_000, fromBase: x => x * 1_000_000 }
        , { name: 'Kubikmeter', shorthand: 'm3', toBase: x => x * 1000, fromBase: x => x / 1000 }
    ],
    'Länge': [
        { name: 'Meter', shorthand: 'm', toBase: x => x * 1, fromBase: x => x }
        , { name: 'Zentimeter', shorthand: 'cm', toBase: x => x / 100, fromBase: x => x * 100 }
        , { name: 'Millimeter', shorthand: 'mm', toBase: x => x / 1000, fromBase: x => x * 1000 }
        , { name: 'Mikrometer', shorthand: 'µm', toBase: x => x / 1_000_000, fromBase: x => x * 1_000_000 }
        , { name: 'Kilometer', shorthand: 'km', toBase: x => x * 1000, fromBase: x => x / 1000 }
        , { name: 'Meilen', shorthand: 'mi', toBase: x => x * 1609.344, fromBase: x => x / 1609.344 }
    ]
};