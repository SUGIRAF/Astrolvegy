export interface IndonesianCity {
  id: string;
  name: string;
  province: string;
  island: 'Jawa' | 'Sumatera' | 'Bali & Nusa Tenggara' | 'Kalimantan' | 'Sulawesi' | 'Maluku & Papua';
  lat: number;
  lng: number;
}

export const INDONESIAN_REGIONS: IndonesianCity[] = [
  // JAWA
  { id: 'jkt-selatan', name: 'Jakarta Selatan', province: 'DKI Jakarta', island: 'Jawa', lat: -6.2615, lng: 106.8106 },
  { id: 'jkt-pusat', name: 'Jakarta Pusat', province: 'DKI Jakarta', island: 'Jawa', lat: -6.1805, lng: 106.8284 },
  { id: 'jkt-barat', name: 'Jakarta Barat', province: 'DKI Jakarta', island: 'Jawa', lat: -6.1683, lng: 106.7589 },
  { id: 'jkt-utara', name: 'Jakarta Utara', province: 'DKI Jakarta', island: 'Jawa', lat: -6.1384, lng: 106.8640 },
  { id: 'jkt-timur', name: 'Jakarta Timur', province: 'DKI Jakarta', island: 'Jawa', lat: -6.2250, lng: 106.9004 },
  { id: 'bdg', name: 'Bandung', province: 'Jawa Barat', island: 'Jawa', lat: -6.9175, lng: 107.6191 },
  { id: 'bgr', name: 'Bogor', province: 'Jawa Barat', island: 'Jawa', lat: -6.5971, lng: 106.8060 },
  { id: 'dpk', name: 'Depok', province: 'Jawa Barat', island: 'Jawa', lat: -6.4025, lng: 106.7942 },
  { id: 'bks', name: 'Bekasi', province: 'Jawa Barat', island: 'Jawa', lat: -6.2383, lng: 106.9756 },
  { id: 'tgr-selatan', name: 'Tangerang Selatan', province: 'Banten', island: 'Jawa', lat: -6.2888, lng: 106.7179 },
  { id: 'tgr', name: 'Tangerang', province: 'Banten', island: 'Jawa', lat: -6.1783, lng: 106.6319 },
  { id: 'crb', name: 'Cirebon', province: 'Jawa Barat', island: 'Jawa', lat: -6.7320, lng: 108.5523 },
  { id: 'smg', name: 'Semarang', province: 'Jawa Tengah', island: 'Jawa', lat: -6.9667, lng: 110.4167 },
  { id: 'slo', name: 'Surakarta (Solo)', province: 'Jawa Tengah', island: 'Jawa', lat: -7.5755, lng: 110.8243 },
  { id: 'jog', name: 'Yogyakarta', province: 'DI Yogyakarta', island: 'Jawa', lat: -7.7956, lng: 110.3695 },
  { id: 'slm', name: 'Sleman', province: 'DI Yogyakarta', island: 'Jawa', lat: -7.7167, lng: 110.3556 },
  { id: 'sby', name: 'Surabaya', province: 'Jawa Timur', island: 'Jawa', lat: -7.2575, lng: 112.7521 },
  { id: 'mlg', name: 'Malang', province: 'Jawa Timur', island: 'Jawa', lat: -7.9666, lng: 112.6326 },
  { id: 'sda', name: 'Sidoarjo', province: 'Jawa Timur', island: 'Jawa', lat: -7.4478, lng: 112.7183 },
  { id: 'kdr', name: 'Kediri', province: 'Jawa Timur', island: 'Jawa', lat: -7.8480, lng: 112.0178 },

  // SUMATERA
  { id: 'mdn', name: 'Medan', province: 'Sumatera Utara', island: 'Sumatera', lat: 3.5952, lng: 98.6722 },
  { id: 'btm', name: 'Batam', province: 'Kepulauan Riau', island: 'Sumatera', lat: 1.1301, lng: 104.0529 },
  { id: 'pdg', name: 'Padang', province: 'Sumatera Barat', island: 'Sumatera', lat: -0.9471, lng: 100.4172 },
  { id: 'pku', name: 'Pekanbaru', province: 'Riau', island: 'Sumatera', lat: 0.5071, lng: 101.4478 },
  { id: 'plb', name: 'Palembang', province: 'Sumatera Selatan', island: 'Sumatera', lat: -2.9761, lng: 104.7754 },
  { id: 'bdl', name: 'Bandar Lampung', province: 'Lampung', island: 'Sumatera', lat: -5.4500, lng: 105.2667 },
  { id: 'ach', name: 'Banda Aceh', province: 'Aceh', island: 'Sumatera', lat: 5.5483, lng: 95.3238 },
  { id: 'jmb', name: 'Jambi', province: 'Jambi', island: 'Sumatera', lat: -1.6101, lng: 103.6131 },
  { id: 'bgk', name: 'Bengkulu', province: 'Bengkulu', island: 'Sumatera', lat: -3.8004, lng: 102.2655 },
  { id: 'pgp', name: 'Pangkalpinang', province: 'Bangka Belitung', island: 'Sumatera', lat: -2.1333, lng: 106.1167 },

  // BALI & NUSA TENGGARA
  { id: 'dps', name: 'Denpasar', province: 'Bali', island: 'Bali & Nusa Tenggara', lat: -8.6705, lng: 115.2126 },
  { id: 'bdg-kuta', name: 'Badung / Kuta', province: 'Bali', island: 'Bali & Nusa Tenggara', lat: -8.7233, lng: 115.1725 },
  { id: 'ubd', name: 'Gianyar / Ubud', province: 'Bali', island: 'Bali & Nusa Tenggara', lat: -8.5069, lng: 115.2625 },
  { id: 'mtr', name: 'Mataram', province: 'Nusa Tenggara Barat', island: 'Bali & Nusa Tenggara', lat: -8.5833, lng: 116.1167 },
  { id: 'lbj', name: 'Labuan Bajo', province: 'Nusa Tenggara Timur', island: 'Bali & Nusa Tenggara', lat: -8.4964, lng: 119.8877 },
  { id: 'kpg', name: 'Kupang', province: 'Nusa Tenggara Timur', island: 'Bali & Nusa Tenggara', lat: -10.1772, lng: 123.6070 },

  // KALIMANTAN
  { id: 'bpn', name: 'Balikpapan', province: 'Kalimantan Timur', island: 'Kalimantan', lat: -1.2379, lng: 116.8289 },
  { id: 'smd', name: 'Samarinda', province: 'Kalimantan Timur', island: 'Kalimantan', lat: -0.5022, lng: 117.1536 },
  { id: 'bjm', name: 'Banjarmasin', province: 'Kalimantan Selatan', island: 'Kalimantan', lat: -3.3194, lng: 114.5908 },
  { id: 'ptk', name: 'Pontianak', province: 'Kalimantan Barat', island: 'Kalimantan', lat: -0.0263, lng: 109.3425 },
  { id: 'plk', name: 'Palangka Raya', province: 'Kalimantan Tengah', island: 'Kalimantan', lat: -2.2077, lng: 113.9165 },
  { id: 'ikn', name: 'Nusantara (IKN)', province: 'Kalimantan Timur', island: 'Kalimantan', lat: -0.9723, lng: 116.7088 },

  // SULAWESI
  { id: 'mks', name: 'Makassar', province: 'Sulawesi Selatan', island: 'Sulawesi', lat: -5.1477, lng: 119.4327 },
  { id: 'mnd', name: 'Manado', province: 'Sulawesi Utara', island: 'Sulawesi', lat: 1.4748, lng: 124.8421 },
  { id: 'pal', name: 'Palu', province: 'Sulawesi Tengah', island: 'Sulawesi', lat: -0.9003, lng: 119.8780 },
  { id: 'knd', name: 'Kendari', province: 'Sulawesi Tenggara', island: 'Sulawesi', lat: -3.9985, lng: 122.5126 },
  { id: 'grt', name: 'Gorontalo', province: 'Gorontalo', island: 'Sulawesi', lat: 0.5435, lng: 123.0568 },

  // MALUKU & PAPUA
  { id: 'amb', name: 'Ambon', province: 'Maluku', island: 'Maluku & Papua', lat: -3.6547, lng: 128.1906 },
  { id: 'jpr', name: 'Jayapura', province: 'Papua', island: 'Maluku & Papua', lat: -2.5916, lng: 140.6690 },
  { id: 'srg', name: 'Sorong', province: 'Papua Barat Daya', island: 'Maluku & Papua', lat: -0.8762, lng: 131.2558 },
  { id: 'tnt', name: 'Ternate', province: 'Maluku Utara', island: 'Maluku & Papua', lat: 0.7893, lng: 127.3610 }
];

/**
 * Calculates distance between two coordinates in kilometers using Haversine formula
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Find nearest city in database based on GPS coordinates
 */
export function findNearestCity(lat: number, lng: number): IndonesianCity {
  let nearest = INDONESIAN_REGIONS[0];
  let minDistance = Infinity;

  for (const city of INDONESIAN_REGIONS) {
    const dist = calculateDistanceKm(lat, lng, city.lat, city.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = city;
    }
  }

  return nearest;
}
