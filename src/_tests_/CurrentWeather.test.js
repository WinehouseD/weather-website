import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import CurrentWeather from '../components/currentWeather/CurrentWeather';
import '@testing-library/jest-dom';

jest.mock('../components/AirQuality', () => () => <div data-testid="mock-air-quality">Mock Air Quality Component</div>);

const currentWeather = {
  currentWeather: {
    current: {
      dt: 1630489200,
      sunrise: 1630450629,
      sunset: 1630497972,
      temp: 20.1,
      uv: 1.5,
    },
  },
  additionalWeather: {
    main: {
      temp: 20.1,
    },
    weather: [
      {
        main: 'Clear',
        icon: '01d',
      },
    ],
    name: 'London',
    sys: {
      country: 'GB',
      sunrise: 1630450629,
      sunset: 1630497972,
    },
    dt: 1630489200,
  },
};

test("CurrentWeather component renders successfully with correct data", () => {
  render(<CurrentWeather currentWeather={currentWeather} />);

  const cityElement = screen.getByText(/London, GB/i);
  expect(cityElement).toBeInTheDocument();

  const temperatureElement = screen.getByText(/20/i);
  expect(temperatureElement).toBeInTheDocument();

  const descriptionElement = screen.getByText(/Clear/i);
  expect(descriptionElement).toBeInTheDocument();

  const dateElement = screen.getByText(dayjs.unix(currentWeather.additionalWeather.dt).format("ddd DD (MMM)"));
  expect(dateElement).toBeInTheDocument();

  const sunriseTime = dayjs.unix(currentWeather.additionalWeather.sys.sunrise).format("HH:mm");
  const sunriseElement = screen.getByText(sunriseTime);
  expect(sunriseElement).toBeInTheDocument();

  const sunsetTime = dayjs.unix(currentWeather.additionalWeather.sys.sunset).format("HH:mm");
  const sunsetElement = screen.getByText(sunsetTime);
  expect(sunsetElement).toBeInTheDocument();

  const mockAirQualityElement = screen.getByTestId('mock-air-quality');
  expect(mockAirQualityElement).toBeInTheDocument();
});

test("CurrentWeather component handles absence of currentWeather data gracefully", () => {
  const { container } = render(<CurrentWeather currentWeather={null} />);
  expect(container.firstChild).toBeNull();
});