import { render, screen } from '@testing-library/react';
import DailyForecast from '../components/dailyForecast/DailyForecast';
import '@testing-library/jest-dom';

const mockDailyForecast = [
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
  },
  {
    dt: 1630575600,
    main: {
      temp: 21.3,
    },
    weather: [
      {
        icon: '02d',
        description: 'few clouds',
      },
    ],
  },
  {
    dt: 1630662000,
    main: {
      temp: 22.5,
    },
    weather: [
      {
        icon: '03d',
        description: 'scattered clouds',
      },
    ],
  },
  {
    dt: 1630748400,
    main: {
      temp: 23.1,
    },
    weather: [
      {
        icon: '04d',
        description: 'broken clouds',
      },
    ],
  },
  {
    dt: 1630834800,
    main: {
      temp: 24.0,
    },
    weather: [
      {
        icon: '09d',
        description: 'shower rain',
      },
    ],
  },
];

test("DailyForecast component returns null when dailyForecast is not provided", () => {
  const { container } = render(<DailyForecast dailyForecast={null} selectedDay={null} setSelectedDay={() => {}} />);
  expect(container.firstChild).toBeNull();
});

test("DailyForecast component returns null when dailyForecast has less than 5 items", () => {
  const shortForecast = mockDailyForecast.slice(0, 4);
  const { container } = render(<DailyForecast dailyForecast={shortForecast} selectedDay={null} setSelectedDay={() => {}} />);
  expect(container.firstChild).toBeNull();
});

test("Correct number of forecast items are rendered", () => {
  render(<DailyForecast dailyForecast={mockDailyForecast} selectedDay={null} setSelectedDay={() => {}} />);
  
  const forecastItems = screen.getAllByAltText(/weather/i);
  expect(forecastItems).toHaveLength(5);
});