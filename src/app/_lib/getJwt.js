export default async function getJwt(room) {
  let data = {
    tpc: room.name,
    role: room.host,
    userIdentity: room.user,
    sessionKey: room.passcode,
  }

  const response = await fetch('/jwt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const jwt = await response.json()
  return jwt.signature
}
