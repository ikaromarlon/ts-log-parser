import LogParser from '../src/LogParser'
import mockLogData from './mocks/mockLogData.json'

interface Sut {
  sut: LogParser
}

const makeSut = (): Sut => {
  const sut = new LogParser()

  return {
    sut
  }
}

describe('LogParser unit tests', () => {
  test('Should parse log line successfully', () => {
    const { sut } = makeSut()

    const logLine = '2021-08-09T02:12:51.259Z - error - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}'

    const result = sut.parse(logLine)

    expect(result).toEqual(mockLogData)
  })

  test('Should not parse log line due to unexpected loglevel', () => {
    const { sut } = makeSut()

    const logLine = '2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}'

    const result = sut.parse(logLine)

    expect(result).toEqual(null)
  })

  test('Should not parse invalid log line format', () => {
    const { sut } = makeSut()

    const logLine = '2021-08-09T02:12:51.259Z error {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Cannot find user orders list","code": 404,"err":"Not found"}'

    const result = sut.parse(logLine)

    expect(result).toEqual(null)
  })

  test('Should not parse empty log line', () => {
    const { sut } = makeSut()

    const logLine = ''

    const result = sut.parse(logLine)

    expect(result).toEqual(null)
  })
})
