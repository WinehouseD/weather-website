import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/search/Search';
import '@testing-library/jest-dom';
import { fetchAutocomplete } from '../api/services';

jest.mock('../api/services', () => ({
  fetchAutocomplete: jest.fn(),
}));
jest.mock('../hooks/useDebounce', () => (value) => value);

const mockSuggestions = [
  { name: 'London', country: 'GB' },
  { name: 'Los Angeles', country: 'US' },
];

test("Search component renders successfully", () => {
  render(<Search town="" setTown={() => {}} handleSearch={() => {}} />);
  
  const inputElement = screen.getByPlaceholderText(/Enter location EN/i);
  expect(inputElement).toBeInTheDocument();
});

test("Input value changes on user input", () => {
  const setTown = jest.fn();
  render(<Search town="" setTown={setTown} handleSearch={() => {}} />);
  
  const inputElement = screen.getByPlaceholderText(/Enter location EN/i);
  fireEvent.change(inputElement, { target: { value: 'Lon' } });
  
  expect(setTown).toHaveBeenCalledWith('Lon');
});

test("Suggestions are fetched and displayed", async () => {
  fetchAutocomplete.mockResolvedValueOnce(mockSuggestions);
  
  render(<Search town="Lon" setTown={() => {}} handleSearch={() => {}} />);
  
  await waitFor(() => {
    const suggestionElements = screen.getAllByRole('listitem');
    expect(suggestionElements).toHaveLength(mockSuggestions.length);
  });
});

test("Keyboard navigation works correctly", async () => {
  fetchAutocomplete.mockResolvedValueOnce(mockSuggestions);
  
  render(<Search town="Lon" setTown={() => {}} handleSearch={() => {}} />);
  
  const inputElement = screen.getByPlaceholderText(/Enter location EN/i);
  fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
  
  fireEvent.keyDown(inputElement, { key: 'ArrowUp' });
  
});

test("Clicking a suggestion updates the input and triggers search", async () => {
  const setTown = jest.fn();
  const handleSearch = jest.fn();
  
  fetchAutocomplete.mockResolvedValueOnce(mockSuggestions);
  
  render(<Search town="Lon" setTown={setTown} handleSearch={handleSearch} />);
  
  await waitFor(() => {
    const suggestionElement = screen.getByText(/London, GB/i);
    fireEvent.click(suggestionElement);
    
    expect(setTown).toHaveBeenCalledWith('London');
    expect(handleSearch).toHaveBeenCalledWith('London');
  });
});