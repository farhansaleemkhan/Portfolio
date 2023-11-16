import axios from 'axios';
import React from 'react';

export const Modal = ({closeModal, Element=()=>{return <></>}, elementProp="", id}) => {

    const closeMessage = () => {
        closeModal()
    };

    //Delete Message from specific index
  const handleDeleteMessage = (index) => {
    // const messageToDelete = messageList[index];
    // const deleteMessageId = messageToDelete.userId
    axios
    .delete(`http://localhost:3000/social/${index}`)
    .then((deleteMessage) => {
      console.log("Message is deleted", deleteMessage);
    })
    .catch((error) => {
      console.log("Error Occur",error)
    })
  }


  return (
    <>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-600 opacity-40" onClick={closeMessage}></div>
          <div
            className={`fixed left-10 right-0 md:ml-72 w-2/4 p-4 max-h-auto`}
          >
            <div className={`fixed top-24  w-auto md:ml-20 max-w-2xl max-h-auto`}>
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start bg-slate-700 justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-bold text-white">Message</h3>
                  <button
                    type="button"
                    className="text-white hover:bg-cyan-500 hover:text-slate-700 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeMessage}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
                <Element elementProp={elementProp}/>
                <div className="flex items-center p-6 space-x-2 border-t bg-slate-700 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    onClick={closeMessage}
                    className="text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMessage(id)}
                    className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}
