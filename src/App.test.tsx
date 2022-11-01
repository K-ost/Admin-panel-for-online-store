import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'

describe('App test', () => {
  const wrapper = <BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>
  
  it('Log in', () => {
    render(wrapper)
    const authBtn = screen.getByText('Log in')
    fireEvent.click(authBtn)
    const welcome = screen.getByText('Welcome to Dashboard')
    expect(welcome).toBeInTheDocument()
  })


})
