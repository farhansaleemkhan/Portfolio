import React, { useEffect, useState } from "react";
import { Table } from "../../Components/Table";
import axios from "axios";

const Inbox = () => {
  const [messageList, setMessageList] = useState([]); 

  const Title = [
    {
      t: "Name",
    },
    {
      t: "Email Address",
    },
    {
      t: "Phone Number",
    },
    {
      t: "Message",
    },
  ];

  // const messageList = [
  //   {
  //     senderName: "Blake Bowman",
  //     senderEmail: "blakebowman@gmail.com",
  //     senderPhoneNo: "+923-33233233",
  //     senderMessage:
  //       "The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.",
  //   },
  //   {
  //     senderName: "Dana Moore",
  //     senderEmail: "moore@gmail.com",
  //     senderPhoneNo: "+923-33423223",
  //     senderMessage:
  //       "With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.",
  //   },
  //   {
  //     senderName: "Ali",
  //     senderEmail: "ali@gmail.com",
  //     senderPhoneNo: "+923-312232323",
  //     senderMessage: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  //   },
  //   {
  //     senderName: "Ahmed",
  //     senderEmail: "ahmed@gmail.com",
  //     senderPhoneNo: "+923-3222222",
  //     senderMessage: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
  //   },
  //   {
  //     senderName: "Adeel",
  //     senderEmail: "adeel@hotmail.com",
  //     senderPhoneNo: "+923-41212222",
  //     senderMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl tellus, commodo eget ex a, gravida dignissim urna. Aenean id condimentum dui, et convallis massa. Proin mollis augue metus, non laoreet libero vulputate quis. Fusce malesuada cursus tincidunt. Quisque congue ac magna id aliquet.",
  //   },
  // ];

  const ModalConfig = ({elementProp}) => {
    return (
      <div className="p-6 space-y-6 w-full h-full border border-gray-500">
          <p className="text-base leading-relaxe dark:text-gray-400">
            {elementProp}
          </p>
      </div>
    );
  };

  const inbox = [
    {
      title: "View",
      component: ModalConfig,
    },
  ];

  //Get data from Backend code
  const fetchData = () => {
    axios
      .get("http://localhost:3000/contacts")
      .then((response) => {
        const recieveData = response.data.map((item) => ({
          senderName: item.name,
          senderEmail: item.email,
          senderPhoneNo: item.phoneNumber,
          senderMessage: item.message,
          senderId: item._id,
        }));
        setMessageList(recieveData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="px-2 md:ml-64">
      <h1 className="bg-cyan-500 text-center text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold py-10 uppercase">
        Messages
      </h1>

      {/* <button
        className="block items-center ml-20 justify-center text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsMessageOpen(true)}
      >
        View Message
      </button> */}

      <Table tTitle={Title} config={inbox} mList={messageList} />

      {/* {isMessageOpen && (
        <Modal 
            closeModal={closeModal} 
        />
      )} */}
    </div>
  );
};

export default Inbox;
