import axios from "axios";
import fileDownload from "js-file-download";

export const installFile = (attachment: {
  attachment_id: number;
  file_name: string;
  size: number;
},
setPercentCompleted: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  setPercentCompleted(0);
  const {attachment_id, file_name} = attachment;
  axios.get(`messanger/installFile/${attachment_id}`,
    { 
      withCredentials: true,
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if(percent === 100) {
          setPercentCompleted(null);
        } else {
          setPercentCompleted(percent);
        }
      }
    }
  )
  .then(res => {
    fileDownload(res.data, file_name);
  })
  .catch(err => {
    console.log(err);
  });
}