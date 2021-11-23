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
    // Extended Siddham
    "z": "z",
    "f": "f",
    "w": "w",
}

/** @type {Record<string, string>} */
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
}

/** @type {Record<string, string>} */
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
}

/** @type {Record<string, string>} */
const siddham_signs = {
    "~m": "\u{115bc}",
    ";m": "\u{115bd}",
    ".h": "\u{115be}",
}

const siddham_virama = "\u{115bf}"
const zwnj = "\u{200c}"

/** @type {Record<string, string>} */
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
        let cont = false
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
                    nonjoin = false
                }
                yield siddham_consonants[t]
                cont = true
            } else if (cont && t in siddham_consonants) {
                yield siddham_virama
                yield siddham_consonants[t]
                nonjoin = false
            } else if (cont && t in siddham_dvowels) {
                yield siddham_dvowels[t]
                cont = false
                nonjoin = false
            } else if (!cont && t in siddham_ivowels) {
                yield siddham_ivowels[t]
                cont = false
                nonjoin = false
            } else if (t in siddham_signs) {
                yield siddham_signs[t]
                nonjoin = false
            } else if (t === "+") {
                cont = true
                nonjoin = false
            } else if (t === ":") {
                if (cont) {
                    yield siddham_virama
                    yield zwnj
                    cont = false
                    nonjoin = false
                } else {
                    nonjoin = true
                }
            } else {
                if (cont) {
                    yield siddham_virama
                    yield zwnj
                    cont = false
                }
                nonjoin = false
                yield t
            }
        }
        if (cont) {
            yield siddham_virama
            yield zwnj
        }
    }
}

export function ascii2latin(/** @type {string} */ s) {
    return Array.from(parser(s)).join("")
    function* parser(/** @type {string} */ s) {
        const r = new RegExp(parser_re)
        while (true) {
            const m = r.exec(s)
            if (!m) break
            const t = m[0]
            if (t in ascii_latin) {
                yield ascii_latin[t]
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
    // Extended Siddham
    "z": "z",
    "f": "f",
    "w": "w",
    // IAST compat
    "ṛ": ",r",
    "ṝ": ",rr",
    "ḷ": ",l",
    "ḹ": ",ll",
    "ṃ": ";m",
}

const latin_replace_pattern = new RegExp(
    Object.keys(latin_ascii)
        .sort((x, y) => y.length - x.length)
        .map(escapeRegExp)
        .join("|"), "ug")

export function latin2ascii(/** @type {string} */ s) {
    return s.normalize().replace(latin_replace_pattern, (c) => latin_ascii[c])
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

const symbol_replace_pattern = Object.keys(ascii_symbol)
    .sort((x, y) => y.length - x.length)
    .map(escapeRegExp)
    .join("|")

const symbol_replace_pattern_re = new RegExp(
    symbol_replace_pattern, "g")

export function ascii2symbol(/** @type {string} */ s) {
    return s.replace(symbol_replace_pattern_re, (c) => ascii_symbol[c])
}
