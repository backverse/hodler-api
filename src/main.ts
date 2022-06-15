import axios from 'axios'
import * as HyperExpress from 'hyper-express'
import { concatMap, interval } from 'rxjs'
import { Configuration } from './configuration'
import { Logger } from './logger'

const server = new HyperExpress.Server()
const router = new HyperExpress.Router()

const $overview = interval(5_000).pipe(
  concatMap(() =>
    axios.get('https://hodler-signal.backverse.dev/overview').then((res) => res.data),
  ),
)

router.ws('/connect', { idle_timeout: 20 }, (ws) => {
  const subscription = $overview.subscribe((overview) => {
    ws.send(JSON.stringify(overview))
  })

  ws.on('close', () => subscription.unsubscribe())
})

server.use('/ws', router)

server
  .listen(Configuration.PORT)
  .then(() => {
    Logger.info(`🚀 Application is running on: http://localhost:${Configuration.PORT}`)
  })
  .catch((err: unknown) => {
    Logger.error('🚨 Application error:', err)
  })
