export function compare(newer: number, older: number): 'increase' | 'decrease' | 'not-changed' {
  if (newer === older) {
    return 'not-changed'
  }

  return newer > older ? 'increase' : 'decrease'
}
