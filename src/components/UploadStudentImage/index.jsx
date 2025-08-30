// import { useState } from 'react';
// import styles from './index.module.css';
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";

// const UploadStudentImage = ({ onImageUpload }) => {
//     const [imageUrl, setImageUrl] = useState(null);

//     const storage = getStorage();

//     const handleUploadImage = (e) => {
//         let img = e.target.files[0];
//         if (img === "") {
//             return;
//         }

//         const imageRef = ref(storage, `StudentImages/${img.name + v4()}`);

//         uploadBytes(imageRef, img).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 setImageUrl(url);
//                 onImageUpload(url);
//             });
//         }).catch((error) => {
//             console.error("Error uploading image: ", error);
//             alert("There was an error uploading the image. Please try again.");
//         });
//     };

//     return (
//             <div  className={styles.mainDivOfImage}>
//                 <label htmlFor="uploadPicture" style={{ display: "block", marginBottom: "0px", fontSize: "14px", paddingLeft: "0px" }}>
//                     Upload Picture:
//                 </label>
//                 <input 
//                     type="file" 
//                     id="uploadPicture" 
//                     accept="image/*" 
//                     className={styles.fileInput}
//                     onChange={handleUploadImage} 
//                 />
//                 <br />
//                 {imageUrl && 
//                 <div style={{ textAlign: "center" }}>
//                      <img src={imageUrl} width="100px" height="100px" style={{ borderRadius: "10px" }} alt="Uploaded student" />
//                 </div>}
//             </div>
//     );
// }

// export default UploadStudentImage;

import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const UploadStudentImage = ({ onImageUpload }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const storage = getStorage();

    const handleUploadImage = async (e) => {
        let img = e.target.files[0];
        if (!img) {
            return;
        }

        setIsUploading(true);

        try {
            const imageRef = ref(storage, `StudentImages/${img.name + v4()}`);
            const snapshot = await uploadBytes(imageRef, img);
            const url = await getDownloadURL(snapshot.ref);
            
            setImageUrl(url);
            onImageUpload(url);
        } catch (error) {
            console.error("Error uploading image: ", error);
            alert("There was an error uploading the image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label 
                    htmlFor="uploadPicture" 
                    className="block text-sm font-medium text-gray-700"
                >
                    Upload Picture
                </label>
                
                <div className="relative">
                    <input 
                        type="file" 
                        id="uploadPicture" 
                        accept="image/*" 
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 file:cursor-pointer cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleUploadImage}
                        disabled={isUploading}
                    />
                    
                    {isUploading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        </div>
                    )}
                </div>
            </div>

            {imageUrl && (
                <div className="flex justify-center">
                    <div className="relative group">
                        <img 
                            src={imageUrl} 
                            alt="Uploaded student" 
                            className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                        />
                        <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadStudentImage;