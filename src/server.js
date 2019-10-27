import app from './app'

const port = process.env.PORT || 8010

const listen = () => console.log(`App listening on port # ${port}`)
app.listen(port, listen);