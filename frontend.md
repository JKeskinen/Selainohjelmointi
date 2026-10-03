# Frontend – Full Stack Open -pohjainen frontend-ohje

Tämä dokumentti kokoaa Full Stack Open -kurssin osien 1–3 keskeiset asiat yhdeksi käytännön ohjeeksi. Painopiste on siinä, miten React-frontend, Express/Node.js-backend ja tietokanta liittyvät toisiinsa.

## 1. Kokonaisarkkitehtuuri

Tyypillinen kokonaisuus:

```text
Selain
  |
  | HTTP: GET / POST / PUT / DELETE
  v
React-frontend
  |
  | Axios / fetch
  v
Express + Node.js -backend
  |
  | Mongoose
  v
MongoDB
```

Frontend vastaa käyttöliittymästä ja käyttäjän toiminnasta.

Backend vastaa API-rajapinnasta, liiketoimintalogiikasta ja tietokantaan käsittelystä.

Tietokanta säilyttää datan pysyvästi.

Tärkeä periaate:

```text
React ei yleensä keskustele suoraan MongoDB:n kanssa.
React -> HTTP API -> Express -> MongoDB
```

---

# OSA 1 – React

## 2. React-komponentit

React-sovellus koostuu komponenteista.

Esimerkiksi:

```jsx
const Hello = ({ name }) => {
  return <h1>Hello {name}</h1>
}
```

Komponentti voidaan renderöidä:

```jsx
<Hello name="Juho" />
```

Props ovat komponentille annettavaa tietoa.

### Props vs state

**Props**
- tulevat komponentin ulkopuolelta
- komponentti ei itse omista niitä

**State**
- komponentin oma muuttuva tila
- tilan muuttaminen aiheuttaa uuden renderöinnin

---

## 3. State

Reactin tilaa hallitaan esimerkiksi `useState`-hookilla:

```jsx
import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <button onClick={() => setCounter(counter + 1)}>
      {counter}
    </button>
  )
}
```

Tärkeä asia:

```text
setCounter(...)
       |
       v
state muuttuu
       |
       v
React renderöi komponentin uudelleen
```

Statea ei pidä muuttaa suoraan.

Väärin:

```js
counter = counter + 1
```

Oikein:

```js
setCounter(counter + 1)
```

---

# 4. Tapahtumankäsittely

Reactissa tapahtumat liitetään esimerkiksi `onClick`- ja `onChange`-attribuuteilla.

```jsx
<button onClick={handleClick}>
  Lisää
</button>
```

Funktio:

```js
const handleClick = () => {
  console.log('Klikattu')
}
```

Formissa:

```jsx
<input
  value={name}
  onChange={event => setName(event.target.value)}
/>
```

Tässä input on kontrolloitu komponentti: Reactin state sisältää inputin arvon.

---

# 5. JavaScriptin tärkeät asiat

Full Stack Openin JavaScript-osassa tarvitaan erityisesti:

- muuttujat
- funktiot
- arrow functionit
- taulukot
- oliot
- destructuring
- map
- filter
- find
- spread-syntaksi
- promise
- async/await
- moduulit

Esimerkiksi:

```js
const persons = [
  { name: 'Arto', age: 20 },
  { name: 'Matti', age: 30 }
]

const names = persons.map(person => person.name)
```

Tuloksena:

```js
['Arto', 'Matti']
```

`map()` on Reactissa erityisen tärkeä, koska sillä renderöidään kokoelmia.

---

# 6. Kokoelmien renderöinti

```jsx
const persons = [
  { id: 1, name: 'Arto' },
  { id: 2, name: 'Matti' }
]

const App = () => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.id}>{person.name}</p>
      )}
    </div>
  )
}
```

`key` auttaa Reactia tunnistamaan listan yksittäiset elementit.

---

# 7. Monimutkaisempi state

Kun tila koostuu esimerkiksi olioista tai taulukoista, state pitää päivittää muuttamatta alkuperäistä dataa.

Esimerkiksi:

```js
setPersons(persons.concat(newPerson))
```

tai spread-syntaksilla:

```js
setPersons([...persons, newPerson])
```

Poisto:

```js
setPersons(persons.filter(person => person.id !== id))
```

Päivitys:

```js
setPersons(
  persons.map(person =>
    person.id === id
      ? { ...person, number: newNumber }
      : person
  )
)
```

---

# 8. Reactin debuggaus

Kun sovellus ei toimi:

1. Katso selaimen Console.
2. Katso Network-välilehti.
3. Tarkista React-komponentin state.
4. Lisää väliaikaisia `console.log`-tulosteita.
5. Tarkista backendin terminaali.
6. Tarkista HTTP-statuskoodi.
7. Tarkista requestin ja responsen sisältö.

Älä yritä korjata kaikkea kerralla.

---

# OSA 2 – Reactin ja palvelimen yhdistäminen

## 9. Frontendin ja backendin välinen kommunikointi

React tarvitsee HTTP API:n saadakseen palvelimella olevan datan.

Esimerkiksi:

```text
React
  |
  | GET /api/persons
  v
Express
  |
  v
data
  |
  | JSON
  v
React
```

Frontend voi käyttää esimerkiksi Axiosia:

```bash
npm install axios
```

---

# 10. Datan hakeminen

Esimerkki:

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      {persons.map(person =>
        <p key={person.id}>{person.name}</p>
      )}
    </div>
  )
}
```

### Mitä tapahtuu?

```text
React-komponentti käynnistyy
        |
        v
useEffect suoritetaan
        |
        v
axios.get(...)
        |
        v
HTTP GET
        |
        v
Express vastaanottaa pyynnön
        |
        v
Express palauttaa JSON-datan
        |
        v
response.data
        |
        v
setPersons(...)
        |
        v
React renderöi datan
```

---

# 11. useEffect

`useEffect` sopii sivuvaikutuksiin, kuten palvelimelta datan hakemiseen.

```jsx
useEffect(() => {
  // haetaan data
}, [])
```

Tyhjä riippuvuuslista tarkoittaa, että efekti suoritetaan komponentin ensimmäisen renderöinnin yhteydessä.

---

# 12. Lomakkeet

React-formi:

```jsx
const [name, setName] = useState('')
const [number, setNumber] = useState('')

const handleSubmit = event => {
  event.preventDefault()

  const person = {
    name,
    number
  }

  console.log(person)
}
```

Form:

```jsx
<form onSubmit={handleSubmit}>
  <input
    value={name}
    onChange={event => setName(event.target.value)}
  />

  <input
    value={number}
    onChange={event => setNumber(event.target.value)}
  />

  <button type="submit">Lisää</button>
</form>
```

`event.preventDefault()` estää selaimen normaalin lomakkeen lähetyksen.

---

# 13. Datan lisääminen backendille

Axiosilla:

```js
axios
  .post('/api/persons', person)
  .then(response => {
    setPersons(persons.concat(response.data))
  })
```

HTTP:

```text
POST /api/persons
Content-Type: application/json

{
  "name": "Arto",
  "number": "12345"
}
```

Backend käsittelee requestin ja palauttaa yleensä luodun objektin.

---

# 14. Datan muuttaminen

HTTP-metodeja:

```text
GET     hae
POST    luo
PUT     päivitä
DELETE  poista
```

Esimerkiksi:

```js
axios
  .put(`/api/persons/${id}`, updatedPerson)
  .then(response => {
    setPersons(
      persons.map(person =>
        person.id === id ? response.data : person
      )
    )
  })
```

Poisto:

```js
axios.delete(`/api/persons/${id}`)
```

---

# 15. Frontendin ja backendin suhde

Esimerkiksi nappi:

```jsx
<button onClick={() => deletePerson(person.id)}>
  Poista
</button>
```

voi johtaa tähän ketjuun:

```text
Käyttäjä painaa nappia
        |
        v
React deletePerson()
        |
        v
axios.delete()
        |
        v
HTTP DELETE
        |
        v
Express route
        |
        v
tietokanta
        |
        v
HTTP response
        |
        v
React päivittää staten
        |
        v
käyttöliittymä päivittyy
```

Tämän ketjun ymmärtäminen on yksi koko stackin tärkeimmistä asioista.

---

# 16. Tyylit

Reactiin voidaan lisätä CSS esimerkiksi:

```jsx
import './index.css'
```

CSS:

```css
.container {
  padding: 20px;
}

.error {
  color: red;
}
```

Komponentissa:

```jsx
<div className="container">
  ...
</div>
```

Reactissa käytetään `className`, ei HTML:n `class`-attribuuttia.

---

# OSA 3 – Node.js ja Express

# 17. Backendin perusteet

Node.js mahdollistaa JavaScriptin suorittamisen palvelimella.

Express helpottaa HTTP-palvelimen ja API-rajapintojen rakentamista.

Asennus:

```bash
npm init
npm install express
```

Esimerkki:

```js
const express = require('express')

const app = express()

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

# 18. Express route

Route määrittää, mitä palvelin tekee tietylle HTTP-pyynnölle.

```js
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
```

Osat:

```text
app.get
  |
  +-- HTTP-metodi

'/api/persons'
  |
  +-- URL-polku

(request, response)
  |
  +-- request = asiakkaan pyyntö
  +-- response = palvelimen vastaus
```

---

# 19. Request ja response

Requestista voidaan lukea esimerkiksi:

```js
request.params
request.query
request.body
```

URL-parametri:

```js
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
})
```

Jos URL on:

```text
/api/persons/123
```

niin:

```js
request.params.id
```

on:

```text
123
```

---

# 20. JSON-body ja express.json()

Jos frontend lähettää JSON-dataa POSTilla:

```json
{
  "name": "Arto",
  "number": "12345"
}
```

Express tarvitsee JSON-middlewareen:

```js
app.use(express.json())
```

Sen jälkeen:

```js
request.body
```

sisältää JSON-datan JavaScript-oliona.

Tärkeää: middleware pitää rekisteröidä ennen routea, joka tarvitsee `request.body`-dataa.

---

# 21. Middleware

Middleware on Expressin käsittelyketjun osa.

Esimerkiksi:

```js
app.use(express.json())
```

Middleware voi:

- käsitellä requestia
- lisätä requestiin tietoa
- kirjata tapahtumia
- tarkistaa autentikoinnin
- käsitellä virheitä
- siirtää pyynnön seuraavaan vaiheeseen

Tyypillinen järjestys:

```text
request
   |
   v
express.json()
   |
   v
morgan()
   |
   v
route
   |
   v
error handler
   |
   v
response
```

Middlewarejen järjestyksellä on merkitystä.

---

# 22. Morgan

Morgan on HTTP-requestien lokitukseen tarkoitettu middleware.

Asennus:

```bash
npm install morgan
```

Käyttö:

```js
const morgan = require('morgan')

app.use(morgan('tiny'))
```

Sen avulla terminaaliin saadaan tietoa HTTP-pyynnöistä.

Esimerkiksi:

```text
GET /api/persons 200
POST /api/persons 201
```

Morgan on hyödyllinen erityisesti silloin, kun halutaan nähdä, tuleeko frontendiltä oikeasti pyyntö backendille.

---

# 23. CORS

Frontend ja backend voivat kehitysympäristössä olla eri originissa.

Esimerkiksi:

```text
Frontend
http://localhost:5173

Backend
http://localhost:3001
```

Selain voi tällöin estää pyynnön CORS-sääntöjen vuoksi.

Asennus:

```bash
npm install cors
```

Käyttö:

```js
const cors = require('cors')

app.use(cors())
```

Tällöin Express sallii cross-origin-pyynnöt.

---

# 24. Tyypillinen Express-palvelimen rakenne

```js
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const person = request.body

  // tallenna person

  response.status(201).json(person)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

# 25. Virheenkäsittely

Virheenkäsittely kannattaa tehdä keskitetysti.

Esimerkiksi:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)
```

Virheenkäsittelijä sijoitetaan routejen jälkeen.

Yksinkertaistettuna:

```text
middleware
    ↓
routes
    ↓
unknown endpoint
    ↓
error handler
```

---

# 26. Unknown endpoint

Jos käyttäjä pyytää olematonta endpointia:

```text
GET /api/unknown
```

voidaan vastata esimerkiksi:

```js
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})
```

Tämä kannattaa sijoittaa routejen jälkeen.

---

# 27. MongoDB

Kun dataa ei haluta säilyttää vain Node-prosessin muistissa, käytetään tietokantaa.

MongoDB tallentaa dokumentteja.

Esimerkki:

```json
{
  "name": "Arto",
  "number": "12345"
}
```

Mongoose tarjoaa Node.js-sovellukseen mallin MongoDB-datan käsittelyyn.

Asennus:

```bash
npm install mongoose
```

---

# 28. Mongoose Schema

Esimerkiksi:

```js
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)
```

Sen jälkeen dataa voidaan käsitellä mallin kautta:

```js
Person.find({})
```

tai:

```js
Person.findById(id)
```

tai:

```js
Person.findByIdAndDelete(id)
```

---

# 29. Backendin tiedonkulku MongoDB:n kanssa

```text
React
  |
  | POST /api/persons
  v
Express
  |
  v
request.body
  |
  v
Mongoose
  |
  v
MongoDB
  |
  v
saved document
  |
  v
Express response
  |
  v
React
```

---

# 30. Validointi

Tietokantaan ei pitäisi hyväksyä mitä tahansa dataa.

Esimerkiksi:

```js
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})
```

Validointi voi estää virheellisen datan tallentamisen.

Frontendissä voidaan tehdä käyttäjää varten validointia, mutta backendin täytyy silti validoida data.

Frontendia ei pidä pitää luotettavana rajana.

---

# 31. ESLint

ESLint auttaa löytämään JavaScript-koodin ongelmia ja ylläpitämään yhtenäistä koodityyliä.

Nykyisessä Full Stack Open -materiaalissa ESLintin konfiguraatio on:

```text
eslint.config.mjs
```

Ei siis pidä automaattisesti olettaa, että nykyinen kurssi käyttäisi vanhaa `eslint.config.js`-rakennetta.

---

# 32. Frontendin ja backendin yhdistäminen käytännössä

Suositeltu projektirakenne:

```text
project/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── ...
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── ...
    ├── package.json
    └── ...
```

Kehityksen aikana:

```text
localhost:5173
       |
       | HTTP
       v
localhost:3001
```

Frontend tekee API-kutsut backendille.

---

# 33. Frontendin proxy

Kehityksessä frontend voidaan konfiguroida käyttämään backendia esimerkiksi proxyn avulla.

Tällöin frontendissä voidaan kutsua:

```js
axios.get('/api/persons')
```

sen sijaan, että joka paikkaan kirjoitettaisiin:

```js
axios.get('http://localhost:3001/api/persons')
```

Proxy ohjaa `/api`-pyynnöt backendille.

---

# 34. Frontendin ja backendin debuggaus

Kun data ei näy käyttöliittymässä, etene tässä järjestyksessä.

### 1. Toimiiko frontend?

Katso:

```text
Browser Console
```

### 2. Lähettääkö frontend HTTP-pyynnön?

Katso:

```text
Browser -> Developer Tools -> Network
```

### 3. Meneekö request backendille?

Katso backendin terminaali.

Morgan auttaa tässä:

```text
GET /api/persons 200
```

### 4. Saako backend oikean datan?

Lisää tarvittaessa:

```js
console.log(request.body)
```

### 5. Palauttaako backend oikean datan?

Esimerkiksi:

```js
response.json(persons)
```

### 6. Saako frontend responsen?

```js
console.log(response.data)
```

### 7. Päivitetäänkö React state?

```js
setPersons(response.data)
```

### 8. Renderöidäänkö state?

```jsx
{persons.map(person =>
  <p key={person.id}>{person.name}</p>
)}
```

---

# 35. HTTP-statuskoodit

Tärkeimmät:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

Esimerkiksi onnistunut POST:

```js
response.status(201).json(person)
```

Tuntematon resurssi:

```js
response.status(404).send({ error: 'not found' })
```

---

# 36. GET, POST, PUT ja DELETE

| Metodi | Tarkoitus | Esimerkki |
|---|---|---|
| GET | Hae | `/api/persons` |
| POST | Luo | `/api/persons` |
| PUT | Päivitä | `/api/persons/123` |
| DELETE | Poista | `/api/persons/123` |

Tyypillinen CRUD:

```text
Create  -> POST
Read    -> GET
Update  -> PUT
Delete  -> DELETE
```

---

# 37. Täydellinen pieni esimerkki

## Backend

```js
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

let persons = [
  {
    id: '1',
    name: 'Arto',
    number: '12345'
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = {
    id: String(Date.now()),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## Frontend

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    const person = {
      name,
      number
    }

    axios.post('http://localhost:3001/api/persons', person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setName('')
        setNumber('')
      })
  }

  const deletePerson = id => {
    axios.delete(`http://localhost:3001/api/persons/${id}`)
      .then(() => {
        setPersons(
          persons.filter(person => person.id !== id)
        )
      })
  }

  return (
    <div>
      <h1>Persons</h1>

      <form onSubmit={addPerson}>
        <input
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="name"
        />

        <input
          value={number}
          onChange={event => setNumber(event.target.value)}
          placeholder="number"
        />

        <button type="submit">add</button>
      </form>

      {persons.map(person =>
        <div key={person.id}>
          {person.name} {person.number}

          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </div>
      )}
    </div>
  )
}

export default App
```

---

# 38. Asennus – backend

Luo kansio:

```bash
mkdir backend
cd backend
npm init
```

Asenna:

```bash
npm install express cors morgan
```

Kehityksen aikana voidaan käyttää Node.js:n watch-tilaa:

```bash
node --watch index.js
```

Käynnistys:

```bash
node index.js
```

Backend:

```text
http://localhost:3001
```

---

# 39. Asennus – frontend

Vite + React:

```bash
npm create vite@latest frontend
```

Valitse:

```text
React
JavaScript
```

Siirry kansioon:

```bash
cd frontend
```

Asenna riippuvuudet:

```bash
npm install
```

Axios:

```bash
npm install axios
```

Käynnistä:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 40. Käynnistysjärjestys

Avaa kaksi terminaalia.

### Terminaali 1

```bash
cd backend
node --watch index.js
```

### Terminaali 2

```bash
cd frontend
npm run dev
```

Sitten:

```text
Selain
  |
  v
http://localhost:5173
  |
  | API request
  v
http://localhost:3001
```

---

# 41. Mitä tapahtuu, kun käyttäjä lisää henkilön?

```text
1. Käyttäjä täyttää React-formin
          |
          v
2. React tallentaa arvot stateen
          |
          v
3. Käyttäjä painaa Add
          |
          v
4. onSubmit suoritetaan
          |
          v
5. axios.post(...)
          |
          v
6. HTTP POST /api/persons
          |
          v
7. Express vastaanottaa requestin
          |
          v
8. express.json() muuttaa JSON-bodyn olioksi
          |
          v
9. request.body sisältää henkilön
          |
          v
10. Backend käsittelee datan
          |
          v
11. Backend palauttaa 201 + JSON
          |
          v
12. Axios vastaanottaa responsen
          |
          v
13. React lisää uuden henkilön stateen
          |
          v
14. React renderöi uuden henkilön
```

Tämä on käytännössä koko frontend–backend-kommunikaation perusmalli.

---

# 42. Tärkeimmät asiat muistettavaksi

## React

```text
Component
Props
State
Event
useEffect
HTTP request
Rendering
```

## Express

```text
Route
Request
Response
Middleware
request.body
request.params
Status code
```

## HTTP

```text
GET
POST
PUT
DELETE
```

## Backendin middlewaret

```text
express.json()
cors()
morgan()
```

## Tietokanta

```text
MongoDB
Mongoose
Schema
Model
Validation
```

## Debuggaus

```text
Browser Console
Network
Backend terminal
Morgan
HTTP status
request.body
response.data
```

---

# 43. Full Stack Open -materiaalin sivut

Tämän dokumentin rakenne perustuu Full Stack Openin osien 1–3 seuraaviin kokonaisuuksiin:

## Osa 1

- Reactin alkeet
- JavaScriptia
- Monimutkaisempi tila ja Reactin debuggaus

## Osa 2

- Kokoelmien renderöinti ja moduulit
- Lomakkeiden käsittely
- Palvelimella olevan datan hakeminen
- Palvelimella olevan datan muokkaaminen
- Tyylien lisääminen React-sovellukseen

## Osa 3

- Node.js ja Express
- Sovellus internetiin
- Tietojen tallettaminen MongoDB-tietokantaan
- Validointi ja ESLint

---

# 44. Käytännön tavoite

Kun nämä osat ovat hallussa, pitäisi pystyä seuraamaan tätä kokonaisuutta ilman, että jokainen vaihe tuntuu erilliseltä:

```text
KÄYTTÄJÄ
   |
   v
REACT UI
   |
   | event
   v
REACT STATE
   |
   | Axios / fetch
   v
HTTP
   |
   v
EXPRESS ROUTE
   |
   v
MIDDLEWARE
   |
   v
BACKEND LOGIC
   |
   v
MONGOOSE
   |
   v
MONGODB
   |
   v
RESPONSE
   |
   v
REACT STATE
   |
   v
UI
```

Jos jokin kohta ei toimi, vika voidaan rajata tähän ketjuun.

---

# 45. Kurssin viralliset sivut

Full Stack Open:
https://fullstackopen.com/

Reactin alkeet:
https://fullstackopen.com/osa1/reactin_alkeet/

JavaScriptia:
https://fullstackopen.com/osa1/java_scriptia/

Monimutkaisempi tila ja Reactin debuggaus:
https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus/

Kokoelmien renderöinti ja moduulit:
https://fullstackopen.com/osa2/kokoelmien_renderointi_ja_moduulit/

Lomakkeiden käsittely:
https://fullstackopen.com/osa2/lomakkeiden_kasittely/

Palvelimella olevan datan hakeminen:
https://fullstackopen.com/osa2/palvelimella_olevan_datan_hakeminen/

Palvelimella olevan datan muokkaaminen:
https://fullstackopen.com/osa2/palvelimella_olevan_datan_muokkaaminen/

Tyylien lisääminen React-sovellukseen:
https://fullstackopen.com/osa2/tyylien_lisaaminen_react_sovellukseen/

Node.js ja Express:
https://fullstackopen.com/osa3/node_js_ja_express/

Sovellus internetiin:
https://fullstackopen.com/osa3/sovellus_internetiin/

Tietojen tallettaminen MongoDB-tietokantaan:
https://fullstackopen.com/osa3/tietojen_tallettaminen_mongo_db_tietokantaan/

Validointi ja ESLint:
https://fullstackopen.com/osa3/validointi_ja_es_lint/
