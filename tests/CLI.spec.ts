import CLI from '../src/CLI'

const originalArgv: string[] = process.argv

describe('CLI unit tests', () => {
  beforeEach(() => {
    process.argv = [
      'path/to/your/nodejs/bin',
      'path/to/your/script.js'
    ]
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    process.argv = originalArgv
  })

  test('Should parse process.argv sucessfully', () => {
    process.argv.push(
      '--input', './app.log',
      '--output', './errors.json',
      '--prettify'
    )

    const sut = new CLI()
    sut.init()

    expect(sut.args).toEqual({
      input: './app.log',
      output: './errors.json',
      prettify: true
    })
  })

  test('Should print error and exit application due to missing required argument --output in process.argv', () => {
    process.argv.push(
      '--input', './app.log'
    )
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation()

    const sut = new CLI()
    sut.init()
    
    expect(mockConsoleError).toBeCalledWith("error: required option '-o, --output <file>' not specified")
    expect(mockProcessExit).toBeCalledWith(1)
  })

  test('Should print error and exit application due to missing required argument --input in process.argv', () => {
    process.argv.push(
      '--output', './errors.json'
    )
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation()

    const sut = new CLI()
    sut.init()

    expect(mockConsoleError).toBeCalledWith("error: required option '-i, --input <file>' not specified")
    expect(mockProcessExit).toBeCalledWith(1)
  })
})
