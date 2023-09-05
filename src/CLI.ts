import { Command } from 'commander'

interface Args {
  input: string
  output: string
  prettify?: boolean
}

class CLI {
  public args!: Args

  public init (): void {
    this.parseArgs()
  }

  private parseArgs (): void {
    try {
      const command = new Command()
      command.exitOverride()

      command
        .name('node parser.js')
        .usage('--input <file.log> --output <file.json>')
        .requiredOption('-i, --input <file>', 'The input file.')
        .requiredOption('-o, --output <file>', 'The output file.')
        .option('-p, --prettify', 'Prettify the output file.')
        .parse(process.argv)

      this.args = command.opts()
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private handleError (error: any): void {
    console.error(error.message)
    process.exit(1)
  }
}

export default CLI
