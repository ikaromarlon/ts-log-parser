export default interface LogData {
  timestamp: number
  loglevel: string
  transactionId: string
  err?: string
  code?: number | string
}
