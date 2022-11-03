import { findAllByText, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import { BrowserRouter } from 'react-router-dom'
import Comments from '../pages/Comments'

describe('Comments test', () => {
  const wrapper = <BrowserRouter>
    <Provider store={store}>
      <Comments />
    </Provider>
  </BrowserRouter>
  
  it('Comments list exists', async () => {
    render(wrapper)
    expect(await screen.findAllByText("Delete")).toBeTruthy()
  })

})
