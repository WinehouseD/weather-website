import { render, screen } from '@testing-library/react';
import HourlyForecast from '../components/hourlyForecast/HourlyForecast';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';

const mockHourlyForecast = [
  {
    dt: 1630489200,
    main: {
      temp: 20.1,
    },
    weather: [
      {
        icon: '01d',
        description: 'clear sky',
      },
    ],
    pop: 0.1,
  },
  {
    dt: 1630492800,
    main: {
      temp: 21.3,
    },
    weather: [
      {
        icon: '02d',
        description: 'few clouds',
      },
    ],
    pop: 0.2,
  },
];

test("HourlyForecast component renders successfully", () => {
  render(<HourlyForecast hourlyForecast={mockHourlyForecast} />);
  
  const titleElement = screen.getByText(/Hourly Forecast/i);
  expect(titleElement).toBeInTheDocument();
});

test("Forecast items are rendered correctly", () => {
  render(<HourlyForecast hourlyForecast={mockHourlyForecast} />);
  
  const forecastItems = screen.getAllByAltText(/icon/i);
  expect(forecastItems).toHaveLength(mockHourlyForecast.length);
});

test("Times are displayed correctly", () => {
  render(<HourlyForecast hourlyForecast={mockHourlyForecast} />);
  
  const timeElement = screen.getByText(dayjs.unix(mockHourlyForecast[0].dt).format("HH:mm"));
  expect(timeElement).toBeInTheDocument();
  
  const timeElement2 = screen.getByText(dayjs.unix(mockHourlyForecast[1].dt).format("HH:mm"));
  expect(timeElement2).toBeInTheDocument();
});

test("Precipitation values are displayed correctly", () => {
  render(<HourlyForecast hourlyForecast={mockHourlyForecast} />);
  
  const precipitationElement = screen.getByText(/10%/i);
  expect(precipitationElement).toBeInTheDocument();
  
  const precipitationElement2 = screen.getByText(/20%/i);
  expect(precipitationElement2).toBeInTheDocument();
});