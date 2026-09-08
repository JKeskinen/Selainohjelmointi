import { StrictMode } from 'react';
import { useState } from 'react'


// PALAUTESIVU, JOKA NÄYTTÄÄ ÄÄNIMÄÄRÄT. YHDISTETTY

// Tulostaa tekstin ja arvon omiin td-sarakkeisiinsa taulukon riville (tr)
const StatisticLine = (props) => {
  console.log(props)
  return (
    <tr>
      {/* SARAKKEIDEN RIVIEN MUODOSTUS */}
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}



const Statistics = (props) => {
  console.log(props)
  // App välittää palautemäärät Statistics-komponentille propseina.
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  // Lasketaan yhteismäärä ja palautteiden tilastot.
  const all = props.good + props.neutral + props.bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  {/* Table, eli taulukko, jonka sisällä tbody */}
  return (
    
    <table>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  )

}

//ANEKDOOTTILISTA [0-7]
const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]



//PÄÄOHJELMA

const App = (props) => {
  console.log(props)


  // Jokainen palautepainike kasvattaa omaa state-arvoaan.
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 

  // selected on näytettävän anekdootin indeksi anecdotes-taulukossa.
  const [selected, setSelected] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  const handleReset = () => {
    console.log("reset votes")
    setGood(0)
    setNeutral(0)
    setBad(0)
  }

 

  // LUODAAN TYHJÄ TAULUKKO ÄÄNIÄ [0,0,0,0...]
  // Jokainen votes-taulukon alkio kuuluu saman indeksin anekdootille.
  // Esimerkiksi votes[2] kertoo anecdotes[2]-anekdootin äänimäärän.
  // Luodaan yksi nolla jokaiselle anekdootille, koska alussa ääniä ei ole.
  const [votes, setVotes] = useState (Array(anecdotes.length).fill(0))
  
  // LUODAAN ÄÄNIMÄÄRÄ LISTANA OHJEIDEN MUKAISESTI
  const [votesCopy, setVotesCopy] = useState(
    Array(anecdotes.length).fill(0)
  )


  // KÄSITELLÄÄN ANEKDOOTTIEN ÄÄNIMÄÄRIÄ PAINALLUKSIEN JÄLKEEN.
  const handleVotes = () => {
    const newVote = votes[selected] +1
    console.log("MAP Vote given: ", anecdotes[selected], newVote)
    // map käy läpi taulukon jokaisen alkion ja luo uuden taulukon: vain valitun anekdootin ääni kasvaa.
    setVotes(votes.map((vote, index) =>
    index === selected ? vote +1 : vote))
  }

  // Tehdään tehtävänmukaisesti listan kopiointi äänimääristä
  const handleVotesCopy = () => {
    const copy = [...votesCopy]
    copy[selected] += 1
    console.log ("LIST COPY Vote given: ",
      anecdotes[selected], copy[selected])
    setVotesCopy(copy)
  }

   // NÄYTETÄÄN ANEKDOOTTI JA NAPPIA KLIKKAAMALLA SIIRRYTÄÄN SEURAAVAAN. 
  const handleAnecdotes = () => {
    console.log("Anecdote: ", anecdotes[selected +1])
    // Siirrytään seuraavaan anekdoottiin ja palataan lopussa listan alkuun.
    setSelected((selected + 1) % anecdotes.length)
  }

  //-----------------------------------------------------------------
  // MÄÄRITELLÄÄN ENITEN ÄÄNIÄ SAANEET ANEKDOOTIT, JA VERTAILEMALLA
  // ETSITÄÄN OIKEA ANEKDOOTTI JA SEN ÄÄNIMÄÄRÄ


   // MÄÄRITELLÄÄN ENITEN ÄÄNIÄ SAANEEN ANEKDOOTIN INDEX FUNKTIOLLA 
   // MATH.MAX(...KAIKISTA ÄÄNISTÄ)
  const mostVotesIndex = votes.indexOf(Math.max(...votes))
  // NYKYINEN TOP1 ANEKDOOTTI = KAIKISTA ANEKDOOTEISTA[ENITEN ÄÄNIÄ INDEX]
  const currentTopAnecdote = anecdotes[mostVotesIndex]
  // TOP1 ANEKDOOTIN ÄÄNIMÄÄRÄN MÄÄRITYS. ÄÄNIMÄÄRÄ[ENITEN ÄÄNIÄ INDEX]
  const voteAmountOfTopAnecdote = votes[mostVotesIndex]

  // TOP1 ANEKDOOTIN ÄÄNIMÄÄRÄN LISTA
  const mostVotesIndexCopy = votesCopy.indexOf(Math.max(...votesCopy))
  const currentTopAnecdoteCopy = anecdotes[mostVotesIndexCopy]
  const voteAmountOfTopAnecdoteLIST = votesCopy[mostVotesIndexCopy] 



  {/* RETURN TEKSTIOSIO SIVUILLA*/}
  return (
    <>
      <h2>give feedback</h2>
    
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <button onClick={handleReset}>reset</button>

      <button onClick={handleAnecdotes}>next anecdote</button>
      {/* ÄÄNESTYSNAPPI, JOKA LISÄÄ VALITTUNA OLEVALLE INDEKSILLE (SELECTED) YHDEN ÄÄNEN */}
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleVotesCopy}>voteCopy</button>
      <h2>statistics</h2>
      {/* Props kuljettavat Appin state-arvot Statistics-komponentille. */}
      <Statistics good={good} neutral={neutral} bad={bad} /> 
      <div>

      {/* selected yhdistää näytettävän anekdootin ja sen äänimäärän. */}
      {anecdotes[selected]}
      <p>votes: {votes[selected]}</p>
      {/* LISTAN äänimäärä (äänimäärä[selected]) */}
      <p>votes LISTCOPY: {votesCopy[selected]}</p>
    </div>


    <h2>Anecdote with most votes MAP</h2>
    <p>{currentTopAnecdote}</p>
    {/* MAP-äänimäärä TOP1 anekdootille */}
    <p>votes MAP: {voteAmountOfTopAnecdote}</p>

    {/* Anekdoottilistan TOP1 äänimäärä LISTAN KOPIOINTI */}
    <h2>Anecdote with most votes LIST</h2>
    <p>{currentTopAnecdoteCopy}</p>
    <p>TOP1 votes anecdote LIST: {voteAmountOfTopAnecdoteLIST}</p>
    <div>
      
    </div>
    </>
  )

  
}

export default App