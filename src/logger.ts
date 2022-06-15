export const Logger = {
  /**
   * Prints to `stderr` with newline.
   */
  error: (message?: any, ...optionalParams: any[]) => {
    console.error('\x1b[1m\x1b[31m', message, '\x1b[0m', ...optionalParams)
  },

  /**
   * Prints to `stdout` with newline.
   */
  info: (message?: any, ...optionalParams: any[]) => {
    console.log('\x1b[1m\x1b[32m', message, '\x1b[0m', ...optionalParams)
  },
}
