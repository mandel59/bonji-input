import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.65.0/testing/asserts.ts"

import {
    devanagari2ascii
} from "./devanagari.js"

const test = Deno.test

test("devanagari2ascii/convert devanagari text", () => {
    assertEquals(devanagari2ascii("सद्धर्मपुण्डरीकसूत्रम्"), "saddharmapu.n.dariikasuutram")
    assertEquals(devanagari2ascii("बौद्ध ग्रंथ"), "bauddha gra;mtha")
})

test("devanagari2ascii/preserve ascii text", () => {
    assertEquals(devanagari2ascii(` !"#$%&'()*+,-./0123456789:;<=>?`), ` !"#$%&'()*+,-./0123456789:;<=>?`)
    assertEquals(devanagari2ascii('@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'), '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_')
    assertEquals(devanagari2ascii('`abcdefghijklmnopqrstuvwxyz{|}~'), '`abcdefghijklmnopqrstuvwxyz{|}~')
})

