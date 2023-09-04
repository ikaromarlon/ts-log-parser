import LogParser from './protocols/LogParser'
import LogData from './protocols/LogData'
import { LogLevel } from './utils/Enums'

export default class DefaulLogParser implements LogParser {
  private readonly allowedLogLevels = [
    LogLevel.ERROR.toString()
  ]

  parse (line: string): LogData | null {
    const logLineRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s-\s(.*)\s-\s(.*)$/

    const result = line.trim().match(logLineRegex)

    if (result === null) return null

    const [, timestamp, loglevel, data] = result

    if (!this.isLogLevelValid(loglevel)) return null

    const { transactionId, err, code, ...otherData } = JSON.parse(data)

    return {
      timestamp: new Date(timestamp).getTime(),
      loglevel,
      transactionId,
      err,
      code,
      ...otherData
    }
  }

  isLogLevelValid (loglevel: string): boolean {
    return this.allowedLogLevels.includes(loglevel.toLowerCase())
  }
}
