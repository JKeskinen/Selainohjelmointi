const express = require('express')
const app = express()

app.use(express.json())

const generatedId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
return String(maxId +1)
}



let notes =['',
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "HTML is easy",
        important: true
    },
    {
        id: "3",
        content: "HTML is easy",
        important: true
    },
    {
        id: "4",
        content: "HTML is easy",
        important: true
    }
]



app.get('/', (request, response)=>{
    response.send(
        '<h2>Tämä on notes-kansion juuri :3001/</h2>' +
        '<h2>/api/notes</h2>' +
        '<h2>/api/notes/id</h2>' +
        '<br>Käynnistä index.js kansiosta powershell npm run dev</br>'+
        '<br>Serveri pysyy käynnissä. Muutosten jälkeen refresh selain ctrl + r</br>'
        )
})

app.get('/api/notes', (request, response) =>{
    response.json(notes)
    
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end
})



app.post('/api/notes/', (request, response) =>{
    const body = request.body
    
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
        
    const note ={
        id: generatedId(),
        content: body.content,
        important: body.important || false,
        
    }
    notes = notes.concat(note)

    response.json(note)
})



const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
