import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageBase64Converter = ({type, imageUrl, imgAlt }) => {
    const [base64Data, setBase64Data] = useState("");
    let imgClass = "";
    
    if(type === "profile"){
      imgClass = "h-72 w-96 m-3 rounded-full"
    }
    else if(type === "portfolio"){
      imgClass = "hover:opacity-25 h-48 w-64 rounded"
    }

    useEffect(() => {
        axios.get(imageUrl, { responseType: "blob" })
          .then(response => {
            const blob = response.data;
            const reader = new FileReader();
            reader.onloadend = () => {
              setBase64Data(reader.result);
              // console.log('=========Base 64 Data=======',base64Data);
            };
            reader.readAsDataURL(blob);
          })
          .catch(error => {
            console.error("Error fetching image:", error);
          });
      }, [imageUrl]);
      
  return <div>{base64Data && <img className={`${imgClass}`} src={base64Data} alt={imgAlt} />}</div>;
};

export default ImageBase64Converter;
