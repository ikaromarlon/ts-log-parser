import LogParser from '../src/protocols/LogParser'
import LogProcessor from '../src/LogProcessor'
import LogData from '../src/protocols/LogData'
import LogWriter from '../src/protocols/LogWriter'
import { WriteStream } from 'fs'

interface Sut {
  sut: LogProcessor
  logParserStub: LogParser
  logWriterStub: LogWriter
}

const makeSut = (): Sut => {
  class LogParserStub implements LogParser {
    parse (line: string): LogData {
      return {
        timestamp: Date.now(),
        loglevel: 'error',
        transactionId: 'uuid-value'
      }
    }
  }

  class LogWriterStub implements LogWriter {
    write (writer: WriteStream, data: LogData[]): void {}
  }

  const logParserStub = new LogParserStub()
  const logWriterStub = new LogWriterStub()
  const input = './tests/mocks/app.log'
  const output = './tests/mocks/errors.json'
  const sut = new LogProcessor(input, output, logParserStub, logWriterStub)

  return {
    sut,
    logParserStub,
    logWriterStub
  }
}

describe('LogProcessor unit tests', () => {
  test('Should process log successfully', async () => {
    const { sut, logParserStub, logWriterStub } = makeSut()

    const spyParse = jest.spyOn(logParserStub, 'parse')
    const spyWrite = jest.spyOn(logWriterStub, 'write')

    await sut.process()

    expect(spyParse).toBeCalled()
    expect(spyWrite).toBeCalled()
  })
})
