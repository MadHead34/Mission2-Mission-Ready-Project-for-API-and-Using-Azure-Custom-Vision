import React,{useState} from 'react'
import axios from 'axios'

const Car = () => {
  const [image, setImage] = useState(null);
    const [result, setResult] = useState('');
    let [vehicle, setvehicle] = useState([]);

    const carList = [
      {
        id:1,
        bodystyle:"Hatchback",
        img:"./image/classichatch.jpg"

      },
      {
        id:2,
        bodystyle:"Hatchback",
        img:"./image/suzukihatchback.jpg"
      },
      {
        id:3,
        bodystyle:"Hatchback",
        img:"./image/teslahatch.jpg"
      },
      {
        id:4,
        bodystyle:"Hatchback",
        img:"./image/yellowhatchback.jpg"
      },
      {
        id:5,
        bodystyle:"sedan",
        img:"./image/futureSedan.jpg"
      }
    ];


    function getCars(bodystyle){
      console.log("I am inside getCars method.",bodystyle)
     const list = carList.filter((c)=>c.bodystyle === bodystyle);
     console.log("car list",list);
     return list;
    }

    function handleImageChange(event) 
    {
      event.preventDefault();
    setImage(event.target.files[0]);
    }

    async function handleFormSubmit(event) {
      event.preventDefault();
      
      console.log(`I am inside handleformsubmit`);
      const formData = new FormData();
      formData.append("image", image);
   
      const endpoint = 'https://vehicledetect-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/991f89a6-037b-44c8-a022-ff2cf9ae3f6e/detect/iterations/HatchBackvsSedanModel/image';
      const apiKey = '3105cf0f456a460aa0e87cb7a7e60cce';
      
         const headers = {
           "Content-Type": "application/octet-stream",
           "Prediction-Key": apiKey,
         };
   
    try{
      const res = await axios.post(endpoint,formData,{headers});
      const bodystyle = res.data.predictions[0].tagName;
      setResult(bodystyle);

      setvehicle(getCars(bodystyle));
      console.log("result from predict function:", vehicle);

    } catch (ex) {
      console.error("error: ", ex);
    }
    
  }
  return ( 

<header>
      <div className="content-max-width loginaccount-outercontainer">
        <div className="turner-logo">
          <img src="./image/turner-car.png" alt="turner logo" />
          <span className="fallback-logo"></span>
        </div>
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="hidden lg:flex lg:gap-x-12">

          <div className="text-sm font-semibold leading-6 text-gray-900">Home</div>

          <div className="text-sm font-semibold leading-6 text-gray-900">Car Insurance</div>

          <div className="text-sm font-semibold leading-6 text-gray-900">About Us</div>

          <div className="text-sm font-semibold leading-6 text-gray-900">Contact Us</div>

          <div className="text-sm font-semibold leading-6 text-gray-900">FAQ</div>
        </div>
        </nav>
        <div>
          <form onSubmit={handleFormSubmit}>
            <label className="block mb-2 text-sm bg-indigo-50 font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload an Image of the Car for Computer Vision to detect</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={handleImageChange} />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            <button type="submit">Predict</button>
          </form>
          <h1>it's a {result} car.</h1>
        </div>

        <div className='display-cars'>
          
        
          {vehicle.map(v=>  <img key={v.id} src={v.img} alt=""/>)}

        </div>
      </div>
    </header>
   );
}
 
export default Car;