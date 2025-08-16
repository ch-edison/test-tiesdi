import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { PeopleScreen } from '../src/app/screens/PeopleScreen';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn().mockResolvedValue({ didCancel: true }),
}));

describe('PeopleScreen', () => {
  it('renders and opens create modal', async () => {
    const { getByText } = render(<PeopleScreen />);
    
    const btn = getByText('Nueva');
    fireEvent.press(btn);

    await waitFor(() => {
      expect(getByText(/Nueva persona/i)).toBeTruthy();
    });
  });
});
