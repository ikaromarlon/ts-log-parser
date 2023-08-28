import LogWriter from './protocols/LogWriter'
import LogData from './protocols/LogData'
import { WriteStream } from 'fs'

export default class JsonLogWriter implements LogWriter {
  write (writer: WriteStream, data: LogData[]): void {
    writer.write(JSON.stringify(data))
  }
}
