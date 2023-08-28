import JsonLogWriter from '../src/JsonLogWriter'
import fs from 'fs'
import LogData from '../src/protocols/LogData'

interface Sut {
  sut: JsonLogWriter
}

const makeSut = (): Sut => {
  const sut = new JsonLogWriter()

  return {
    sut
  }
}

describe('JsonLogWriter unit tests', () => {
  test('Should parse log line successfully', () => {
    const { sut } = makeSut()

    const outputStream = fs.createWriteStream('./tests/mocks/errors.json')
    const spyStream = jest.spyOn(outputStream, 'write')

    const data: LogData[] = [{
      timestamp: Date.now(),
      loglevel: 'error',
      transactionId: 'any-uuid'
    }]

    sut.write(outputStream, data)

    expect(spyStream).toBeCalledWith(JSON.stringify(data))
  })
})
