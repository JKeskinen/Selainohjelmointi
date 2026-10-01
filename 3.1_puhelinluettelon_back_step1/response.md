# Express – `res.json()` muistio

## 1. Perusidea

Expressissä:

```js
res.json(...)
```

lähettää vastauksen JSON-muodossa.

Esimerkiksi:

```js
app.get('/test', (req, res) => {
  res.json("Hei maailma")
})
```

Vastaus:

```json
"Hei maailma"
```

---

# 2. String

```js
res.json("Hei maailma")
```

Vastaus:

```json
"Hei maailma"
```

---

# 3. Numero

```js
res.json(123)
```

Vastaus:

```json
123
```

---

# 4. Boolean

```js
res.json(true)
```

Vastaus:

```json
true
```

---

# 5. Muuttuja

```js
const nimi = "Matti"

res.json(nimi)
```

Vastaus:

```json
"Matti"
```

---

# 6. String + muuttuja

```js
const nimi = "Matti"

res.json("Henkilön nimi on " + nimi)
```

Vastaus:

```json
"Henkilön nimi on Matti"
```

Template literal:

```js
res.json(`Henkilön nimi on ${nimi}`)
```

---

# 7. Rivinvaihto stringissä

`\n` tarkoittaa rivinvaihtoa.

```js
res.json(
  "Henkilömäärä yhteensä " + persons.length +
  "\nAika: " + new Date()
)
```

Huomaa:

`res.json()` palauttaa tässä **yhden stringin**.

JSON-esityksessä se voi näkyä:

```text
"Henkilömäärä yhteensä 5\nAika: Thu Oct 01 2026..."
```

Jos haluat oikeasti useita erillisiä tietoja JSONina, käytä objektia:

```js
res.json({
  henkilomaara: persons.length,
  aika: new Date()
})
```

---

# 8. JSON-objekti

Useita tietoja voidaan palauttaa objektina:

```js
res.json({
  nimi: "Matti",
  numero: "040-123456"
})
```

Vastaus:

```json
{
  "nimi": "Matti",
  "numero": "040-123456"
}
```

---

# 9. Useita attribuutteja

```js
res.json({
  id: 1,
  nimi: "Matti",
  numero: "040-123456"
})
```

Vastaus:

```json
{
  "id": 1,
  "nimi": "Matti",
  "numero": "040-123456"
}
```

---

# 10. Attribuutin arvo muuttujasta

```js
const nimi = "Matti"
const numero = "040-123456"

res.json({
  nimi: nimi,
  numero: numero
})
```

JavaScriptin lyhyempi syntaksi:

```js
res.json({
  nimi,
  numero
})
```

Molemmat tuottavat saman JSONin.

---

# 11. JSON-taulukko

```js
const nimet = [
  "Matti",
  "Maija",
  "Teemu"
]

res.json(nimet)
```

Vastaus:

```json
[
  "Matti",
  "Maija",
  "Teemu"
]
```

---

# 12. Taulukon pituus `.length`

Jos halutaan tietää henkilöiden määrä:

```js
const hloMaara = persons.length

res.json(hloMaara)
```

Vastaus:

```json
5
```

---

# 13. Henkilömäärä tekstinä

```js
const hloMaara = persons.length

res.json("Henkilömäärä yhteensä " + hloMaara)
```

Vastaus:

```json
"Henkilömäärä yhteensä 5"
```

Huomaa:

`hloMaara` on numero.

Tämä on väärin:

```js
hloMaara.length
```

Koska numerolla ei ole `.length`-ominaisuutta.

Oikein:

```js
hloMaara
```

---

# 14. Henkilömäärä JSON-attribuuttina

```js
res.json({
  henkilomaara: persons.length
})
```

Vastaus:

```json
{
  "henkilomaara": 5
}
```

---

# 15. Henkilömäärä + aika

```js
res.json({
  henkilomaara: persons.length,
  aika: new Date()
})
```

Vastaus esimerkiksi:

```json
{
  "henkilomaara": 5,
  "aika": "2026-10-01T18:00:00.000Z"
}
```

---

# 16. Henkilömäärä + aika + muita tietoja

```js
res.json({
  henkilomaara: persons.length,
  aika: new Date(),
  palvelin: "Express",
  portti: 3001
})
```

Vastaus:

```json
{
  "henkilomaara": 5,
  "aika": "2026-10-01T18:00:00.000Z",
  "palvelin": "Express",
  "portti": 3001
}
```

---

# 17. Henkilölista

Esimerkiksi:

```js
const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Ibrow",
    number: "354-44-5346212"
  }
]
```

Koko lista:

```js
res.json(persons)
```

Vastaus:

```json
[
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Ibrow",
    "number": "354-44-5346212"
  }
]
```

---

# 18. Yksittäinen henkilö

Ensimmäinen henkilö:

```js
res.json(persons[0])
```

Vastaus:

```json
{
  "id": "1",
  "name": "Arto Hellas",
  "number": "040-123456"
}
```

Toinen henkilö:

```js
res.json(persons[1])
```

---

# 19. Yksittäinen attribuutti

Ensimmäisen henkilön nimi:

```js
res.json(persons[0].name)
```

Vastaus:

```json
"Arto Hellas"
```

Ensimmäisen henkilön numero:

```js
res.json(persons[0].number)
```

Vastaus:

```json
"040-123456"
```

Ensimmäisen henkilön ID:

```js
res.json(persons[0].id)
```

Vastaus:

```json
"1"
```

---

# 20. Useita attribuutteja samasta henkilöstä

```js
res.json({
  nimi: persons[0].name,
  numero: persons[0].number
})
```

Vastaus:

```json
{
  "nimi": "Arto Hellas",
  "numero": "040-123456"
}
```

---

# 21. Lista objektin sisällä

Voidaan palauttaa sekä henkilömäärä että koko lista:

```js
res.json({
  henkilomaara: persons.length,
  henkilöt: persons
})
```

Vastaus:

```json
{
  "henkilomaara": 5,
  "henkilöt": [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    }
  ]
}
```

---

# 22. Objektin attribuutin nimi voidaan itse määrittää

Esimerkiksi:

```js
res.json({
  maara: persons.length
})
```

tai:

```js
res.json({
  henkilomaara: persons.length
})
```

tai:

```js
res.json({
  total: persons.length
})
```

Kaikki ovat mahdollisia.

Attribuutin nimi tulee ennen kaksoispistettä:

```text
attribuutin_nimi: arvo
```

Esimerkiksi:

```js
henkilomaara: persons.length
```

---

# 23. Sisäkkäinen JSON-objekti

JSON-objektin sisällä voi olla toinen objekti:

```js
res.json({
  palvelin: {
    nimi: "Express",
    portti: 3001
  }
})
```

Vastaus:

```json
{
  "palvelin": {
    "nimi": "Express",
    "portti": 3001
  }
}
```

---

# 24. Objekti + taulukko

```js
res.json({
  henkilomaara: persons.length,
  henkilöt: persons,
  aika: new Date()
})
```

Vastaus:

```json
{
  "henkilomaara": 5,
  "henkilöt": [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    }
  ],
  "aika": "2026-10-01T18:00:00.000Z"
}
```

---

# 25. `/api/persons`

Tyypillinen Express-reitti:

```js
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
```

Tämä palauttaa koko henkilölistan JSONina.

---

# 26. `/info`

Henkilömäärä ja aika:

```js
app.get('/info', (req, res) => {
  res.json({
    henkilomaara: persons.length,
    aika: new Date()
  })
})
```

Vastaus:

```json
{
  "henkilomaara": 5,
  "aika": "2026-10-01T18:00:00.000Z"
}
```

---

# 27. Tekstiä usealle riville

Jos haluat palauttaa **tekstiä**, et JSON-objektia:

```js
app.get('/info', (req, res) => {
  res.send(
    "Henkilömäärä yhteensä " + persons.length +
    "\nAika: " + new Date()
  )
})
```

`\n` tarkoittaa rivinvaihtoa stringissä.

Jos haluat selaimessa varmasti HTML-rivit:

```js
app.get('/info', (req, res) => {
  res.send(`
    <p>Henkilömäärä yhteensä ${persons.length}</p>
    <p>Aika: ${new Date()}</p>
  `)
})
```

---

# 28. `res.json()` vs `res.send()`

## `res.json()`

Käytä JSON-datan palauttamiseen:

```js
res.json({
  nimi: "Matti",
  numero: "040-123456"
})
```

---

## `res.send()`

Käytä tekstin tai HTML:n palauttamiseen:

```js
res.send("Hei maailma")
```

HTML:

```js
res.send(`
  <h1>Puhelinluettelo</h1>
  <p>Henkilöitä: ${persons.length}</p>
`)
```

---

# 29. `res` ei sisällä `persons`-taulukkoa

Tämä on väärin:

```js
const hloMaara = res.persons.length
```

Koska `res` on Expressin response-olio.

Henkilölista on omassa muuttujassaan:

```js
const persons = [...]
```

Siksi oikea tapa on:

```js
const hloMaara = persons.length
```

---

# 30. `res.json` ei ole lista

Tämä on väärin:

```js
res.json.length
```

`res.json` on **funktio**.

Oikein:

```js
persons.length
```

Jos halutaan palauttaa määrä:

```js
res.json(persons.length)
```

---

# 31. `.length` eri tilanteissa

## Taulukko

```js
persons.length
```

= henkilöiden määrä.

---

## String

```js
const nimi = "Matti"

nimi.length
```

= merkkien määrä.

---

## Numero

```js
const maara = 5

maara.length
```

= väärin.

Numerolla ei ole `.length`-ominaisuutta.

---

# 32. Nykyinen aika

JavaScriptissä nykyinen aika:

```js
new Date()
```

JSON-vastauksessa:

```js
res.json(new Date())
```

---

# 33. ISO-aika

Jos halutaan ISO 8601 -muotoinen aika:

```js
res.json(new Date().toISOString())
```

Esimerkiksi:

```json
"2026-10-01T18:00:00.000Z"
```

---

# 34. Useita attribuutteja yhdellä kertaa

```js
const hloMaara = persons.length
const aika = new Date()

res.json({
  henkilomaara: hloMaara,
  aika: aika
})
```

Lyhyemmin:

```js
res.json({
  henkilomaara: persons.length,
  aika: new Date()
})
```

---

# 35. `JSON.stringify()` ei yleensä tarvita

Expressissä:

```js
res.json({
  nimi: "Matti"
})
```

riittää.

Ei tarvitse tehdä:

```js
res.json(JSON.stringify({
  nimi: "Matti"
}))
```

`res.json()` hoitaa JSON-muotoon muuttamisen itse.

---

# 36. Käytännön muistisääntö

```text
persons
    ↓
henkilölista

persons.length
    ↓
henkilöiden määrä

persons[0]
    ↓
ensimmäinen henkilö

persons[0].name
    ↓
ensimmäisen henkilön nimi

persons[0].number
    ↓
ensimmäisen henkilön numero

res.json(...)
    ↓
lähetä JSON-vastaus

res.send(...)
    ↓
lähetä tekstiä / HTML:ää

\n
    ↓
rivin vaihto stringissä

{ ... }
    ↓
JSON-objekti

[ ... ]
    ↓
JSON-taulukko
```

---

# 37. Tärkeimmät esimerkit yhdellä silmäyksellä

## Koko lista

```js
res.json(persons)
```

## Henkilömäärä

```js
res.json(persons.length)
```

## Henkilömäärä tekstinä

```js
res.json("Henkilömäärä: " + persons.length)
```

## Yksi henkilö

```js
res.json(persons[0])
```

## Yksi attribuutti

```js
res.json(persons[0].name)
```

## Useita attribuutteja

```js
res.json({
  nimi: persons[0].name,
  numero: persons[0].number
})
```

## Henkilömäärä + aika

```js
res.json({
  henkilomaara: persons.length,
  aika: new Date()
})
```

## Henkilömäärä + lista + aika

```js
res.json({
  henkilomaara: persons.length,
  henkilöt: persons,
  aika: new Date()
})
```

## Teksti kahdelle riville

```js
res.send(
  "Henkilömäärä: " + persons.length +
  "\nAika: " + new Date()
)
```

## HTML kahdelle riville

```js
res.send(`
  <p>Henkilömäärä: ${persons.length}</p>
  <p>Aika: ${new Date()}</p>
`)
```

---

# 38. Täysi pieni Express-esimerkki

```js
const express = require('express')
const app = express()

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.json({
    henkilomaara: persons.length,
    aika: new Date()
  })
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
```

---

# 39. Muista

```text
res.json = JSON-vastauksen lähettäminen

persons = data

persons.length = datan määrä

res.json(persons) = koko data

res.json(persons.length) = datan määrä

res.json({ ... }) = useita nimettyjä tietoja

res.send(...) = teksti / HTML

\n = rivinvaihto stringissä
```