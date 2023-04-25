import { useState } from "react";

const useFile = () => {
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchImg = async (url:string,selectedFile:File) =>{
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true)
    fetch(url,{
      method:'POST',
      body:formData
    })
    .then(()=>{setState(false)})
    .catch(error=>setError(error))
    .finally(()=>setLoading(false))
  }

  return {
    state,
    loading,
    error,
    fetchImg
  }
}
 
export default useFile;