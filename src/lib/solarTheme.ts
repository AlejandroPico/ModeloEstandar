export interface SolarThemeResult {
  dark: boolean;
  sunrise?: Date;
  sunset?: Date;
  source: 'solar' | 'system';
}

function normalize(value: number, limit: number): number {
  return ((value % limit) + limit) % limit;
}

function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86_400_000);
}

function solarEvent(date: Date, latitude: number, longitude: number, sunrise: boolean): Date | undefined {
  const rad = Math.PI / 180;
  const n = dayOfYear(date);
  const longitudeHour = longitude / 15;
  const t = n + ((sunrise ? 6 : 18) - longitudeHour) / 24;
  const meanAnomaly = 0.9856 * t - 3.289;
  let trueLongitude = meanAnomaly + 1.916 * Math.sin(meanAnomaly * rad) + 0.02 * Math.sin(2 * meanAnomaly * rad) + 282.634;
  trueLongitude = normalize(trueLongitude, 360);

  let rightAscension = Math.atan(0.91764 * Math.tan(trueLongitude * rad)) / rad;
  rightAscension = normalize(rightAscension, 360);
  rightAscension += Math.floor(trueLongitude / 90) * 90 - Math.floor(rightAscension / 90) * 90;
  rightAscension /= 15;

  const sinDeclination = 0.39782 * Math.sin(trueLongitude * rad);
  const cosDeclination = Math.cos(Math.asin(sinDeclination));
  const cosHour = (Math.cos(90.833 * rad) - sinDeclination * Math.sin(latitude * rad))
    / (cosDeclination * Math.cos(latitude * rad));
  if (cosHour > 1 || cosHour < -1) return undefined;

  let localHour = sunrise ? 360 - Math.acos(cosHour) / rad : Math.acos(cosHour) / rad;
  localHour /= 15;
  const localMeanTime = localHour + rightAscension - 0.06571 * t - 6.622;
  const utcHours = normalize(localMeanTime - longitudeHour, 24);
  const event = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  event.setUTCMinutes(Math.round(utcHours * 60));
  return event;
}

export function resolveSolarTheme(date: Date, latitude?: number, longitude?: number): SolarThemeResult {
  if (latitude === undefined || longitude === undefined) {
    return { dark: window.matchMedia('(prefers-color-scheme: dark)').matches, source: 'system' };
  }
  const sunrise = solarEvent(date, latitude, longitude, true);
  const sunset = solarEvent(date, latitude, longitude, false);
  if (!sunrise || !sunset) {
    return { dark: window.matchMedia('(prefers-color-scheme: dark)').matches, source: 'system' };
  }
  return { dark: date < sunrise || date >= sunset, sunrise, sunset, source: 'solar' };
}
