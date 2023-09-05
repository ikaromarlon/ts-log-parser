import LogWriter from './protocols/LogWriter'
import LogData from './protocols/LogData'
import { WriteStream } from 'fs'
import LogWriterOptions from './protocols/LogWriterOptions'

export default class JsonLogWriter implements LogWriter {
  private sep: string = ''

  private readonly options: LogWriterOptions = {
    prettify: false
  }

  constructor (opt?: LogWriterOptions) {
    if (opt?.prettify !== undefined) this.options.prettify = opt.prettify
  }

  writeStart (writer: WriteStream): void {
    writer.write('[')
  }

  write (writer: WriteStream, data: LogData): void {
    if (this.options.prettify === true) {
      writer.write(`${this.sep}\n  ${JSON
        .stringify(data, null, 2)
        .replace(/\n/g, '\n  ')}`)
    } else {
      writer.write(`${this.sep}${JSON.stringify(data)}`)
    }
    if (this.sep === '') this.sep = ','
  }

  writeEnd (writer: WriteStream): void {
    writer.write(`${this.options.prettify === true ? '\n' : ''}]`)
  }
}
