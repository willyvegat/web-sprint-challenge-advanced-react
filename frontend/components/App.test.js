import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional';

// Write your tests here
test('sanity', () => {
  render(<AppFunctional/>)
})
