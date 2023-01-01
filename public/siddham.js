// SPDX-License-Identifier: MIT

/** @type {Record<string, string>} */
const ascii_latin = {
    " ": " ",
    "-": "-",
    ":": ":",
    "+": "+",
    "a": "a",
    "aa": "ā",
    "i": "i",
    "ii": "ī",
    "__i": "i\u{0333}",
    "_i": "i\u{0332}",
    "_ii": "ī\u{0332}",
    "u": "u",
    "uu": "ū",
    "_u": "u\u{0332}",
    "_uu": "ū\u{0332}",
    ",r": "r̥",
    ",rr": "r̥̄",
    ",l": "l̥",
    ",ll": "l̥̄",
    "e": "e",
    "ai": "ai",
    "o": "o",
    "au": "au",
    "~m": "m̐",
    ";m": "ṁ",
    ".h": "ḥ",
    "k": "k",
    "kh": "kh",
    "g": "g",
    "gh": "gh",
    ";n": "ṅ",
    "c": "c",
    "ch": "ch",
    "j": "j",
    "jh": "jh",
    "~n": "ñ",
    ".t": "ṭ",
    ".th": "ṭh",
    ".d": "ḍ",
    ".dh": "ḍh",
    ".n": "ṇ",
    "t": "t",
    "th": "th",
    "d": "d",
    "dh": "dh",
    "n": "n",
    "p": "p",
    "ph": "ph",
    "b": "b",
    "bh": "bh",
    "m": "m",
    "y": "y",
    "r": "r",
    "l": "l",
    "v": "v",
    ";s": "ś",
    ".s": "ṣ",
    "s": "s",
    "h": "h",
    // long vowels - Shiddham does not distinguish long and short e/o.
    "ee": "e",
    "oo": "o",
    // Extended Siddham
    "z": "z",
    "f": "f",
    "w": "w",
}

/** @type {Record<string, string>} */
const ascii_iast = {
    ...ascii_latin,
    ",r": "ṛ",
    ",rr": "ṝ",
    ",l": "ḷ",
    ",ll": "ḹ",
    ";m": "ṃ",
}

/** independent vowels (vowel letters) @type {Record<string, string>} */
const siddham_ivowels = {
    "a": "\u{11580}",
    "aa": "\u{11581}",
    "i": "\u{11582}",
    "ii": "\u{11583}",
    "__i": "\u{115d8}",
    "_i": "\u{115d9}",
    "_ii": "\u{115da}",
    "u": "\u{11584}",
    "uu": "\u{11585}",
    "_u": "\u{115db}",
    ",r": "\u{11586}",
    ",rr": "\u{11587}",
    ",l": "\u{11588}",
    ",ll": "\u{11589}",
    "e": "\u{1158a}",
    "ai": "\u{1158b}",
    "o": "\u{1158c}",
    "au": "\u{1158d}",
    // long vowels - Shiddham does not distinguish long and short e/o.
    "ee": "\u{1158a}",
    "oo": "\u{1158c}",
}

/** dependent vowels (vowel signs) @type {Record<string, string>} */
const siddham_dvowels = {
    "a": "",
    "aa": "\u{115af}",
    "i": "\u{115b0}",
    "ii": "\u{115b1}",
    "u": "\u{115b2}",
    "uu": "\u{115b3}",
    "_u": "\u{115dc}",
    "_uu": "\u{115dd}",
    ",r": "\u{115b4}",
    ",rr": "\u{115b5}",
    "e": "\u{115b8}",
    "ai": "\u{115b9}",
    "o": "\u{115ba}",
    "au": "\u{115bb}",
    // long vowels - Shiddham does not distinguish long and short e/o.
    "ee": "\u{115b8}",
    "oo": "\u{115ba}",
}

/** @type {Record<string, string>} */
const siddham_signs = {
    "~m": "\u{115bc}",
    ";m": "\u{115bd}",
    ".h": "\u{115be}",
}

const siddham_virama = "\u{115bf}"
const zwnj = "\u{200c}"

/** consonants @type {Record<string, string>} */
const siddham_consonants = {
    "k": "\u{1158e}",
    "kh": "\u{1158f}",
    "g": "\u{11590}",
    "gh": "\u{11591}",
    ";n": "\u{11592}",
    "c": "\u{11593}",
    "ch": "\u{11594}",
    "j": "\u{11595}",
    "jh": "\u{11596}",
    "~n": "\u{11597}",
    ".t": "\u{11598}",
    ".th": "\u{11599}",
    ".d": "\u{1159a}",
    ".dh": "\u{1159b}",
    ".n": "\u{1159c}",
    "t": "\u{1159d}",
    "th": "\u{1159e}",
    "d": "\u{1159f}",
    "dh": "\u{115a0}",
    "n": "\u{115a1}",
    "p": "\u{115a2}",
    "ph": "\u{115a3}",
    "b": "\u{115a4}",
    "bh": "\u{115a5}",
    "m": "\u{115a6}",
    "y": "\u{115a7}",
    "r": "\u{115a8}",
    "l": "\u{115a9}",
    "v": "\u{115aa}",
    ";s": "\u{115ab}",
    ".s": "\u{115ac}",
    "s": "\u{115ad}",
    "h": "\u{115ae}",
    // Extended Siddham
    "z": "\u{11595}\u{115c0}",
    "f": "\u{115a3}\u{115c0}",
    "w": "\u{115aa}\u{115c0}",
}

function escapeRegExp(/** @type {string} */ s) {
    return s.replace(/([\\\[\]()|.+*?^$])/g, "\\$1")
}

const parser_re = new RegExp(
    Array.from(new Set(Object.keys(ascii_latin)))
        .sort((x, y) => y.length - x.length)
        .map(escapeRegExp)
        .join('|') + "|[\\s\\S]", "uy")

export function ascii2siddham(/** @type {string} */ s, { ignoreSpacesAndHyphens = false } = {}) {
    return Array.from(parser(s)).join("")
    function* parser(/** @type {string} */ s) {
        const r = new RegExp(parser_re)
        /**
         * Continuation flag.
         * True if the previous character token is a consonant.
         * Insert virama if this flag is set and the current character token is not a vowel.
         */
        let cont = false
        /**
         * Non-join flag.
         * True if the previous token is a separator `"":""` and `cont` is true.
         * Yield ZWNJ if the current character token is a consonant.
         */
        let nonjoin = false
        while (true) {
            const m = r.exec(s)
            if (!m) break
            const t = m[0]
            if (ignoreSpacesAndHyphens && (t === " " || t === "-")) {
                continue
            }
            if (!cont && t in siddham_consonants) {
                if (nonjoin) {
                    yield zwnj
                }
                yield siddham_consonants[t]
                void ([cont, nonjoin] = [true, false])
            } else if (cont && t in siddham_consonants) {
                yield siddham_virama
                yield siddham_consonants[t]
                void ([cont, nonjoin] = [true, false])
            } else if (cont && t in siddham_dvowels) {
                yield siddham_dvowels[t]
                void ([cont, nonjoin] = [false, false])
            } else if (!cont && t in siddham_ivowels) {
                yield siddham_ivowels[t]
                void ([cont, nonjoin] = [false, false])
            } else if (t in siddham_signs) {
                yield siddham_signs[t]
                void ([cont, nonjoin] = [false, false])
            } else if (t === "+") {
                [cont, nonjoin] = [true, false]
            } else if (t === ":") {
                if (cont) {
                    yield siddham_virama
                    void ([cont, nonjoin] = [false, true])
                }
            } else {
                if (cont) {
                    yield siddham_virama
                }
                yield t
                void ([cont, nonjoin] = [false, false])
            }
        }
        if (cont) {
            yield siddham_virama
        }
    }
}

const latin_translitarations = {
    ISO15919: ascii_latin,
    IAST: ascii_iast,
}

export function ascii2latin(
    /** @type {string} */ s,
    /** @type {{ transliteration?: keyof typeof latin_translitarations }} */ options = {},
) {
    const map = latin_translitarations[options.transliteration ?? "ISO15919"]
    return Array.from(parser(s)).join("")
    function* parser(/** @type {string} */ s) {
        const r = new RegExp(parser_re)
        while (true) {
            const m = r.exec(s)
            if (!m) break
            const t = m[0]
            if (t in map) {
                yield map[t]
            } else {
                yield t
            }
        }
    }
}

/** @type {Record<string, string>} */
const latin_ascii = {
    ":": ":",
    "a": "a",
    "ā": "aa",
    "i": "i",
    "ī": "ii",
    "i\u{0333}": "__i",
    "i\u{0332}": "_i",
    "ī\u{0332}": "_ii",
    "u": "u",
    "ū": "uu",
    "u\u{0332}": "_u",
    "ū\u{0332}": "_uu",
    "r̥": ",r",
    "r̥̄": ",rr",
    "l̥": ",l",
    "l̥̄": ",ll",
    "e": "e",
    "ai": "ai",
    "o": "o",
    "au": "au",
    "m̐": "~m",
    "ṁ": ";m",
    "ḥ": ".h",
    "k": "k",
    "kh": "kh",
    "g": "g",
    "gh": "gh",
    "ṅ": ";n",
    "c": "c",
    "ch": "ch",
    "j": "j",
    "jh": "jh",
    "ñ": "~n",
    "ṭ": ".t",
    "ṭh": ".th",
    "ḍ": ".d",
    "ḍh": ".dh",
    "ṇ": ".n",
    "t": "t",
    "th": "th",
    "d": "d",
    "dh": "dh",
    "n": "n",
    "p": "p",
    "ph": "ph",
    "b": "b",
    "bh": "bh",
    "m": "m",
    "y": "y",
    "r": "r",
    "l": "l",
    "v": "v",
    "ś": ";s",
    "ṣ": ".s",
    "s": "s",
    "h": "h",
    // long vowels - Shiddham does not distinguish long and short e/o.
    "ē": "e",
    "ō": "o",
    // Extended Siddham
    "z": "z",
    "f": "f",
    "w": "w",
    // IAST compat
    "ṛ": ",r",
    ".r": ",r",
    "ṝ": ",rr",
    ".rr": ",rr",
    "ḷ": ",l",
    ".l": ",l",
    "ḹ": ",ll",
    ".ll": ",ll",
    "ṃ": ";m",
    ".m": ";m",
}

/** @type {Record<string, string>} */
const kh_ascii = {
    "a": "a",
    "A": "aa",
    "aa": "aa",
    "i": "i",
    "I": "ii",
    "ii": "ii",
    "u": "u",
    "U": "uu",
    "uu": "uu",
    "R": ",r",
    "q": ",rr",
    "RR": ",rr",
    "L": ",l",
    "lR": ",l",
    "E": ",ll",
    "LL": ",ll",
    "lRR": ",ll",
    "e": "e",
    "ai": "ai",
    "o": "o",
    "au": "au",
    "M": ";m",
    "~M": "~m",
    "H": ".h",
    "k": "k",
    "kh": "kh",
    "g": "g",
    "gh": "gh",
    "G": ";n",
    "c": "c",
    "ch": "ch",
    "j": "j",
    "jh": "jh",
    "J": "~n",
    "T": ".t",
    "Th": ".th",
    "D": ".d",
    "Dh": ".dh",
    "N": ".n",
    "t": "t",
    "th": "th",
    "d": "d",
    "dh": "dh",
    "n": "n",
    "p": "p",
    "ph": "ph",
    "b": "b",
    "bh": "bh",
    "m": "m",
    "y": "y",
    "r": "r",
    "l": "l",
    "v": "v",
    "z": ";s",
    "S": ".s",
    "s": "s",
    "h": "h",
}

/**
 * @param {Record<string, string>} m 
 * @returns {(s: string) => string}
 */
function patternMapper(m) {
    function replacePattern(/** @type {Record<string, string>} */ m) {
        return new RegExp(
            Object.keys(m)
                .sort((x, y) => y.length - x.length)
                .map(escapeRegExp)
                .join("|"), "ug")
    }
    return (/** @type {string} */ s) => {
        return s.replace(replacePattern(m), (c) => m[c])
    }
}

const iso15919_mapper = patternMapper(latin_ascii)

/** @type {Record<"ISO15919" | "KH", (s: string) => string} */
const input_methods = {
    ISO15919: (s) => iso15919_mapper(s.toLowerCase()),
    KH: patternMapper(kh_ascii),
}

export function latin2ascii(
    /** @type {string} */ s,
    /** @type {{ inputMethod?: keyof typeof input_methods }} */ options = {},
) {
    const inputMethod = options.inputMethod ?? "ISO15919"
    return input_methods[inputMethod](s.normalize())
}

/** @type {Record<string, string>} */
const ascii_symbol = {
    "--": "\u{115c1}",
    ",,": "\u{115c2}",
    "..": "\u{115c3}",
    "*": "\u{115c4}",
    "|": "\u{115c5}",
    "||": "\u{115c9}",
    "2": "\u{115c6}",
    "@": "\u{115c7}",
    "=": "\u{115c8}",
}

export const ascii2symbol = patternMapper(ascii_symbol)
