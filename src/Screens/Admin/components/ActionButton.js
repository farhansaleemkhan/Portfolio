import React, { useState } from 'react'
import { Modal } from '../../../Components/Modal';

const ActionButton = ({item}) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const closeModal = () => {
    setIsMessageOpen(false);
  };

  return (
    <>
        <button
        className="relative"
        type="button"
        onClick={() => setIsMessageOpen(true)}
        >
        {item.title}
        </button>
        {isMessageOpen && (
        <Modal
            closeModal={closeModal}
            Element={item.component}
            elementProp={item.params}
        />
        )}
    </>
  )
}

export default ActionButton
