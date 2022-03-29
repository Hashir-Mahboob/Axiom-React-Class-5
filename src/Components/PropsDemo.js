//props is use to pass data
//prop demo mein hi useeffect use karte
import PropTypes from "prop-types"; //install it from npm packages
import { useEffect, useState } from "react";
import axios from "axios"; //install axios package

const PropsDemo = (props) => {
  const [apiArr, setApiArr] = useState([]);
  const [allArr, setAllArr] = useState([]);
  const [apiCallsCount, setApiCalls] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); //ab data hoga 11-20 tak uske aik do varibale banalete

  //useeffect mein hum aik functin call kartay, useffect render hoga aur phir chalega, useffect mein jo bhi kaam hoga wo setapiarr mein save karadege
  useEffect(() => {
    console.log("props updating...");
    setTimeout(() => {
      getData();
    }, 1000);
  }, []); // hamara data hame mil raha hai so yaha par useefect use karne ki zaroorat nahi hai

  //Aik hi component mein multiple useeffect use kar sakte hai
  useEffect(() => {
    // Ab useefect tab kaam karega jab hamara setAllarr ki length true hogi
    // ye tabhi work karega jab apicall count horahi hai
    if (allArr?.length && currentIndex <= 5000) {
      setTimeout(() => {
        setApiArr(allArr?.slice(0, 50)); //intially to data aik hi baar chalega
        setCurrentIndex(currentIndex + 50);
        setApiCalls(apiCallsCount + 1);
      }, 300);
    } else {
      console.log("else!!!");
    }
  }, [apiCallsCount]);

  const getData = () => {
    // timer to hold pics data for 5 seconds after loading...
    axios.get(`https://jsonplaceholder.typicode.com/photos`).then((res) => {
      //api call karai hai
      console.log("data", res.data);
      setApiArr(res?.data?.slice(currentIndex, currentIndex + 10)); // koi bhi index ho uska plus 10 kardo
      setAllArr(res?.data);
      setCurrentIndex(10); // isme current index chor sakte because hame pata initially load hoga
      setApiCalls(1);
    });
    //aik array mila jisko respone data mein update karsakte
  };

  //har component mein prop pass hota
  return (
    //p ke tage mein message show hogaya jo dekhana tha lorem wala, ye string pass karne ka tareeqa hai aise hi array obj sab pass hojata
    <div>
      <h1>Prop Message</h1>
      {/* <p>{props?.message}</p> */}
      <p>Api Calls:{props?.apiCallsCount}</p>
      <p>Current Index:{currentIndex}</p>
      <div>
        {!apiArr?.length ? (
          <p>Loading Data...</p>
        ) : (
          apiArr?.map((v, i) => {
            return (
              <div key={i}>
                <p> {v?.title} </p>
                <img src={v?.thumbnailUrl} alt={v?.title} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

PropsDemo.propTypes = {
  //yaha prop type define karsakte, message ki type bata rahe
  message: PropTypes.string.isRequired,
};

PropsDemo.defaultProps = {
  // agar koi prop pass nahi kiya jata aur uske andar default prop pass kardia to default wala ajata, default sirf tab ayega jab app.js se koi message pass nahi huwa hoga
  message: "This is Default Prop.",
};

export default PropsDemo;
