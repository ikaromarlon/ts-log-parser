import fs, { WriteStream } from 'fs'
import path from 'path'
import JsonLogWriter from '../src/JsonLogWriter'
import LogData from '../src/protocols/LogData'
import mockLogData from './mocks/mockLogData.json'

const defaultOutputFile = path.resolve(__dirname, './tmp/default-errors.json')
const prettyOutputFile = path.resolve(__dirname, './tmp/pretty-errors.json')

function cleanUpTests(stream: WriteStream, file: string) {
  stream.close(() => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  })
}

describe('JsonLogWriter unit tests', () => {  
  describe('Default JSON', () => {

    test('Should write first log char(s) to json file successfully', () => {
      const sut = new JsonLogWriter()
      
      const outputStream = fs.createWriteStream(defaultOutputFile)
      const spyStream = jest.spyOn(outputStream, 'write')
  
      sut.writeStart(outputStream)
      
      cleanUpTests(outputStream, defaultOutputFile)
      
      expect(spyStream).toBeCalledWith('[')
    })

    test('Should write parsed log data to json file successfully', () => {
      const sut = new JsonLogWriter()
      
      const outputStream = fs.createWriteStream(defaultOutputFile)
      const spyStream = jest.spyOn(outputStream, 'write')
  
      const data: LogData = { ...mockLogData }
  
      sut.write(outputStream, data)
      
      cleanUpTests(outputStream, defaultOutputFile)
      
      expect(spyStream).toBeCalledWith(JSON.stringify(data))
    })

    test('Should write last log char(s) to json file successfully', () => {
      const sut = new JsonLogWriter()
      
      const outputStream = fs.createWriteStream(defaultOutputFile)
      const spyStream = jest.spyOn(outputStream, 'write')
  
      sut.writeEnd(outputStream)
      
      cleanUpTests(outputStream, defaultOutputFile)
      
      expect(spyStream).toBeCalledWith(']')
    })
  })

  describe('Pretty JSON', () => {

    test('Should write first log char(s) to pretty json file successfully', () => {
      const sut = new JsonLogWriter({ prettify: true })
      
      const outputStream = fs.createWriteStream(prettyOutputFile)
      const spyStream = jest.spyOn(outputStream, 'write')
  
      sut.writeStart(outputStream)
      
      cleanUpTests(outputStream, prettyOutputFile)
      
      expect(spyStream).toBeCalledWith('[')
    })

    test('Should write parsed log data to pretty json file successfully', () => {
      const sut = new JsonLogWriter({ prettify: true })
      
      const outputStream = fs.createWriteStream(prettyOutputFile)
      const spyStream = jest.spyOn(outputStream, 'write')
      
      const data: LogData = { ...mockLogData }
      
      sut.write(outputStream, data)
      
      cleanUpTests(outputStream, prettyOutputFile)
  
      expect(spyStream).toBeCalledWith(`\n  ${JSON.stringify(data, null, 2).replace(/\n/g, '\n  ')}`)
    })

    test('Should write last log char(s) to pretty json file successfully', () => {
      const sut = new JsonLogWriter({ prettify: true })
      
      const outputStream = fs.createWriteStream(prettyOutputFile)
      const spyStream = jest.spyOn(outputStream, 'write')
  
      sut.writeEnd(outputStream)
      
      cleanUpTests(outputStream, prettyOutputFile)
      
      expect(spyStream).toBeCalledWith('\n]')
    })
  })

})
