import { useState,useRef } from "react";
import useFile from "../../hooks/useFile";
import {toast} from "react-hot-toast"


const UploadFile:React.FC= () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagenUrl, setImagenUrl] = useState("");
  const ref = useRef<HTMLInputElement>(null)
  const {loading,fetchImg} = useFile() 

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {

    //Verificar sque existe un archivo
    if (event.target.files) {
      const file =  event.target.files[0]

    //Verificar la extension
    const extension = file.name.split(".").pop();
    if(!extension) return;

    const allowedExtensions = ["jpg", "jpeg"];
    if (!allowedExtensions.includes(extension.toLowerCase())) {
        toast.error("File extension " + extension + " is not allowed")

        if(ref.current)
          ref.current.value=""
        return;
      }

    //Verificar el tamaño del archivo
    const allowedSize = 1 * 1024 * 1024; // 5MB
    if (file.size > allowedSize) {
        toast.error("File size must be greater than")
        return;
      } 

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImagenUrl(url)
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      fetchImg("url de pureba",selectedFile)
    }
  };

  return ( 
    <form onSubmit={handleSubmit}>
      
      <label
        className="
        block
        mb-2
        text-sm
        font-medium
      text-gray-900
      dark:text-white"
        htmlFor="multiple_files"
        >
          Upload multiple files
      </label>
      <input
        ref={ref}
        type="file"
        onChange={handleFileInput}
        accept=".jpg,.jpeg"
        max-size="1MB"
        disabled={loading}
        className="
          block
          w-full
          text-sm
          text-gray-900
          border
          border-gray-300
          rounded-lg
          cursor-pointer
          bg-gray-50
          dark:text-gray-400
          focus:outline-none
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
        "
        id="multiple_files"
        multiple
        />

      <button
        type="submit"
        disabled={loading}
        >
          Actualizar
      </button>
      <div>
        {imagenUrl &&  <img src={imagenUrl} alt="imagen" height={400}/>}
      </div>  
      
    </form>
   );
}
 
export default UploadFile;