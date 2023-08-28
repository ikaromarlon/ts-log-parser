import fs from 'fs'
import readline from 'readline'
import LogData from './protocols/LogData'
import LogParser from './protocols/LogParser'
import LogWriter from './protocols/LogWriter'

const FILE_ENCODING = 'utf8'

export default class LogProcessor {
  private readonly data: LogData[] = []

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

      const rl = readline.createInterface({
        input: inputStream,
        output: outputStream,
        crlfDelay: Infinity
      })

      rl.on('line', (line) => {
        const parsedLine = this.parser.parse(line)
        if (parsedLine !== null) {
          this.data.push(parsedLine)
        }
      })

      rl.on('close', () => {
        this.writer.write(outputStream, this.data)
        outputStream.close()
        console.log('Log parsed successfully')
        resolve()
      })

      rl.on('error', (error) => reject(error))
    })
  }
}
