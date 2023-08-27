import { Command } from 'commander'

interface Args {
  input: string
  output: string
}

class CLI {
  public args!: Args

  public init (): void {
    try {
      this.parseArgs()
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private parseArgs (): void {
    const command = new Command()
    command.exitOverride()

    command
      .name('node parser.js')
      .usage('--input <file.log> --output <file.json>')
      .requiredOption('-i, --input <file>', 'The input file.')
      .requiredOption('-o, --output <file>', 'The output file.')
      .parse(process.argv)

    this.args = command.opts()
  }

  private handleError (error: any): void {
    console.error(error.message)
    process.exit(1)
  }
}

export default CLI
