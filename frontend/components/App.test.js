import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';


test('sanity', () => {
  render(<AppFunctional/>)
});

test('email input exists', () => {
  render(<AppFunctional/>);

  const emailInput = screen.getByPlaceholderText(/type email/i);

  expect(emailInput).toBeTruthy();
})

test('renders buttons', () => {
  render(<AppFunctional/>);

  const upBtn = screen.getByText(/up/i);
  const downBtn = screen.getByText(/down/i);
  const leftBtn = screen.getByText(/left/i);
  const rightBtn = screen.getByText(/right/i);
  const resetBtn = screen.getByText(/reset/i);

  expect(upBtn).toBeTruthy();
  expect(downBtn).toBeTruthy();
  expect(leftBtn).toBeTruthy();
  expect(rightBtn).toBeTruthy();
  expect(resetBtn).toBeTruthy();
})

test('Error message "up"', () => {
  render(<AppFunctional/>)

  const up = document.querySelector('#up')
  const message = document.querySelector('#message')
  fireEvent.click(up)
  fireEvent.click(up)
  
  expect(message.textContent).toBe("You can't go up")
})

test('Error message "down"', () => {
  render(<AppFunctional/>)

  const down = document.querySelector('#down')
  const message = document.querySelector('#message')
  fireEvent.click(down)
  fireEvent.click(down)

  expect(message.textContent).toBe("You can't go down")
})