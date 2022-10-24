import React from 'react'
import { Modal } from 'react-bootstrap'

interface IModal {
  children: any
  title: string
  show: boolean
  hide: () => void
}

const ModalPopup: React.FC<IModal> = ({ children, hide, show, title }) => {
  return (
    <Modal centered show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default ModalPopup