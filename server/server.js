import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/db.js'
import { serve } from 'inngest/express'
import {inngest, functions} from './inngest/index.js'
const app = express()

await connectDb();

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.get('/', (req, res) => res.send( 'Server is running'))
app.use('/api/inngest', serve({client: inngest, functions}))

// app.get('/home', (req, res) => res.send('Server is running'))


// Port configuration
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
