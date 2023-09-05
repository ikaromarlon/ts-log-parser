import fs, { WriteStream } from 'fs'
import path from 'path'
import LogParser from '../src/protocols/LogParser'
import LogProcessor from '../src/LogProcessor'
import LogData from '../src/protocols/LogData'
import LogWriter from '../src/protocols/LogWriter'
import mockLogData from './mocks/mockLogData.json'

const inputFile = path.resolve(__dirname, './mocks/app.log')
const outputFile = path.resolve(__dirname, './tmp/errors.json')

interface Sut {
  sut: LogProcessor
  logParserStub: LogParser
  logWriterStub: LogWriter
}

const makeSut = (): Sut => {
  class LogParserStub implements LogParser {
    parse (line: string): LogData {
      return mockLogData
    }
  }

  class LogWriterStub implements LogWriter {
    writeStart (writer: WriteStream): void {}
    write (writer: WriteStream, data: LogData): void {}
    writeEnd (writer: WriteStream): void {}
  }

  const logParserStub = new LogParserStub()
  const logWriterStub = new LogWriterStub()

  const sut = new LogProcessor(inputFile, outputFile, logParserStub, logWriterStub)

  return {
    sut,
    logParserStub,
    logWriterStub
  }
}

describe('LogProcessor unit tests', () => {

  afterEach(() => {
    fs.unlinkSync(outputFile)
  })

  test('Should process log successfully', async () => {
    const { sut, logParserStub, logWriterStub } = makeSut()

    const spyParse = jest.spyOn(logParserStub, 'parse')
    const spyWrite = jest.spyOn(logWriterStub, 'write')

    await sut.process()

    expect(spyParse).toBeCalled()
    expect(spyWrite).toBeCalled()
  })
})
