import { WriteStream } from 'fs'
import LogData from './LogData'

export default interface LogWriter {
  writeStart: (writer: WriteStream) => void

  write: (writer: WriteStream, data: LogData) => void

  writeEnd: (writer: WriteStream) => void
}
