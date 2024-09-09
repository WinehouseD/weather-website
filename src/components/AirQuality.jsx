import React from 'react';

const airQualityDescriptions =  {
  0: { label: "Good"},
  1: { label: "Moderate",},
  2: { label: "Unhealthy",},
  3: { label: "Pollen Warning",},
  4: { label: "Very Unhealthy",},
  5: { label: "Hazardous",},
};

const getAQI = (concentration, breakpoints) => {
  for (let i = 0; i < breakpoints.length - 1; i++) {
    const [C_low, C_high, I_low, I_high] = breakpoints[i];
    if (concentration >= C_low && concentration <= C_high) {
      return ((I_high - I_low) / (C_high - C_low)) * (concentration - C_low) + I_low;
    }
  }
  return -1;
};

const getOverallAQI = (airQuality) => {
  const breakpoints = {
    pm2_5: [
      [0.0, 12.0, 0, 50],
      [12.1, 35.4, 51, 100],
      [35.5, 55.4, 101, 150],
      [55.5, 150.4, 151, 200],
      [150.5, 250.4, 201, 300],
      [250.5, 500.4, 301, 500],
    ],
    pm10: [
      [0, 54, 0, 50],
      [55, 154, 51, 100],
      [155, 254, 101, 150],
      [255, 354, 151, 200],
      [355, 424, 201, 300],
      [425, 604, 301, 500],
    ],
    o3: [
      [0, 54, 0, 50],
      [55, 70, 51, 100],
      [71, 85, 101, 150],
      [86, 105, 151, 200],
      [106, 200, 201, 300],
      [201, 604, 301, 500],
    ],
    co: [
      [0.0, 4.4, 0, 50],
      [4.5, 9.4, 51, 100],
      [9.5, 12.4, 101, 150],
      [12.5, 15.4, 151, 200],
      [15.5, 30.4, 201, 300],
      [30.5, 50.4, 301, 500],
    ],
    so2: [
      [0, 35, 0, 50],
      [36, 75, 51, 100],
      [76, 185, 101, 150],
      [186, 304, 151, 200],
      [305, 604, 201, 300],
      [605, 1004, 301, 500],
    ],
    no2: [
      [0, 53, 0, 50],
      [54, 100, 51, 100],
      [101, 360, 101, 150],
      [361, 649, 151, 200],
      [650, 1249, 201, 300],
      [1250, 2049, 301, 500],
    ],
  };

  const pollutants = ["pm2_5", "pm10", "o3", "co", "so2", "no2"];
  let maxAQI = 0;

  pollutants.forEach((pollutant) => {
    const concentration = airQuality[pollutant];
    const aqi = getAQI(concentration, breakpoints[pollutant]);
    if (aqi > maxAQI) {
      maxAQI = aqi;
    }
  });

  return maxAQI;
};

const getAirQualityDescription = (aqi) => {
  if (aqi <= 50) return airQualityDescriptions[0];
  if (aqi <= 100) return airQualityDescriptions[1];
  if (aqi <= 150) return airQualityDescriptions[2];
  if (aqi <= 200) return airQualityDescriptions[3];
  if (aqi <= 300) return airQualityDescriptions[4];
  return airQualityDescriptions[5];
};

const AirQuality = ({currentWeather }) => {
  if (!currentWeather) {
    return null;
  }

  const {currentWeather: currentData} = currentWeather;
  const { current } = currentData;

  const airQuality = {
    pm2_5: current.air_quality.pm2_5,
    pm10: current.air_quality.pm10,
    o3: current.air_quality.o3,
    co: current.air_quality.co,
    so2: current.air_quality.so2,
    no2: current.air_quality.no2,
  };

  const overallAQI = getOverallAQI(airQuality);
  const airQualityInfo = getAirQualityDescription(overallAQI);

  return (
      <p data-toggle="tooltip"
      title="Air Quality">{airQualityInfo.label}</p>
  );
};

export default AirQuality;