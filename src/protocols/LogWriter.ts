import { WriteStream } from 'fs'
import LogData from './LogData'

export default interface LogWriter {
  write: (writer: WriteStream, data: LogData[]) => void
}
