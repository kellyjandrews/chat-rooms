import KJUR from 'jsrsasign'

export async function POST(request) {
  const res = await request.json()

  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }
  const zoom_secret = process.env.NEXT_PUBLIC_ZOOM_SECRET
  const zoom_key = process.env.NEXT_PUBLIC_ZOOM_KEY

  const oPayload = {
    app_key: zoom_key,
    tpc: res.tpc,
    role_type: res.role,
    user_identity: res.userIdentity,
    session_key: res.sessionKey,
    geo_regions: res.geoRegions,
    cloud_recording_option: res.cloudRecordingOption,
    cloud_recording_election: res.cloudRecordingElection,
    version: 1,
    iat: iat,
    exp: exp,
  }
  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, zoom_secret)

  return new Response(
    JSON.stringify({
      signature: signature,
    })
  )
}
