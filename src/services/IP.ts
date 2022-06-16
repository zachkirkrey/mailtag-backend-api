import IPData from 'ipdata';

import Config from '@/config';

type ReturnType = {
  countryCode: string;
  countryName: string;
  cityName: string;
  continentName: string;
  regionName: string;
};

export default async (ipAddress: string): Promise<ReturnType> => {
  const cacheConfig = {
    maxAge: -1, // disable the cache
  };
  const ipData = new IPData(Config.IP.IP_DATA_KEY, cacheConfig);
  const res = await ipData.lookup(ipAddress);
  return {
    countryCode: res.country_code,
    countryName: res.country_name,
    cityName: res.city,
    continentName: res.continent_name,
    regionName: res.region,
  };
};
