import JsonLogWriter from '../src/JsonLogWriter'
import fs, { WriteStream } from 'fs'
import LogData from '../src/protocols/LogData'

interface Sut {
  sut: JsonLogWriter
  outputStream: WriteStream
}

const outputFile = './tests/mocks/errors.json'

const makeSut = (): Sut => {
  const sut = new JsonLogWriter()

  const outputStream = fs.createWriteStream(outputFile)

  return {
    sut,
    outputStream
  }
}

describe('JsonLogWriter unit tests', () => {

  afterAll(() => {
    fs.unlinkSync(outputFile)
  })

  test('Should write parsed log to json file successfully', () => {
    const { sut, outputStream } = makeSut()

    const spyStream = jest.spyOn(outputStream, 'write')

    const data: LogData[] = [{
      timestamp: Date.now(),
      loglevel: 'error',
      transactionId: 'any-uuid',
      err: 'Not found',
      code: 404
    }]

    sut.write(outputStream, data)

    expect(spyStream).toBeCalledWith(JSON.stringify(data))
  })

  test('Should write pretty parsed log to json file successfully', () => {
    const { outputStream } = makeSut()

    const sut = new JsonLogWriter({ prettify: true })

    const spyStream = jest.spyOn(outputStream, 'write')

    const data: LogData[] = [{
      timestamp: Date.now(),
      loglevel: 'error',
      transactionId: 'any-uuid',
      err: 'Not found',
      code: 404
    }]

    sut.write(outputStream, data)

    expect(spyStream).toBeCalledWith(JSON.stringify(data, null, 2))
  })
})
