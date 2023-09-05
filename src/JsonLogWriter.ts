import LogWriter from './protocols/LogWriter'
import LogData from './protocols/LogData'
import { WriteStream } from 'fs'
import LogWriterOptions from './protocols/LogWriterOptions'

export default class JsonLogWriter implements LogWriter {
  private readonly options: LogWriterOptions = {
    prettify: false
  }

  constructor (opt?: LogWriterOptions) {
    if (opt?.prettify !== undefined) this.options.prettify = opt.prettify
  }

  write (writer: WriteStream, data: LogData[]): void {
    if (this.options.prettify === true) {
      writer.write(JSON.stringify(data, null, 2))
    } else {
      writer.write(JSON.stringify(data))
    }
  }
}
