import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Orders from '../pages/Orders'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../store/store'

describe('Cats', () => {
  const wrapper = <BrowserRouter>
    <Provider store={store}>
      <Orders />
    </Provider>
  </BrowserRouter>

  it('Cats not found', () => {
    render(wrapper)
    expect(screen.getByText(/Cats not found/i)).toBeInTheDocument()
  })
  
  it('Cats has fetched', async () => {
    render(wrapper)
    const btn = screen.getByTestId('showbtn')
    fireEvent.click(btn)
    //expect(await screen.findByRole('list')).toBeInTheDocument()
    expect(await screen.findAllByTestId(/test/i)).toBeTruthy()
  })


})