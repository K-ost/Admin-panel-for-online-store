import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showNotice } from '../store/appSlice'
import { AppDispatch, RootState } from '../store/store'

interface INotice {
}

const Notice: React.FC<INotice> = () => {
  const notice = useSelector((state: RootState) => state.app.notice)
  const noticeText = useSelector((state: RootState) => state.app.noticeText)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast show={notice} delay={5000} onClose={() => dispatch(showNotice(false))} autohide>
        <Toast.Header closeButton={true}>
          <strong className="me-auto">Bootstrap</strong>
          <small>5 sec ago</small>
        </Toast.Header>
        <Toast.Body>{noticeText}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notice