export function hasSignatureNotExpired(deadline: Number) {
  return new Date().getTime() / 1000 < Number(deadline)
}
