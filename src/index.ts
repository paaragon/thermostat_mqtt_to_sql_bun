import * as mqtt from "mqtt"
import { log } from '@lib/log'
import { MQTT_PORT, MQTT_SERVER, MQTT_TOPIC_PREFIX } from './config'
import { handleMode, handleRead, handleSet, handleStartup, handleStatus } from './handle-messages'

log.info('Connecting to MQTT server...')
const client = mqtt.connect(`mqtt://${MQTT_SERVER}:${MQTT_PORT}`)

client.on('connect', () => {
  log.info('Connected')
  log.info('Suscribing...')
  client.subscribe(`${MQTT_TOPIC_PREFIX}/#`)
})

client.on('message', function (topic, message) {
  handleMessage(topic, message.toString())
})

async function handleMessage(topic: string, message: string) {
  log.info("New message: " + topic + " - " + message)
  const [, method, stationId] = topic.split('/')
  if (!method) {
    log.error('No method found in topic')
    return
  }

  try {
    switch (method) {
      case 'read':
        handleRead(stationId, message)
        break
      case 'status':
        handleStatus(message)
        break
      case 'mode':
        handleMode(message)
        break
      case 'set':
        handleSet(stationId, message)
        break
      case 'startup':
        handleStartup(stationId, message)
        break
      default:
        log.warning("unknown method", method)
        break
    }
  } catch (e) {
    log.error(e)
  }
}
