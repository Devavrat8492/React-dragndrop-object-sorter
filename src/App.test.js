import { render, screen } from '@testing-library/react';
import App from './App';

describe(App, () => {

  it("counter displays correct initial count for first group",() => {
      const { getByTestId } = render(<App />);
      const countValue = Number(getByTestId("counter_1").textContent);
      expect(countValue).toEqual(3);
  });

  it("counter displays correct initial count for second group",() => {
    const { getByTestId } = render(<App />);
    const countValue = Number(getByTestId("counter_2").textContent);
    expect(countValue).toEqual(2);
});

});