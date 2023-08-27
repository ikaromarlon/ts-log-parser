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
      '--output', './errors.json'
    )

    const sut = new CLI()
    sut.init()

    expect(sut.args).toEqual({ input: './app.log', output: './errors.json' })
  })

  test('Should print error and exit application due to missing required arguments in process.argv', () => {
    process.argv.push(
      '--input', './app.log'
    )
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation()
    const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation()

    const sut = new CLI()
    sut.init()

    expect(mockConsoleError).toBeCalledTimes(1)
    expect(mockProcessExit).toBeCalledWith(1)
  })
})
