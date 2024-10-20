import config from '../../config.json'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import session from 'express-session'

import { loadAdminRoutes } from './routes/adminRoutes'

import path from 'path'


const app = express()

// View engine
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(path.resolve(__dirname, 'public')))

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(session({
	secret: config.jsonwebtoken.secret,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}))

// Routes
app.get('/', (request: express.Request, response: express.Response) => response.redirect('/login'))
loadAdminRoutes(app)

export const startDashboard = async (): Promise<void> => {
	app.listen(config.dashboard.port, () => {
		console.log(`[📊 Admin Dashboard] Listening on http://localhost:${config.dashboard.port}`)
	})
}
