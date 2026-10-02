# Phonebook – React-komponentit

## Sisällysluettelo

* [1. App.jsx](#1-appjsx)

  * [Importit](#importit)
  * [useState](#usestate)
  * [useEffect](#useeffect)
  * [axios](#axios)
* [2. Reactin tilamuuttujat](#2-reactin-tilamuuttujat)

  * [persons](#persons)
  * [newName](#newname)
  * [newNumber](#newnumber)
  * [searchTerm](#searchterm)
* [3. Henkilöiden hakeminen backendistä](#3-henkilöiden-hakeminen-backendistä)

  * [Miksi useEffect?](#miksi-useeffect)
  * [axios.get()](#axiosget)
  * [response](#response)
* [4. Henkilön poistaminen](#4-henkilön-poistaminen)

  * [id](#id)
  * [name](#name)
  * [Varmistus](#varmistus)
  * [DELETE-pyyntö](#delete-pyyntö)
  * [Henkilön poistaminen Reactin listasta](#henkilön-poistaminen-reactin-listasta)
* [5. Henkilön lisääminen](#5-henkilön-lisääminen)

  * [Mikä event on?](#mikä-event-on)
  * [preventDefault()](#preventdefault)
* [6. Henkilöolion luominen](#6-henkilöolion-luominen)
* [7. Tarkistetaan löytyykö henkilö jo](#7-tarkistetaan-löytyykö-henkilö-jo)
* [8. Jos henkilö löytyy](#8-jos-henkilö-löytyy)
* [9. Olemassa olevan henkilön päivittäminen](#9-olemassa-olevan-henkilön-päivittäminen)
* [10. Päivitetään myös Reactin lista](#10-päivitetään-myös-reactin-lista)
* [11. Lomakkeen tyhjentäminen](#11-lomakkeen-tyhjentäminen)
* [12. return](#12-return)
* [13. Uuden henkilön lisääminen](#13-uuden-henkilön-lisääminen)
* [14. Nimikentän käsittely](#14-nimikentän-käsittely)
* [15. Numerokentän käsittely](#15-numerokentän-käsittely)
* [16. Hakukentän käsittely](#16-hakukentän-käsittely)
* [17. PersonForm-komponentti](#17-personform-komponentti)
* [18. PersonForm.jsx](#18-personformjsx)
* [19. Lomake](#19-lomake)
* [20. Number input](#20-number-input)
* [21. Submit-painike](#21-submit-painike)
* [22. Filter-komponentti](#22-filter-komponentti)
* [23. Henkilöiden suodattaminen](#23-henkilöiden-suodattaminen)
* [24. Haku nimellä](#24-haku-nimellä)
* [25. Haku numerolla](#25-haku-numerolla)
* [26. OR-ehto](#26-or-ehto)
* [27. Filterin input](#27-filterin-input)
* [28. Persons-komponentin käyttäminen](#28-persons-komponentin-käyttäminen)
* [29. Persons.jsx](#29-personsjsx)
* [30. Taulukon luominen](#30-taulukon-luominen)
* [31. Henkilöiden läpikäynti mapilla](#31-henkilöiden-läpikäynti-mapilla)
* [32. key](#32-key)
* [33. Henkilön näyttäminen](#33-henkilön-näyttäminen)
* [34. Delete-painike](#34-delete-painike)
* [35. main.jsx](#35-mainjsx)
* [36. React-sovelluksen käynnistäminen](#36-react-sovelluksen-käynnistäminen)
* [37. Koko sovelluksen toimintaketju](#37-koko-sovelluksen-toimintaketju)
* [38. Uuden henkilön lisääminen](#38-uuden-henkilön-lisääminen)
* [39. Henkilön poistaminen](#39-henkilön-poistaminen)
* [40. Haku](#40-haku)
* [41. Tärkeimmät React-asiat tässä projektissa](#41-tärkeimmät-react-asiat-tässä-projektissa)
* [42. Komponenttien vastuut](#42-komponenttien-vastuut)

---

## Projektin rakenne

```text
src/

├── main.jsx

├── App.jsx

└── components/

    ├── PersonForm.jsx

    ├── Filter.jsx

    └── Persons.jsx
```

### Komponenttien yhteys

```text
App

 │

 └── PersonForm

      │

      └── Filter

           │

           └── Persons
```

`App` pitää hallussaan sovelluksen tärkeimmät tilat ja funktiot.

`PersonForm` näyttää henkilön lisäämiseen tarkoitetun lomakkeen.

`Filter` käsittelee hakua ja päättää, mitkä henkilöt näytetään.

`Persons` näyttää henkilöt taulukkona ja sisältää Delete-painikkeet.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 1. App.jsx

`App.jsx` on sovelluksen pääkomponentti.

Se:

* hakee henkilöt backendistä
* pitää henkilöt Reactin tilassa
* lisää uusia henkilöitä
* päivittää olemassa olevan henkilön
* poistaa henkilöitä
* käsittelee hakukentän muutokset
* välittää tarvittavat tiedot lapsikomponenteille

## Importit

```javascript
import { useState, useEffect } from 'react'

import axios from 'axios'

import Persons from './components/Persons'

import PersonForm from './components/PersonForm'

import Filter from './components/Filter'
```

### useState

```javascript
useState
```

`useState` antaa komponentille tilamuuttujan.

Esimerkiksi:

```javascript
const [newName, setNewName] = useState('')
```

Tässä on kaksi asiaa:

```text
newName
```

sisältää nykyisen arvon.

```text
setNewName
```

on funktio, jolla arvo muutetaan.

---

### useEffect

```javascript
useEffect
```

`useEffect` suorittaa koodia React-komponentin renderöinnin jälkeen.

Tässä sitä käytetään tietojen hakemiseen backendistä.

---

### axios

```javascript
import axios from 'axios'
```

Axiosilla tehdään HTTP-pyyntöjä backendille.

Tässä projektissa käytetään:

```text
GET     = hae henkilöt

POST    = lisää henkilö

PUT     = päivitä henkilö

DELETE  = poista henkilö
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 2. Reactin tilamuuttujat

```javascript
const [persons, setPersons] = useState([])

const [newName, setNewName] = useState('')

const [newNumber, setNewNumber] = useState('')

const [searchTerm, setSearchTerm] = useState('')
```

## persons

```javascript
const [persons, setPersons] = useState([])
```

Sisältää kaikki puhelinluettelon henkilöt.

Aluksi lista on tyhjä:

```javascript
[]
```

Kun backendistä haetaan henkilöt, lista täytetään:

```javascript
setPersons(response.data)
```

---

## newName

```javascript
const [newName, setNewName] = useState('')
```

Sisältää henkilön nimen, jota käyttäjä kirjoittaa lomakkeelle.

Esimerkiksi:

```text
newName = "Ada Lovelace"
```

---

## newNumber

```javascript
const [newNumber, setNewNumber] = useState('')
```

Sisältää käyttäjän kirjoittaman puhelinnumeron.

Esimerkiksi:

```text
newNumber = "040-1234567"
```

---

## searchTerm

```javascript
const [searchTerm, setSearchTerm] = useState('')
```

Sisältää hakukentän tekstin.

Esimerkiksi:

```text
searchTerm = "Ada"
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 3. Henkilöiden hakeminen backendistä

```javascript
useEffect(() => {

  console.log('effect')

  axios
    .get('http://localhost:3001/persons')
    .then(response => {

      console.log('promise fullfilled')

      setPersons(response.data)

    })

}, [])
```

## Miksi useEffect?

Henkilöt halutaan hakea silloin, kun `App` käynnistyy.

Tyhjä lista:

```javascript
[]
```

`useEffect`-funktion lopussa tarkoittaa, että effect suoritetaan vain kerran komponentin latautuessa.

---

## axios.get()

```javascript
axios.get('http://localhost:3001/persons')
```

Lähettää backendille GET-pyynnön.

Backend vastaa esimerkiksi:

```json
[
  {
    "id": 1,
    "name": "Ada Lovelace",
    "number": "040-1234567"
  },
  {
    "id": 2,
    "name": "Arto Hellas",
    "number": "050-7654321"
  }
]
```

---

## response

```javascript
.then(response => {
```

`response` sisältää Axiosin vastaanottaman vastauksen.

Backendin palauttama data löytyy:

```javascript
response.data
```

Sen vuoksi:

```javascript
setPersons(response.data)
```

päivittää `persons`-listan.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 4. Henkilön poistaminen

```javascript
const handleDelete = (id, name) => {
```

`handleDelete` saa kaksi parametria:

```text
id

name
```

Esimerkiksi:

```javascript
handleDelete(3, 'Ada Lovelace')
```

## id

`id` kertoo, mikä henkilö poistetaan.

## name

`name` tarvitaan käyttäjälle näytettävään varmistukseen.

---

## Varmistus

```javascript
if (window.confirm(`Delete ${name} ?`)) {
```

Selain näyttää kysymyksen:

```text
Delete Ada Lovelace ?
```

Jos käyttäjä painaa:

```text
OK
```

`confirm()` palauttaa `true`.

Jos käyttäjä painaa:

```text
Cancel
```

se palauttaa `false`.

---

## DELETE-pyyntö

```javascript
axios
  .delete(`http://localhost:3001/persons/${id}`)
```

Jos henkilön ID on `3`, pyyntö on:

```text
DELETE http://localhost:3001/persons/3
```

---

## Henkilön poistaminen Reactin listasta

```javascript
setPersons(
  persons.filter(p => p.id !== id)
)
```

`filter()` käy kaikki henkilöt läpi.

Ehto:

```javascript
p.id !== id
```

tarkoittaa:

> pidä kaikki henkilöt, joiden ID ei ole poistettavan henkilön ID.

Esimerkiksi:

```text
1 Ada

2 Arto

3 Matti
```

Kun poistetaan ID 2:

```text
1 Ada

3 Matti
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 5. Henkilön lisääminen

```javascript
const addPerson = (event) => {
```

Tämä funktio suoritetaan, kun lomake lähetetään.

## Mikä `event` on?

`event` on selaimen lähettämä tapahtumaolio.

Kun käyttäjä painaa lomakkeen:

```text
Add new person
```

selain ilmoittaa Reactille tapahtumasta.

React antaa tapahtuman tiedot funktiolle:

```javascript
addPerson(event)
```

---

## preventDefault()

```javascript
event.preventDefault()
```

Normaalisti HTML-formin lähettäminen aiheuttaisi sivun latautumisen uudelleen.

React-sovelluksessa tätä ei haluta.

Siksi:

```javascript
event.preventDefault()
```

estää selaimen normaalin toiminnan.

Tämän jälkeen React voi itse käsitellä lomakkeen.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 6. Henkilöolion luominen

```javascript
const personObject = {

  name: newName,

  number: newNumber

}
```

Luodaan JavaScript-olio.

Jos käyttäjä on kirjoittanut:

```text
Name: Ada Lovelace

Number: 040-1234567
```

syntyy:

```javascript
{
  name: 'Ada Lovelace',
  number: '040-1234567'
}
```

Tämä olio lähetetään backendille.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 7. Tarkistetaan löytyykö henkilö jo

```javascript
const existingPerson = persons.find(
  person => person.name === newName
)
```

`find()` käy `persons`-listan henkilöt läpi.

Se etsii henkilön, jonka:

```javascript
person.name
```

on sama kuin:

```javascript
newName
```

Jos henkilö löytyy:

```javascript
existingPerson
```

sisältää henkilön.

Jos henkilöä ei löydy:

```javascript
existingPerson
```

on:

```javascript
undefined
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 8. Jos henkilö löytyy

```javascript
if (existingPerson) {
```

Tämä tarkoittaa:

> Jos samanniminen henkilö löytyi, älä lisää uutta henkilöä automaattisesti.

Sen sijaan kysytään käyttäjältä, halutaanko numero vaihtaa.

```javascript
if (window.confirm(
  `${newName} is already added to phonebook, replace the old number with a new one ?`
)) {
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 9. Olemassa olevan henkilön päivittäminen

```javascript
axios
  .put(
    `http://localhost:3001/persons/${existingPerson.id}`,
    personObject
  )
```

Tässä käytetään:

```text
PUT
```

koska olemassa olevan henkilön tietoja päivitetään.

Esimerkiksi jos:

```text
Ada Lovelace

ID = 3

Vanha numero = 040-1111111
```

ja käyttäjä syöttää:

```text
040-2222222
```

lähetetään:

```text
PUT /persons/3
```

ja uusi tieto:

```javascript
{
  name: 'Ada Lovelace',
  number: '040-2222222'
}
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 10. Päivitetään myös Reactin lista

Backendin onnistuneen päivityksen jälkeen:

```javascript
.then(response => {
```

`response.data` sisältää backendin palauttaman päivitetyn henkilön.

Sitten:

```javascript
setPersons(
  persons.map(person =>
    person.id === existingPerson.id
      ? response.data
      : person
  )
)
```

`map()` käy kaikki henkilöt läpi.

Jos ID täsmää:

```javascript
person.id === existingPerson.id
```

käytetään uutta henkilöä:

```javascript
response.data
```

Muut henkilöt jäävät ennalleen:

```javascript
: person
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 11. Lomakkeen tyhjentäminen

```javascript
setNewName('')

setNewNumber('')
```

Päivityksen jälkeen lomake tyhjennetään.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 12. return

```javascript
return
```

Tämä on tärkeä kohta.

Jos henkilö löytyi ja hänen numeronsa päivitettiin, `return` lopettaa `addPerson`-funktion.

Muuten ohjelma jatkaisi alaspäin ja suorittaisi myös:

```javascript
axios.post(...)
```

Silloin päivityksen lisäksi syntyisi uusi henkilö.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 13. Uuden henkilön lisääminen

Jos `existingPerson` ei löytynyt, suoritetaan:

```javascript
axios
  .post(
    'http://localhost:3001/persons',
    personObject
  )
```

`POST` tarkoittaa tässä uuden henkilön luomista.

Backend saa esimerkiksi:

```javascript
{
  name: 'Matti Meikäläinen',
  number: '050-1234567'
}
```

## Uuden henkilön lisääminen Reactin listaan

```javascript
setPersons(
  persons.concat(response.data)
)
```

`concat()` lisää uuden henkilön listan loppuun muodostamalla uuden listan.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 14. Nimikentän käsittely

```javascript
const handleNameChange = (event) => {

  setNewName(event.target.value)

}
```

Tätä kutsutaan aina, kun käyttäjä kirjoittaa nimikenttään.

## event.target

```javascript
event.target
```

on HTML-elementti, joka aiheutti tapahtuman.

Tässä tapauksessa se on:

```html
<input>
```

## event.target.value

```javascript
event.target.value
```

on input-kentän nykyinen sisältö.

Jos käyttäjä kirjoittaa:

```text
Ada
```

arvo on:

```text
"Ada"
```

Sitten:

```javascript
setNewName("Ada")
```

päivittää Reactin tilan.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 15. Numerokentän käsittely

```javascript
const handleNumberChange = (event) => {

  setNewNumber(event.target.value)

}
```

Toimii samalla tavalla kuin nimikenttä.

Inputin sisältö tallennetaan:

```text
newNumber
```

tilamuuttujaan.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 16. Hakukentän käsittely

```javascript
const handleSearchChange = (event) => {

  setSearchTerm(event.target.value)

}
```

Kun käyttäjä kirjoittaa hakukenttään:

```text
Ada
```

Reactin tila muuttuu:

```text
searchTerm = "Ada"
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 17. PersonForm-komponentti

```javascript
<PersonForm

  newName={newName}

  newNumber={newNumber}

  handleNameChange={handleNameChange}

  handleNumberChange={handleNumberChange}

  addPerson={addPerson}

  persons={persons}

  searchTerm={searchTerm}

  handleSearchChange={handleSearchChange}

  deletePerson={handleDelete}

/>
```

Tässä `App` välittää tietoja ja funktioita `PersonForm`-komponentille.

Näitä kutsutaan:

```text
props
```

Esimerkiksi:

```javascript
newName={newName}
```

tarkoittaa:

> anna PersonForm-komponentille prop nimeltä `newName`, jonka arvona on Appin `newName`.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 18. PersonForm.jsx

```javascript
import Filter from './Filter'
```

`PersonForm` käyttää `Filter`-komponenttia.

Propsit:

```javascript
const PersonForm = ({

  newName,

  newNumber,

  handleNameChange,

  handleNumberChange,

  addPerson,

  persons,

  searchTerm,

  handleSearchChange,

  deletePerson

}) => (
```

Tässä propsit puretaan suoraan muuttujiksi.

Esimerkiksi:

```javascript
{
  newName,
  newNumber
}
```

ovat `App`-komponentilta saatuja arvoja.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 19. Lomake

```javascript
<form onSubmit={addPerson}>
```

Kun käyttäjä lähettää lomakkeen, React kutsuu:

```javascript
addPerson
```

Käytännössä tapahtuu:

```text
Submit

  ↓

addPerson(event)

  ↓

preventDefault()

  ↓

tarkistetaan löytyykö henkilö

  ↓

PUT tai POST
```

## Name input

```javascript
<input
  value={newName}
  required
  onChange={handleNameChange}
  placeholder="Name"
/>
```

### value

```javascript
value={newName}
```

Inputin arvo tulee Reactin tilasta.

### required

```javascript
required
```

Nimi pitää antaa ennen lomakkeen lähettämistä.

### onChange

```javascript
onChange={handleNameChange}
```

Kun käyttäjä kirjoittaa, kutsutaan:

```javascript
handleNameChange
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 20. Number input

```javascript
<input
  value={newNumber}
  onChange={handleNumberChange}
  placeholder="1234"
/>
```

Toimii samalla periaatteella.

Numero tallennetaan:

```text
newNumber
```

tilaan.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 21. Submit-painike

```javascript
<button type="submit">Add new person</button>
```

Koska painikkeella on:

```javascript
type="submit"
```

se lähettää:

```html
<form>
```

-lomakkeen.

Lomakkeen:

```javascript
onSubmit={addPerson}
```

kutsuu `addPerson`-funktiota.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 22. Filter-komponentti

```javascript
import Persons from "./Persons"
```

`Filter` käyttää `Persons`-komponenttia henkilöiden näyttämiseen.

Propsit:

```javascript
const Filter = ({

  persons,

  searchTerm,

  handleSearchChange,

  deletePerson

}) => {
```

Filter saa Appilta:

```text
persons

searchTerm

handleSearchChange

deletePerson
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 23. Henkilöiden suodattaminen

```javascript
const personToShow = searchTerm === ''

  ? persons

  : persons.filter(person => {

      const nameMatch =
        person.name.toLowerCase()
          .includes(searchTerm.toLowerCase())

      const numberMatch =
        person.number.includes(searchTerm)

      return nameMatch || numberMatch

    })
```

Tämä on suodatuksen tärkein kohta.

## Jos hakukenttä on tyhjä

```javascript
searchTerm === ''
```

näytetään kaikki henkilöt:

```javascript
persons
```

## Jos hakukentässä on jotain

Käytetään:

```javascript
persons.filter(...)
```

`filter()` muodostaa uuden listan henkilöistä, jotka täyttävät ehdon.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 24. Haku nimellä

```javascript
const nameMatch =
  person.name.toLowerCase()
    .includes(searchTerm.toLowerCase())
```

Muutetaan molemmat pieniksi kirjaimiksi:

```javascript
toLowerCase()
```

Tämän vuoksi haku:

```text
ada
```

löytää myös:

```text
Ada Lovelace
```

## includes()

```javascript
.includes(...)
```

tarkistaa, sisältääkö merkkijono tietyn tekstin.

Esimerkiksi:

```javascript
'Ada Lovelace'.includes('Ada')
```

antaa:

```text
true
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 25. Haku numerolla

```javascript
const numberMatch =
  person.number.includes(searchTerm)
```

Jos henkilön numero on:

```text
040-1234567
```

ja hakukentässä:

```text
123
```

tulos on:

```text
true
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 26. OR-ehto

```javascript
return nameMatch || numberMatch
```

`||` tarkoittaa OR eli TAI.

Henkilö näytetään, jos:

```text
nimi täsmää

TAI

numero täsmää
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 27. Filterin input

```javascript
<input
  value={searchTerm}
  onChange={handleSearchChange}
  placeholder="Insert name or number"
/>
```

`value` kertoo nykyisen hakutekstin.

```javascript
value={searchTerm}
```

`onChange` kutsuu:

```javascript
handleSearchChange
```

kun käyttäjä kirjoittaa.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 28. Persons-komponentin käyttäminen

```javascript
<Persons
  persons={personToShow}
  deletePerson={deletePerson}
/>
```

Tässä Filter antaa Persons-komponentille:

```text
personToShow
```

eikä koko `persons`-listaa.

Näin Persons näyttää vain hakutulokset.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 29. Persons.jsx

```javascript
const Persons = ({persons, deletePerson}) => {
```

Persons saa kaksi propsia:

```text
persons

deletePerson
```

`persons` sisältää näytettävät henkilöt.

`deletePerson` on Appissa määritelty poistofunktio.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 30. Taulukon luominen

```javascript
<table>
  <tbody>
```

HTML-taulukko alkaa.

## Otsikkorivi

```javascript
<tr>
  <td><strong>NAME</strong></td>
  <td><strong>NUMBER</strong></td>
</tr>
```

Näyttää:

```text
NAME        NUMBER
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 31. Henkilöiden läpikäynti mapilla

```javascript
{persons.map((person) => (
```

`map()` käy kaikki `persons`-listan henkilöt läpi.

Jos listassa on:

```text
Ada

Arto

Matti
```

`map()` luo jokaiselle oman `<tr>`-rivin.

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 32. key

```javascript
<tr key={person.name}>
```

React tarvitsee listan elementeille `key`-arvon.

Sen avulla React pystyy tunnistamaan eri rivit.

Tässä käytetään:

```javascript
person.name
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 33. Henkilön näyttäminen

```javascript
<td>{person.name}</td>

<td>{person.number}</td>
```

Näyttää henkilön:

```text
name

number
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 34. Delete-painike

```javascript
<button
  onClick={() => deletePerson(person.id, person.name)}
>
  Delete
</button>
```

Kun käyttäjä painaa Delete:

```javascript
deletePerson(person.id, person.name)
```

kutsutaan.

Esimerkiksi:

```javascript
deletePerson(3, 'Ada Lovelace')
```

Koska `deletePerson` on alun perin `App`-komponentin:

```javascript
handleDelete
```

funktio, lopulta suoritetaan Appin `handleDelete`.

Tieto kulkee siis näin:

```text
Persons

   │

   │ deletePerson(id, name)

   ↓

Filter

   │

   ↓

PersonForm

   │

   ↓

App.handleDelete()

   │

   ↓

axios.delete()

   │

   ↓

Backend
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 35. main.jsx

```javascript
import ReactDOM from 'react-dom/client'

import axios from 'axios'

import App from './App'
```

`main.jsx` käynnistää React-sovelluksen.

`App` tuodaan:

```javascript
import App from './App'
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 36. React-sovelluksen käynnistäminen

```javascript
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />)
```

Tässä React etsii HTML-sivulta elementin:

```html
<div id="root"></div>
```

ja renderöi `App`-komponentin sen sisälle.

Käytännössä:

```text
index.html

   │

   └── <div id="root">

          │

          └── App

               │

               └── PersonForm

                    │

                    └── Filter

                         │

                         └── Persons
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 37. Koko sovelluksen toimintaketju

Kun sovellus käynnistyy:

```text
main.jsx

   ↓

App

   ↓

useEffect

   ↓

axios.get()

   ↓

Backend

   ↓

response.data

   ↓

setPersons()

   ↓

React renderöi uudelleen
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 38. Uuden henkilön lisääminen

Kun käyttäjä kirjoittaa:

```text
Name: Ada Lovelace

Number: 040-1234567
```

tapahtuu:

```text
Input

 ↓

onChange

 ↓

handleNameChange()

 ↓

setNewName()
```

ja numerolle:

```text
Input

 ↓

onChange

 ↓

handleNumberChange()

 ↓

setNewNumber()
```

Kun käyttäjä painaa:

```text
Add new person
```

tapahtuu:

```text
form onSubmit

   ↓

addPerson(event)

   ↓

preventDefault()

   ↓

persons.find()

   ↓

löytyikö henkilö?
```

Jos ei löytynyt:

```text
POST

 ↓

Backend

 ↓

response.data

 ↓

setPersons()
```

Jos löytyi:

```text
PUT

 ↓

Backend

 ↓

response.data

 ↓

setPersons()
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 39. Henkilön poistaminen

```text
Delete-painike

   ↓

deletePerson(id, name)

   ↓

App.handleDelete()

   ↓

window.confirm()

   ↓

axios.delete()

   ↓

Backend

   ↓

setPersons()

   ↓

henkilö poistuu näkymästä
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 40. Haku

```text
Hakukenttä

   ↓

handleSearchChange()

   ↓

setSearchTerm()

   ↓

Filter

   ↓

persons.filter()

   ↓

personToShow

   ↓

Persons
```

Haku toimii sekä:

```text
nimellä
```

että:

```text
numerolla
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 41. Tärkeimmät React-asiat tässä projektissa

## useState

Tallentaa muuttuvaa tietoa:

```javascript
const [persons, setPersons] = useState([])
```

---

## useEffect

Suorittaa koodia komponentin renderöinnin jälkeen:

```javascript
useEffect(() => {

  ...

}, [])
```

---

## props

Välittää tietoa komponentilta toiselle:

```javascript
<PersonForm
  persons={persons}
/>
```

---

## event

Kertoo käyttäjän tekemästä tapahtumasta:

```javascript
const handleNameChange = (event) => {
```

---

## event.target.value

Kertoo input-kentän nykyisen arvon:

```javascript
event.target.value
```

---

## map

Käy listan läpi ja muodostaa jokaisesta elementistä uuden arvon:

```javascript
persons.map(person => ...)
```

Tässä sitä käytetään HTML-rivien luomiseen.

---

## filter

Suodattaa listasta vain halutut elementit:

```javascript
persons.filter(person => ...)
```

Tässä sitä käytetään hakutoimintoon ja henkilön poistamiseen.

---

## find

Etsii listasta ensimmäisen ehdon täyttävän henkilön:

```javascript
persons.find(person => person.name === newName)
```

Tässä sillä tarkistetaan, löytyykö sama nimi jo puhelinluettelosta.

---

## concat

Lisää uuden arvon listan loppuun muodostamalla uuden listan:

```javascript
persons.concat(response.data)
```

---

## Axios

Kommunikoi backendin kanssa:

```text
GET     hae

POST    lisää

PUT     päivitä

DELETE  poista
```

[↑ Takaisin ylös](#phonebook--react-komponentit)

---

# 42. Komponenttien vastuut

| Komponentti  | Vastuu                                       |
| ------------ | -------------------------------------------- |
| `App`        | Tilat, backend-yhteys ja päälogiikka         |
| `PersonForm` | Uuden henkilön syöttölomake                  |
| `Filter`     | Hakukenttä ja henkilöiden suodatus           |
| `Persons`    | Henkilöiden näyttäminen ja Delete-painikkeet |
| `main.jsx`   | React-sovelluksen käynnistäminen             |

Tärkeä periaate on, että `persons`-tila sijaitsee `App`-komponentissa.

Muut komponentit saavat tarvitsemansa tiedot ja funktiot `props`-parametrien kautta.

[↑ Takaisin ylös](#phonebook--react-komponentit)
