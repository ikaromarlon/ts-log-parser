import LogParser from '../src/LogParser'

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

    const result = sut.parse('2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}')

    expect(result).toEqual({
      timestamp: 2354321571253,
      loglevel: 'info',
      transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
      details: 'Service is started'
    })
  })

  test('Should not parse log line due to invalid format', () => {
    const { sut } = makeSut()

    const result = sut.parse('2044-08-09T02:12:51.253Z info {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}')

    expect(result).toEqual(null)
  })
})
