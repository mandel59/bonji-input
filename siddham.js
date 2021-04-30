// SPDX-License-Identifier: MIT

const ascii_latin = {
    ":": ":",
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
}

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

const siddham_signs = {
    ":": "",
    "~m": "\u{115bc}",
    ";m": "\u{115bd}",
    ".h": "\u{115be}",
}

const siddham_virama = "\u{115bf}"

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
}

function escapeRegExp(s) {
    return s.replace(/([-\\\[\]().+?])/g, "\\$1")
}

const re = new RegExp(
    Array.from(new Set(Object.keys(ascii_latin)))
        .sort((x, y) => y.length - x.length)
        .map(escapeRegExp)
        .join('|') + "|.", "uy")

function ascii2siddham(s) {
    return Array.from(parser(s)).join("")
    function* parser(s) {
        const r = new RegExp(re)
        let cont = false
        while (true) {
            const m = r.exec(s)
            if (!m) break
            const t = m[0]
            if (!cont && t in siddham_consonants) {
                yield siddham_consonants[t]
                cont = true
            } else if (cont && t in siddham_consonants) {
                yield siddham_virama
                yield siddham_consonants[t]
            } else if (cont && t in siddham_dvowels) {
                yield siddham_dvowels[t]
                cont = false
            } else if (!cont && t in siddham_ivowels) {
                yield siddham_ivowels[t]
            } else if (t in siddham_signs) {
                yield siddham_signs[t]
            } else {
                if (cont) {
                    yield siddham_virama
                    cont = false
                }
                yield t
            }
        }
        if (cont) {
            yield siddham_virama
        }
    }
}

function ascii2latin(s) {
    return Array.from(parser(s)).join("")
    function* parser(s) {
        const r = new RegExp(re)
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
