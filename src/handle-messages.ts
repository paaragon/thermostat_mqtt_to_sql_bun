import { log } from '@lib/log'
import { saveMode, saveRead, saveSet, saveStartup, saveStatus } from './db/repository'

export async function handleStartup(stationId: string, message: string) {
    log.info('Handling startup')
    await saveStartup(stationId, message)
}

export async function handleRead(stationId: string, message: string) {
    log.info('Handling read')
    const fixedQuotes = message.replace("'", "\"")
    const { temp, hum } = JSON.parse(fixedQuotes)
    await saveRead(stationId, temp, hum)
}

export async function handleStatus(message: string) {
    log.info('Handling status')
    await saveStatus(+message)
}

export async function handleMode(message: string) {
    log.info('Handling mode')
    await saveMode(message)
}

export async function handleSet(clientId: string, message: string) {
    log.info('Handling set')
    await saveSet(clientId, +message)
}
