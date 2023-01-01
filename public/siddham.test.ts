import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.65.0/testing/asserts.ts"

import {
    ascii2siddham
} from "./siddham.js"

const test = Deno.test

function codePoints(text: string) {
    assert(/^\s*U\+[\dA-F]{4,5}(\s+U\+[\dA-F]{4,5})*\s*$/.test(text))
    return String.fromCodePoint(...text.trim().split(/\s+/g).map(span => parseInt(span.substring(2), 16)))
}

test("ascii2siddham/a vowel letter", () => {
    assertEquals(ascii2siddham("a"), codePoints("U+11580"))
    assertEquals(ascii2siddham("aa"), codePoints("U+11581"))
    assertEquals(ascii2siddham("i"), codePoints("U+11582"))
    assertEquals(ascii2siddham("ii"), codePoints("U+11583"))
    assertEquals(ascii2siddham("u"), codePoints("U+11584"))
    assertEquals(ascii2siddham("uu"), codePoints("U+11585"))
    assertEquals(ascii2siddham(",r"), codePoints("U+11586"))
    assertEquals(ascii2siddham(",rr"), codePoints("U+11587"))
    assertEquals(ascii2siddham(",l"), codePoints("U+11588"))
    assertEquals(ascii2siddham(",ll"), codePoints("U+11589"))
    assertEquals(ascii2siddham("e"), codePoints("U+1158A"))
    assertEquals(ascii2siddham("ai"), codePoints("U+1158B"))
    assertEquals(ascii2siddham("o"), codePoints("U+1158C"))
    assertEquals(ascii2siddham("au"), codePoints("U+1158D"))
})

test("ascii2siddham/a letter with a vowel sign", () => {
    assertEquals(ascii2siddham("ka"), codePoints("U+1158E"))
    assertEquals(ascii2siddham("kaa"), codePoints("U+1158E U+115AF"))
    assertEquals(ascii2siddham("ki"), codePoints("U+1158E U+115B0"))
    assertEquals(ascii2siddham("kii"), codePoints("U+1158E U+115B1"))
    assertEquals(ascii2siddham("ku"), codePoints("U+1158E U+115B2"))
    assertEquals(ascii2siddham("kuu"), codePoints("U+1158E U+115B3"))
    assertEquals(ascii2siddham("k,r"), codePoints("U+1158E U+115B4"))
    assertEquals(ascii2siddham("k,rr"), codePoints("U+1158E U+115B5"))
})

test("ascii2siddham/consonant cluster", () => {
    assertEquals(ascii2siddham("kakka"), codePoints("U+1158E U+1158E U+115BF U+1158E"))
    assertEquals(ascii2siddham("k.sa"), codePoints("U+1158E U+115BF U+115AC"))
})

test("ascii2siddham/sign", () => {
    assertEquals(ascii2siddham("a~m"), codePoints("U+11580 U+115BC"))
    assertEquals(ascii2siddham("a;m"), codePoints("U+11580 U+115BD"))
    assertEquals(ascii2siddham("a.h"), codePoints("U+11580 U+115BE"))
    assertEquals(ascii2siddham("ka~m"), codePoints("U+1158E U+115BC"))
    assertEquals(ascii2siddham("ka;m"), codePoints("U+1158E U+115BD"))
    assertEquals(ascii2siddham("ka.h"), codePoints("U+1158E U+115BE"))
})

test("ascii2siddham/virama", () => {
    assertEquals(ascii2siddham("kakka"), codePoints("U+1158E U+1158E U+115BF U+1158E"))
    assertEquals(ascii2siddham("k.sa"), codePoints("U+1158E U+115BF U+115AC"))
})


test("ascii2siddham/separation", () => {
    assertEquals(ascii2siddham("k"), codePoints("U+1158E U+115BF"))
    assertEquals(ascii2siddham("kk"), codePoints("U+1158E U+115BF U+1158E U+115BF"))
})

test("ascii2siddham/example", () => {
    assertEquals(ascii2siddham("siddha;m"), codePoints("U+115AD U+115B0 U+1159F U+115BF U+115A0 U+115BD"))
    assertEquals(ascii2siddham("va~m"), codePoints("U+115AA U+115BC"))
    assertEquals(ascii2siddham("huu~m"), codePoints("U+115AE U+115B3 U+115BC"))
    assertEquals(ascii2siddham("h_uu~m"), codePoints("U+115AE U+115DD U+115BC"))
    assertEquals(ascii2siddham("hhuu~m"), codePoints("U+115AE U+115BF U+115AE U+115B3 U+115BC"))
    assertEquals(ascii2siddham("stva;m"), codePoints("U+115AD U+115BF U+1159D U+115BF U+115AA U+115BD"))
    assertEquals(ascii2siddham("hrii.h"), codePoints("U+115AE U+115BF U+115A8 U+115B1 U+115BE"))
    assertEquals(ascii2siddham(";srii"), codePoints("U+115AB U+115BF U+115A8 U+115B1"))
    assertEquals(ascii2siddham("yu"), codePoints("U+115A7 U+115B2"))
    assertEquals(ascii2siddham("y_u.h"), codePoints("U+115A7 U+115DC U+115BE"))
})

test("ascii2siddham/a title", () => {
    assertEquals(ascii2siddham("saddharmapu.n.dariikasuutram"), codePoints("U+115AD U+1159F U+115BF U+115A0 U+115A8 U+115BF U+115A6 U+115A2 U+115B2 U+1159C U+115BF U+1159A U+115A8 U+115B1 U+1158E U+115AD U+115B3 U+1159D U+115BF U+115A8 U+115A6 U+115BF"))
    assertEquals(ascii2siddham("aaryatriratnaanusm,rtisuutram"), codePoints("U+11581 U+115A8 U+115BF U+115A7 U+1159D U+115BF U+115A8 U+115B0 U+115A8 U+1159D U+115BF U+115A1 U+115AF U+115A1 U+115B2 U+115AD U+115BF U+115A6 U+115B4 U+1159D U+115B0 U+115AD U+115B3 U+1159D U+115BF U+115A8 U+115A6 U+115BF"))
})
