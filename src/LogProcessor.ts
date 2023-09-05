import fs from 'fs'
import readline from 'readline'
import LogParser from './protocols/LogParser'
import LogWriter from './protocols/LogWriter'
import { FILE_ENCODING } from './utils/consts'

export default class LogProcessor {
  constructor (
    private readonly input: string,
    private readonly output: string,
    private readonly parser: LogParser,
    private readonly writer: LogWriter
  ) {}

  async process (): Promise<void> {
    return await new Promise((resolve, reject) => {
      const inputStream = fs.createReadStream(this.input, FILE_ENCODING)
      inputStream.on('error', (err) => reject(err))

      const outputStream = fs.createWriteStream(this.output, FILE_ENCODING)
      outputStream.on('error', (err) => reject(err))

      outputStream.on('open', () => {
        this.writer.writeStart(outputStream)
      })

      const rl = readline.createInterface({
        input: inputStream,
        output: outputStream,
        crlfDelay: Infinity
      })

      rl.on('line', (line) => {
        const logData = this.parser.parse(line)
        if (logData !== null) {
          this.writer.write(outputStream, logData)
        }
      })

      rl.on('close', () => {
        this.writer.writeEnd(outputStream)
        outputStream.close()
        console.log('Log parsed successfully')
        resolve()
      })

      rl.on('error', (err) => reject(err))
    })
  }
}
