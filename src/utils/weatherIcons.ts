// Import all weather icons
import sunnySvg from '../assets/images/icon-sunny.webp';
import partlyCloudySvg from '../assets/images/icon-partly-cloudy.webp';
import overcastSvg from '../assets/images/icon-overcast.webp';
import drizzleSvg from '../assets/images/icon-drizzle.webp';
import rainSvg from '../assets/images/icon-rain.webp';
import snowSvg from '../assets/images/icon-snow.webp';
import stormSvg from '../assets/images/icon-storm.webp';
import fogSvg from '../assets/images/icon-fog.webp';

// Icon mapping object
const iconMap: { [key: string]: string } = {
  'icon-sunny.webp': sunnySvg,
  'icon-partly-cloudy.webp': partlyCloudySvg,
  'icon-overcast.webp': overcastSvg,
  'icon-drizzle.webp': drizzleSvg,
  'icon-rain.webp': rainSvg,
  'icon-snow.webp': snowSvg,
  'icon-storm.webp': stormSvg,
  'icon-fog.webp': fogSvg,
};

/**
 * Get weather icon source by weather code
 * @param weatherCode - Weather code from API
 * @param getWeatherIcon - Function that converts weather code to icon name
 * @returns Path to weather icon
 */
export const getWeatherIconSrc = (
  weatherCode: number,
  getWeatherIcon: (code: number) => string,
): string => {
  const iconName = getWeatherIcon(weatherCode);
  return iconMap[iconName] || sunnySvg;
};
