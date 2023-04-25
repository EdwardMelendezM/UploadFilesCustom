import { useState,useRef } from "react";
import useFile from "../../hooks/useFile";



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
          alert("Solo se permiten archivos con extensión .jpg o .jpeg");
          if(ref.current)
            ref.current.value=""
          return;
        }

      //Verificar el tamaño del archivo
      const allowedSize = 1 * 1024 * 1024; // 5MB
      if (file.size > allowedSize) {
          alert("El archivo es demasiado grande. El tamaño máximo es de 5 MB");
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
      <input
        ref={ref}
        type="file"
        onChange={handleFileInput}
        accept=".jpg,.jpeg"
        max-size="1MB"
        disabled={loading}
        />

      <button
        type="submit"
        disabled={loading}
        >
          Actualizar
        </button>
      {imagenUrl &&  <img src={imagenUrl} alt="imagen" />}
    </form>
   );
}
 
export default UploadFile;