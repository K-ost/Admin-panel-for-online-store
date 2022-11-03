import { findAllByText, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import { BrowserRouter } from 'react-router-dom'
import Categories from '../pages/Categories'

describe('Categories test', () => {
  const wrapper = <BrowserRouter>
    <Provider store={store}>
      <Categories />
    </Provider>
  </BrowserRouter>
  
  it('Category list exists', async () => {
    render(wrapper)
    expect(await screen.findAllByText("Info")).toBeTruthy()
  })

  it('Add new category popup', () => {
    render(wrapper)
    const btn = screen.getByText("Add new category")
    fireEvent.click(btn)
    expect(screen.getByPlaceholderText("Category description")).toBeInTheDocument()
  })
  
  it('Delete category popup', async () => {
    render(wrapper)
    const btns = await screen.findAllByText("Delete")
    btns.forEach(btn => {
      fireEvent.click(btn)
    })
    expect(screen.getAllByText(/You're removing/i)).toBeTruthy()
  })

})
