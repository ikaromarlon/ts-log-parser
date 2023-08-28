import CLI from './CLI'
import LogParser from './LogParser'
import JsonLogWriter from './JsonLogWriter'
import LogProcessor from './LogProcessor'

function exec (): void {
  const cli = new CLI()
  cli.init()
  const { input, output } = cli.args

  const logParser = new LogParser()
  const jsonLogWriter = new JsonLogWriter()
  const logProcessor = new LogProcessor(input, output, logParser, jsonLogWriter)

  logProcessor.process()
    .catch(err => console.error(err.message))
}

void exec()
