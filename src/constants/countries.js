const countries = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia And Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: "Cote D'Ivoire",
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island & Mcdonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic Of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KR: 'Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: "Lao People's Democratic Republic",
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libyan Arab Jamahiriya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States Of',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestinian Territory, Occupied',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And Sandwich Isl.',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis And Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
};

export function getCountryName(timezone) {
  let countryCode;

  switch (timezone) {
    case 'America/Chicago':
    case 'America/Anchorage':
    case 'America/Phoenix':
    case 'America/Los_Angeles':
    case 'America/Denver':
    case 'America/New_York':
    case 'Pacific/Honolulu':
    case 'America/Indianapolis':
    case 'America/Detroit':
    case 'America/North_Dakota/New_Salem':
    case 'America/Boise':
      countryCode = 'US';
      break;
    case 'America/Edmonton':
    case 'America/Vancouver':
    case 'America/Winnipeg':
    case 'America/Halifax':
    case 'America/St_Johns':
    case 'America/Yellowknife':
    case 'America/Rankin_Inlet':
    case 'America/Rainy_River':
    case 'America/Montreal':
    case 'America/Regina':
    case 'America/Whitehorse':
    case 'America/Toronto':
      countryCode = 'CA';
      break;
    case 'Australia/Canberra':
    case 'Australia/NSW':
    case 'Australia/North':
    case 'Australia/Queensland':
    case 'Australia/South':
    case 'Australia/Tasmania':
    case 'Australia/Victoria':
    case 'Australia/West':
    case 'Australia/Melbourne':
    case 'Australia/Sydney':
    case 'Australia/Brisbane':
    case 'Australia/Adelaide':
    case 'Australia/Darwin':
    case 'Australia/Perth':
      countryCode = 'AU';
      break;
    case 'Africa/Abidjan':
      countryCode = 'CI';
      break;
    case 'Africa/Accra':
      countryCode = 'GH';
      break;
    case 'Africa/Algiers':
      countryCode = 'DZ';
      break;
    case 'Africa/Cairo':
      countryCode = 'EG';
      break;
    case 'Africa/Casablanca':
      countryCode = 'MA';
      break;
    case 'Africa/Harare':
      countryCode = 'ZW';
      break;
    case 'Africa/Johannesburg':
      countryCode = 'ZA';
      break;
    case 'Africa/Luanda':
      countryCode = 'AO';
      break;
    case 'Africa/Lusaka':
      countryCode = 'ZM';
      break;
    case 'Africa/Maputo':
      countryCode = 'MZ';
      break;
    case 'Africa/Nairobi':
      countryCode = 'KE';
      break;
    case 'Africa/Tripoli':
      countryCode = 'LY';
      break;
    case 'Africa/Tunis':
      countryCode = 'TN';
      break;
    case 'America/Anguilla':
      countryCode = 'AI';
      break;
    case 'America/Antigua':
      countryCode = 'AG';
      break;
    case 'America/Aruba':
      countryCode = 'AW';
      break;
    case 'America/Barbados':
      countryCode = 'BB';
      break;
    case 'America/Bogota':
      countryCode = 'CO';
      break;
    case 'America/Caracas':
      countryCode = 'VE';
      break;
    case 'America/Costa_Rica':
      countryCode = 'CR';
      break;
    case 'America/Dominica':
      countryCode = 'DM';
      break;
    case 'America/El_Salvador':
      countryCode = 'SV';
      break;
    case 'Europe/Paris':
      countryCode = 'FR';
      break;
    case 'America/Guadeloupe':
      countryCode = 'GP';
      break;
    case 'America/Guatemala':
      countryCode = 'GT';
      break;
    case 'America/Havana':
      countryCode = 'CU';
      break;
    case 'America/La_Paz':
      countryCode = 'BO';
      break;
    case 'America/Lima':
      countryCode = 'PE';
      break;
    case 'America/Managua':
      countryCode = 'NI';
      break;
    case 'America/Montevideo':
      countryCode = 'UY';
      break;
    case 'America/Nassau':
      countryCode = 'BS';
      break;
    case 'America/Panama':
      countryCode = 'PA';
      break;
    case 'America/Tegucigalpa':
      countryCode = 'HN';
      break;
    case 'Asia/Aden':
      countryCode = 'YE';
      break;
    case 'Asia/Amman':
      countryCode = 'JO';
      break;
    case 'Asia/Ashgabat':
      countryCode = 'TM';
      break;
    case 'Asia/Baghdad':
      countryCode = 'IQ';
      break;
    case 'Asia/Bahrain':
      countryCode = 'BH';
      break;
    case 'Asia/Baku':
      countryCode = 'AZ';
      break;
    case 'Asia/Bangkok':
      countryCode = 'TH';
      break;
    case 'Asia/Beirut':
      countryCode = 'LB';
      break;
    case 'Asia/Calcutta':
    case 'Asia/Kolkata':
      countryCode = 'IN';
      break;
    case 'Asia/Choibalsan':
    case 'Asia/Ulaanbaatar':
      countryCode = 'MN';
      break;
    case 'Asia/Colombo':
      countryCode = 'LK';
      break;
    case 'Asia/Dhaka':
      countryCode = 'BD';
      break;
    case 'Asia/Dubai':
      countryCode = 'AE';
      break;
    case 'Asia/Hong_Kong':
      countryCode = 'HK';
      break;
    case 'Europe/Istanbul':
      countryCode = 'TR';
      break;
    case 'Asia/Jerusalem':
      countryCode = 'IL';
      break;
    case 'Asia/Kabul':
      countryCode = 'AF';
      break;
    case 'Asia/Karachi':
      countryCode = 'PK';
      break;
    case 'Asia/Katmandu':
    case 'Asia/Kathmandu':
      countryCode = 'NP';
      break;
    case 'Asia/Kuwait':
      countryCode = 'KW';
      break;
    case 'Asia/Manila':
      countryCode = 'PH';
      break;
    case 'Asia/Nicosia':
      countryCode = 'CY';
      break;
    case 'Asia/Qatar':
      countryCode = 'QA';
      break;
    case 'Asia/Rangoon':
      countryCode = 'MM';
      break;
    case 'Asia/Riyadh':
      countryCode = 'SA';
      break;
    case 'Asia/Seoul':
      countryCode = 'KR';
      break;
    case 'Asia/Singapore':
      countryCode = 'SG';
      break;
    case 'Asia/Taipei':
      countryCode = 'TW';
      break;
    case 'Asia/Tbilisi':
      countryCode = 'GE';
      break;
    case 'Asia/Tokyo':
      countryCode = 'JP';
      break;
    case 'Asia/Yerevan':
      countryCode = 'AM';
      break;
    case 'Atlantic/Cape_Verde':
      countryCode = 'CV';
      break;
    case 'Atlantic/Reykjavik':
      countryCode = 'IS';
      break;
    case 'Europe/Amsterdam':
      countryCode = 'NL';
      break;
    case 'Europe/Andorra':
      countryCode = 'AD';
      break;
    case 'Europe/Athens':
      countryCode = 'GR';
      break;
    case 'Europe/Belgrade':
      countryCode = 'YU';
      break;
    case 'Europe/Berlin':
      countryCode = 'DE';
      break;
    case 'Europe/Bratislava':
      countryCode = 'SK';
      break;
    case 'Europe/Brussels':
      countryCode = 'BE';
      break;
    case 'Europe/Bucharest':
      countryCode = 'RO';
      break;
    case 'Europe/Budapest':
      countryCode = 'HU';
      break;
    case 'Europe/Copenhagen':
      countryCode = 'DK';
      break;
    case 'Europe/Dublin':
      countryCode = 'IE';
      break;
    case 'Europe/Helsinki':
      countryCode = 'FI';
      break;
    case 'Europe/Ljubljana':
      countryCode = 'SI';
      break;
    case 'Europe/London':
      countryCode = 'GB';
      break;
    case 'Europe/Malta':
      countryCode = 'MT';
      break;
    case 'Europe/Minsk':
      countryCode = 'BY';
      break;
    case 'Europe/Oslo':
      countryCode = 'NO';
      break;
    case 'Europe/Prague':
      countryCode = 'CZ';
      break;
    case 'Europe/Riga':
      countryCode = 'LV';
      break;
    case 'Europe/Rome':
      countryCode = 'IT';
      break;
    case 'Europe/Sarajevo':
      countryCode = 'BA';
      break;
    case 'Europe/Skopje':
      countryCode = 'MK';
      break;
    case 'Europe/Sofia':
      countryCode = 'BG';
      break;
    case 'Europe/Stockholm':
      countryCode = 'SE';
      break;
    case 'Europe/Tallinn':
      countryCode = 'EE';
      break;
    case 'Europe/Vienna':
      countryCode = 'AT';
      break;
    case 'Europe/Vilnius':
      countryCode = 'LT';
      break;
    case 'Europe/Warsaw':
      countryCode = 'PL';
      break;
    case 'Europe/Zagreb':
      countryCode = 'HR';
      break;
    case 'Asia/Tehran':
      countryCode = 'IR';
      break;
    case 'Indian/Christmas':
      countryCode = 'CX';
      break;
    case 'Indian/Mauritius':
      countryCode = 'MU';
      break;
    case 'Indian/Mayotte':
      countryCode = 'YT';
      break;
    case 'Pacific/Fiji':
      countryCode = 'FJ';
      break;
    case 'Africa/Dar_es_Salaam':
      countryCode = 'TZ';
      break;
    case 'Africa/Lagos':
      countryCode = 'CM';
      break;
    case 'America/Santo_Domingo':
      countryCode = 'DO';
      break;
    case 'America/Port-au-Prince':
      countryCode = 'HT';
      break;
    case 'Europe/Zurich':
      countryCode = 'CH';
      break;
    case 'America/Cayenne':
      countryCode = 'GF';
      break;
    case 'Europe/Chisinau':
      countryCode = 'MD';
      break;
    case 'Africa/Windhoek':
      countryCode = 'NA';
      break;
    case 'Pacific/Port_Moresby':
      countryCode = 'PG';
      break;
    case 'America/Asuncion':
      countryCode = 'PY';
      break;
    case 'Pacific/Guadalcanal':
      countryCode = 'SB';
      break;
    case 'Arctic/Longyearbyen':
      countryCode = 'SJ';
      break;
    case 'Europe/Jersey':
      countryCode = 'JE';

      break;
    case 'America/Argentina/Buenos_Aires':
    case 'America/Argentina/Catamarca':
    case 'America/Argentina/Tucuman':
    case 'America/Argentina/Rio_Gallegos':
    case 'America/Argentina/Cordoba':
    case 'America/Argentina/Salta':
    case 'America/Argentina/San_Juan':
    case 'America/Argentina/Ushuaia':
    case 'America/Argentina/Jujuy':
    case 'America/Argentina/San_Luis':
    case 'America/Argentina/La_Rioja':
    case 'America/Argentina/Mendoza':
    case 'America/Buenos_Aires':
      countryCode = 'AR';
      break;
    case 'America/Rio_Branco':
    case 'America/Maceio':
    case 'America/Sao_Paulo':
    case 'America/Manaus':
    case 'America/Bahia':
    case 'America/Fortaleza':
    case 'America/Campo_Grande':
    case 'America/Belem':
    case 'America/Cuiaba':
    case 'America/Recife':
    case 'America/Porto_Velho':
    case 'America/Boa_Vista':
    case 'America/Araguaina':
      countryCode = 'BR';
      break;

    case 'Asia/Shanghai':
    case 'Asia/Harbin':
    case 'Asia/Chongqing':
    case 'Asia/Urumqi':
      countryCode = 'CN';
      break;
    case 'Pacific/Galapagos':
    case 'America/Guayaquil':
      countryCode = 'EC';
      break;
    case 'Europe/Madrid':
    case 'Africa/Ceuta':
    case 'Atlantic/Canary':
      countryCode = 'ES';
      break;
    case 'America/Thule':
    case 'America/Godthab':
      countryCode = 'GL';
      break;
    case 'Asia/Pontianak':
    case 'Asia/Makassar':
    case 'Asia/Jakarta':
    case 'Asia/Jayapura':
      countryCode = 'ID';
      break;
    case 'Asia/Almaty':
    case 'Asia/Qyzylorda':
    case 'Asia/Aqtobe':
    case 'Asia/Aqtau':
    case 'Asia/Oral':
      countryCode = 'KZ';
      break;
    case 'America/Mexico_City':
    case 'America/Tijuana':
    case 'America/Hermosillo':
    case 'America/Merida':
    case 'America/Chihuahua':
    case 'America/Monterrey':
    case 'America/Mazatlan':
    case 'America/Cancun':
    case 'America/Matamoros':
      countryCode = 'MX';
      break;
    case 'Asia/Kuala_Lumpur':
    case 'Asia/Kuching':
      countryCode = 'MY';
      break;
    case 'Pacific/Auckland':
    case 'Pacific/Chatham':
      countryCode = 'NZ';
      break;
    case 'Europe/Lisbon':
    case 'Atlantic/Madeira':
      countryCode = 'PT';
      break;

    case 'Europe/Kiev':
    case 'Europe/Uzhgorod':
    case 'Europe/Simferopol':
    case 'Europe/Zaporozhye':
    case 'Europe/Simferopol':
      countryCode = 'UA';
      break;
    case 'Asia/Dili':
      countryCode = 'TL';
      break;
    case 'Pacific/Marquesas':
      countryCode = 'PF';
      break;
    default:
      countryCode = 'US';
      break;
  }

  if (countries[countryCode]) {
    return countries[countryCode];
  }
}
