import { useState, useEffect } from 'react';
import foxLogo from '../assets/fox-logo.png'

const API_URL = "https://randomfox.ca/floof/"

function FoxImage() {
  const [image, setImage] = useState(foxLogo)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const controller = new AbortController()

    const fetchImage = async () => {
      try {
        const response = await fetch(API_URL, { signal: controller.signal})
        
        if (!response.ok) {
          throw new Error("Failed to fetch image")
        }
        
        const data = await response.json()
        console.log(data);
        setImage(data.image)
        setLoading(false)
      
      } catch(error) {
        
        if (error.name === "AbortError") return
        console.log(error);
      
      }
    }

    fetchImage() // execute the function

    return () => controller.abort() //clean up on unmount
  }, [])

  return (
    <div>
      <p>Learn more about us!</p>
      {!loading 
        ? <img src={image} alt="fox logo"/>  
        : <p>Loading...</p>
      }
    </div>
  );
}

export default FoxImage