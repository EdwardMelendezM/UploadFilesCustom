import { useState } from "react";
import {toast} from "react-hot-toast"

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
    .then(()=>{
      setState(false)
      toast.success("Success")
    })
    .catch(error=>{
      setError(error)
      toast.error("Error")
    })
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