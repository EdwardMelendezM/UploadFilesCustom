import ToasterProvider from "../../providers/ToasterProvider";
import UploadFile from "./UploadFile";

const FileManagement = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <ToasterProvider />
      <UploadFile/>
    </div>
   );
}
 
export default FileManagement;