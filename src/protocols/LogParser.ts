import LogData from './LogData'

export default interface LogParser {
  parse: (line: string) => LogData | null
}
