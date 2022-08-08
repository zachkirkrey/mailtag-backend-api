import axios from 'axios'

export const getIpData = async (ip: string) => {
  // TODO use GOT instead of axios if possible
  const response = await axios.get(`https://ipapi.co/${ip}/json`)

  return {
    ip: response.data.ip,
    version: response.data.version,
    city: response.data.city,
    region: response.data.region,
    country: response.data.country_name,
    countryCode: response.data.country_code,
    latitude: response.data.latitude,
    longitude: response.data.longitude,
    timezone: response.data.timezone,
    currency: response.data.currency,
  }
}
