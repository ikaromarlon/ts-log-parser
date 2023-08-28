import LogParser from './protocols/LogParser'
import LogData from './protocols/LogData'

export default class DefaulLogParser implements LogParser {
  parse (line: string): LogData | null {
    const result = line
      .trim()
      .match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s-\s(.*)\s-\s(.*)$/)

    if (result === null) return null

    const [, timestamp, loglevel, data] = result

    const { transactionId, details, ...otherData } = JSON.parse(data)

    return {
      timestamp: new Date(timestamp).getTime(),
      loglevel,
      transactionId,
      details,
      ...otherData
    }
  }
}
