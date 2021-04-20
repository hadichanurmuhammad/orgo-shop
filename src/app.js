const Express = require('express')
const CookieParser = require('cookie-parser')
const Path = require('path')
const Fs = require('fs')
require('dotenv').config({ path: Path.join(__dirname, '.env')})
const PORT = process.env.PORT

if(!PORT) throw new ReferenceError('PORT is not defined')

const app = Express()

//Middlewares
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(CookieParser)

//Settings
app.listen(PORT, () => console.log(`SERVER READY AT http://localhost:${PORT}`))
app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname, 'views'))

app.use(Express.static(Path.join(__dirname, 'public')))

Routes
const RoutesPath = Path.join(__dirname, 'routes')

Fs.readdir(RoutesPath, (err, files) => {
    if(err) throw new Error(err)
    files.forEach(route => {
        const RoutePath = Path.join(__dirname, 'routes', route)
        const Route = require(RoutePath)
        if(RoutePath && Route.router) app.use(Route.path, Route.router)
    })
})

app.get('/', (_, res) => res.redirect('/profile'))