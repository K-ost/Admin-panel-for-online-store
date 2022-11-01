import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import { BrowserRouter } from 'react-router-dom'
import Goods from '../pages/Goods'

describe('Products page test', () => {
  const wrapper = <BrowserRouter>
    <Provider store={store}>
      <Goods />
    </Provider>
  </BrowserRouter>
  
  it('Component renders', () => {
    render(wrapper)
    const header = screen.getByText("Products")
    expect(header).toBeInTheDocument()
  })
  
  it('List empty', async () => {
    render(wrapper)
    expect(await screen.findAllByText("Info")).not.toBeNull()
  })

  it('List exists', async () => {
    render(wrapper)
    expect(await screen.findAllByText("Info")).toBeTruthy()
  })

  it('Load more', async () => {
    render(wrapper)
    const btn = await screen.findByTestId("loadmore")
    fireEvent.click(btn)
    await waitFor(() => {
      const items = screen.getAllByText("Info")
      expect(items).toHaveLength(12)
    })
  })

  it('Sort by category', async () => {
    render(wrapper)
    expect(await screen.findAllByText("Info")).toBeTruthy()
    const select = await screen.findByTestId("sortby")
    fireEvent.change(select, { target: { value: 'Apple' } })
    await waitFor(() => {
      const cats = screen.getAllByTestId(/cat-/i)
      cats.map(el => expect(el).toHaveTextContent(/Apple/i))
    })
  })


})
