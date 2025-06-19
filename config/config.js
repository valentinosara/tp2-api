import {env} from "node:process"

const SERVER_PORT=env.SERVER_PORT
const SECRET = env.SECRET
// const DB_NAME="miercoles"
// const DB_USER="root"
// const DB_PASS="root"
// const DB_HOST="localhost"
// const DB_DIALECT="mysql"
// const DB_PORT=8889

export {SERVER_PORT, SECRET}