// // import  { useEffect, useState } from 'react';
// // import * as XLSX from 'xlsx';
// // import Result from "../Result/Result";
// // import styles from './ResearchProduct.module.css';
// // import {auth, db} from '../../firebase'
// // import {  doc, setDoc, updateDoc,arrayUnion,getDoc,collection, query, where,getDocs   } from "firebase/firestore";
// // import { Tooltip } from 'react-tooltip'
// // import UploadStudentImage from '../UploadStudentImage';
// // import {blankPictureUrl} from '../../data/blankPicUrl';


// // const ProductInfo = ({userData,ratings,characteristics}) => {

// //     const [fName, setFName] = useState("");
// //     const [lName, setLName] = useState("");
// //     const [title, setTitle] = useState("");
// //     const [authorList, setAuthorList] = useState("");
// //     const [researchType, setResearchType] = useState("");
// //     const [publicationStatus, setPublicationStatus] = useState("");
// //     const [publicationName, setPublicationName] = useState("");
// //     const [prod, setProd] = useState([]);
// //     const [prodNo, setProdNo] = useState(1);
// //     const [dataa, setDataa] = useState([]);
// //     const [showModal, setShowModal] = useState(false);
// //     const [showHistoryModal, setShowHistoryModal] = useState(false);
// //     const [showLorModal, setShowLorModal] = useState(false);
// //     const [showSopModal, setShowSopModal] = useState(false);
// //     const [showInfoModal, setShowInfoModal] = useState(false);
// //     const [showForm,setShowForm] = useState(true)
// //     const [previousData, setPreviousData] = useState([]);
// //     const [viewData, setViewData] = useState(false);
// //     const [dataToView, setDataToView] = useState([]);    
    
// //     const [currentSop, setCurrentSop] = useState("");
// //     const [currentLors, setCurrentLors] = useState([""]);
    
// //     const [currentStudentPhoto, setCurrentStudentPhoto] = useState(blankPictureUrl);
// //     const [currentDob, setCurrentDob] = useState();
// //     const [currentCollegeName, setCurrentCollegeName] = useState("");
// //     const [resetImageCompKey, setResetImageCompKey] = useState(0);


// //     const handleLorChange = (e, index) => {
// //         const updatedLors = [...currentLors];
// //         updatedLors[index] = e.target.value;
// //         setCurrentLors(updatedLors);
// //     };

// //     const addAnotherLor = () => {
// //         setCurrentLors([...currentLors, ""]);
// //     };

// //     const getPreviousData = async (email) => {
// //             try {
// //                 const q = query(collection(db, 'researchProducts'),where('__name__', '==', email));
                
// //                 const querySnapshot = await getDocs(q);
                
// //                 const data = [];
// //                 querySnapshot.forEach((doc) => {
// //                     data.push({  ...doc.data().savedData });
// //                 });
// //                 return data;
// //             } catch (error) {
// //                 console.error('Error getting data by email: ', error);
// //                 return [];
// //             }
// //     };

// //     const fetchData = async () => {
// //             const newData = await getPreviousData(auth.currentUser?.email);
// //             // const newData = await getPreviousData('a@e.com');
// //             setPreviousData(newData)
// //     };

// //     useEffect(()=>{
// //         fetchData();
// //     },[])

// //     const handleModal = ()=>{
// //         setShowModal(!showModal)
// //     }

// //     const handleHistory = ()=>{
// //         // fetchData()
// //         setShowHistoryModal(!showHistoryModal)
// //     }

// //     const handleLor = ()=>{
// //         setShowLorModal(!showLorModal)
// //     }

// //     const handleSop = ()=>{
// //         setShowSopModal(!showSopModal)
// //     }

// //     const handleInfo = ()=>{
// //         setShowInfoModal(!showInfoModal)
// //     }

// //     const handleImageUpload = (url)=>{
// //         setCurrentStudentPhoto(url)
// //     }

// //     const handleReuse = (item)=>{
// //         setDataa(prevData => [...prevData, ...item]);
// //         setShowHistoryModal(!showHistoryModal)

// //     }

// //     const handleView = (item)=>{
// //         setDataToView(item)
// //         setViewData(!viewData)

// //     }

// //     const handleDelete = async (itemIndex) => {
// //         try {
// //             const documentRef = doc(db, 'researchProducts',auth.currentUser?.email);
// //             const snapshot = await getDoc(documentRef);
// //             const documentData = snapshot.data();


// //             // Construct a new array without the item to remove
// //             const newData = documentData.savedData.filter((item, index) => index !== itemIndex);

// //             // Update the document with the new array
// //             await updateDoc(documentRef, {
// //                 savedData: newData
// //             });

// //             fetchData();
        
// //         } catch (error) {
// //             console.error('Error deleting item from savedData array: ', error);
// //         }
// //     };

// //     const resetProductFields = () => {
// //         setTitle("");
// //         setAuthorList("");
// //         setResearchType("");
// //         setPublicationStatus("");
// //         setPublicationName("");
// //     };

// //     const addResearchProduct =  () => {
// //         if (!fName || !lName || !title || !authorList || !researchType || !publicationName ) {
// //             alert("You must fill all fields.");
// //             return 0;
// //         }

// //         if (researchType =="Peer-reviewed publication" && !publicationStatus ) {
// //             alert("Please enter publication status.");
// //             return 0;
// //         }

// //         const authorRegex = /^[A-Za-z.]+(?:\s+[A-Za-z.]+)*(?:\s*;\s*[A-Za-z.]+(?:\s+[A-Za-z.]+)*)*(?:\s*;)?$/;


// //         if (!authorRegex.test(authorList.trim())) {
// //             alert("Input format should be author1; author2; ...");
// //             return; 
// //         }

// //         // Proceed with parsing the valid authors
// //         // const authors = authorList.split(';').map(author => {
// //         //     const [firstName, lastName] = author.trim().split(',');
// //         //     return { firstName, lastName };
// //         // }).filter(author => author.firstName !== '');

// //         const authors = authorList.split(';').map(author => {
// //             return author.trim(); 
// //         }).filter(author => author !== '')        

// //         const finalPublicationStatus = publicationStatus || '-';

// //         setProd(prevProd => [...prevProd, { title, authors, researchType, publicationStatus:finalPublicationStatus, publicationName }]);
// //         setProdNo(prevProdNo => prevProdNo + 1);
// //         resetProductFields();
// //     };

// //     const addStudent =   () => {
// //         if (!fName || !lName) {
// //             alert("Enter first and last name for the student.");
// //             return;
// //         }

// //         if(!currentCollegeName){
// //             alert("Please add college name of the current student.")
// //             return
// //         }
// //         if(!currentDob){
// //             alert("Please add DOB of the current student.")  
// //             return         
// //         }
// //         if(!currentCollegeName){
// //             alert("Please add college name of the current student.")
// //             return
// //         }
// //         if(currentLors.every(item => item === '')){
// //             alert("Please add at least one LOR of the current student.")
// //             return
// //         }
// //         if(!currentSop){
// //             alert("Please add personal statement of the current student.")
// //             return
// //         }
        

// //         if (prod.length === 0 ) {
// //             alert("Please add at least one research product for the student.");
// //             return;
// //         }

// //         if(title || authorList  || publicationName){
// //             alert("Please submit product details or clear product info fields before adding a new student.")
// //             return
// //         }

// //         if(publicationStatus || researchType){
// //             setPublicationStatus("")
// //             setResearchType("")
// //         }


        

        

// //         // setDataa(prevDataa => [
// //         //     ...prevDataa,
// //         //     { fName, lName, researchProducts: [...prod] }
// //         // ]);


     
// //         // const item = { fName, lName, researchProducts: [...prod] }

// //         // handleSaveData(item)
// //         const studentData = {
// //             fName,
// //             lName,
// //             researchProducts: [...prod],

// //             sop: currentSop.replace(/\n{2,}/g, '\n'),
            
// //             lors:   currentLors.filter(item => item !== '')
// //                     .map(item => item.replace(/\n{2,}/g, '\n')),

// //             collegeName: currentCollegeName,
// //             dob:currentDob,
// //             studentImage:currentStudentPhoto
            
// //         };

// //         setDataa(prevDataa => [...prevDataa, studentData]);

// //         handleSaveData(studentData);

// //         setProdNo(1);
// //         setProd([]);
// //         setFName("");
// //         setLName("");
// //         resetProductFields();
// //         setCurrentSop(""); 
// //         setCurrentLors([""]); 
// //         setCurrentCollegeName(""); 
// //         setCurrentDob(""); 
// //         setCurrentStudentPhoto(blankPictureUrl); 
// //         setResetImageCompKey(prev=>prev+1)


// //     };

// //     const handleSaveData = async(studentData) => {
// //         console.log("Saving data:", studentData);
        
// //         const currentDate = new Date();

// //         const researchData = {
// //             dataa:[studentData],
// //             timestamp:currentDate
// //         };


// //         try {
             
// //         // Reference to the document for the current user
// //         const userDocRef = doc(db, 'researchProducts', auth.currentUser?.email);

      
// //         // Check if the document exists
// //         const docSnap = await getDoc(userDocRef);

// //         if(docSnap.exists()){
// //             await updateDoc(userDocRef,{
// //                 savedData: arrayUnion(researchData)
// //             })
// //         }else {
// //             // If the document doesn't exist, create it and set the form data
// //             await setDoc(userDocRef, { savedData: [researchData] });
// //         }
        
// //         // setShowForm(false);

// //     } catch (error) {
// //         console.error('Error saving form data: ', error);
// //     }
// //     };

// //     const handleSaveDataSession = async() => {
        
// //         const currentDate = new Date();

// //         const researchData = {
// //             dataa,
// //             timestamp:currentDate
// //         };


// //         try {
             
// //         // Reference to the document for the current user
// //         const userDocRef = doc(db, 'researchProducts', auth.currentUser?.email);

      
// //         // Check if the document exists
// //         const docSnap = await getDoc(userDocRef);

// //         if(docSnap.exists()){
// //             await updateDoc(userDocRef,{
// //                 savedData: arrayUnion(researchData)
// //             })
// //         }else {
// //             // If the document doesn't exist, create it and set the form data
// //             await setDoc(userDocRef, { savedData: [researchData] });
// //         }
        
// //         setShowForm(false);

// //     } catch (error) {
// //         console.error('Error saving form data: ', error);
// //     }
// //     };

// //     const calculateScore =  () => {
// //         console.log(dataa)
// //         if (dataa.length === 0) {
// //             alert("You must add at least one student's data to calculate the score.");
// //             return;
// //         }

// //         if(fName || lName || title || authorList || publicationName){
// //             alert("Please submit the details or clear the fields before trying to calculate result.")
// //             return
// //         }

// //         // handleSaveDataSession()

// //         setShowForm(false) //this should be commented if storing a session.
// //     };

// //     const handleFileUpload = (e) => {
// //         //this function will be implemented later!
// //         const file = e.target.files[0];
// //         const reader = new FileReader();

// //         reader.onload = (evt) => {
// //             const bstr = evt.target.result;
// //             const wb = XLSX.read(bstr, { type: 'binary' });
// //             const wsname = wb.SheetNames[0];
// //             const ws = wb.Sheets[wsname];
// //             const fileData = XLSX.utils.sheet_to_json(ws, { header: 1 });

// //             const formattedData = [];

// //             for (let i = 1; i < fileData.length; i++) {
// //                 const row = fileData[i];
// //                 const studentData = {
// //                     fName: row[0],
// //                     lName: row[1],
// //                     researchProducts: []
// //                 };

// //                 for (let j = 2; j < row.length; j += 6) {
// //                     const product = {
// //                         title: row[j],
// //                         authors: [{ lastName: row[j + 1], initials: "" }],
// //                         researchType: row[j + 2],
// //                         publicationStatus: row[j + 3] || "Accepted",
// //                         publicationName: row[j + 4]
// //                     };
// //                     studentData.researchProducts.push(product);
// //                 }

// //                 formattedData.push(studentData);
// //             }

// //             setDataa(formattedData);
// //         };

// //         reader.readAsBinaryString(file);
// //     };


// //     return (
// //         <>
// //         {showForm?(
// //             <>
// //             <div className={styles.container}>
// //                  <div className={styles.headerButtons}>
// //                     <div style={{display:'flex',gap:10}}>
// //                     <button onClick={handleLor}>Add LORs</button>
// //                     <button onClick={handleSop}>Add Personal Statement</button>
// //                     {/* <button onClick={handleInfo}>Information</button> */}

// //                 </div>
                    
// //                     {/* <button disabled onClick={() => document.getElementById('fileInput').click()}>Upload File</button> */}
// //                     <input id="fileInput" style={{display: 'none'}} type="file" accept=".xlsx" onChange={handleFileUpload} />
// //                     <div className={styles.historyBtnDiv}>
// //                     {/* <button onClick={handleModal}>View Data</button> */}
// //                     <button onClick={handleModal} className={styles.historyBtn}
// //                     data-tooltip-id="viewToolTip" data-tooltip-content="View Data"
// //                     >
// //                         <img src="./viewIcon.svg" alt="" />
// //                     </button>
// //                     <button onClick={handleHistory} className={styles.historyBtn}
// //                     data-tooltip-id="historyToolTip" data-tooltip-content="View History"
// //                     >
// //                         <img src="./historyIcon.svg" alt="" />
// //                     </button>
// //                     <Tooltip id="viewToolTip" />
// //                     <Tooltip id="historyToolTip" />
// //                     </div>
// //                 </div>
               
// //                 <div className={styles.inputContainer}>
// //                     <span>Student <b>{dataa.length + 1}</b> :</span>
// //                     <div className={styles.flName}>
// //                         <input type="text" placeholder='First Name'
// //                         value={fName}
// //                         onChange={(e) => setFName(e.target.value)} />
// //                         <input type="text" placeholder='Last Name'
// //                         value={lName}
// //                         onChange={(e) => setLName(e.target.value)} />

// //                     </div>
                    
// //                     <div className={styles.moreInfoDiv}>
// //                         <input 
// //                                 type="text" 
// //                                 id="schoolName" 
// //                                 value={currentCollegeName} 
// //                                 onChange={(e) => setCurrentCollegeName(e.target.value)} 
// //                                 placeholder="Enter School Name" 
// //                                 className={styles.textInput}
// //                         />
                        
// //                         <input 
// //                             type="date" 
// //                             id="dob" 
// //                             className={styles.dateInput}
// //                             // defaultValue="2002-01-01" 
// //                             value={currentDob} 
// //                             onChange={(e) => setCurrentDob(e.target.value)} 
// //                         />

// //                           {/* Add Picture Field */}                   
// //                     </div>

// //                     {/* <div className={styles.addPhotoDiv}> */}
// //                         <UploadStudentImage onImageUpload = {handleImageUpload} key={resetImageCompKey}/>
// //                     {/* </div> */}
                    
// //                     <div className={styles.prodNoDiv}>
// //                         <span>Research Product <b>{prodNo}</b> :</span>
// //                         <button className={styles.addButton} onClick={addResearchProduct}>Add  Product</button>
// //                     </div>
                    
// //                     <div >
// //                         <div className={styles.inputDiv}>
// //                         <input type="text" placeholder='Title'
// //                             value={title}
// //                             onChange={(e) => setTitle(e.target.value)} />
// //                         <input type="text" placeholder='Author List (First Author; Second Author; ... ;)'
// //                             value={authorList}
// //                             onChange={(e) => setAuthorList(e.target.value)} />
// //                         </div>

// //                         <label htmlFor="Type of Research"></label>
// //                         <div className={styles.inputDiv}>
// //                         <select  id="Type of Research" value={researchType} onChange={(e) => setResearchType(e.target.value)}>
// //                             <option value="">Type of Research:</option>
// //                             <option value="Peer-reviewed publication">Peer-reviewed publication</option>
// //                             <option value="Non-peer reviewed publication">Non-peer reviewed publication</option>
// //                             <option value="Abstract">Abstract</option>
// //                             <option value="Presentation">Presentation</option>
// //                         </select>

// //                         </div>

// //                         <label htmlFor="publicationStatus"></label>
// //                         <div className={styles.inputDiv}>
// //                         <select id="publicationStatus" value={publicationStatus} onChange={(e) => setPublicationStatus(e.target.value)}>
// //                             <option value="">Publication Status:</option>
// //                             <option value="Published">Published</option>
// //                             <option value="Accepted">Accepted</option>
// //                             <option value="Submitted">Submitted</option>
// //                         </select>
// //                         </div>

// //                         <div className={styles.inputDiv}>
// //                         <input type="text"
// //                         placeholder='Journal/Publication/Event Name' value={publicationName}
// //                         onChange={(e) => setPublicationName(e.target.value)} />
// //                         </div>
// //                     </div>
// //                 </div>
               
// //                 <div className={styles.buttonsContainer}>
// //                     <button className={styles.addButton} onClick={addStudent}>Add Student</button> 
// //                 </div>
                
// //                 <div className={styles.calBtn}>
// //                     <button className={styles.button} onClick={calculateScore} >Calculate Score</button>
// //                 </div>
// //             </div>

// //             {/* Modal for add LORs */}
// //            <div className={styles.modal} style={{ display: `${showLorModal ? "block" : "none"}` }}>
// //                 <div className={styles.modalBody}>
// //                     <div>
// //                         <span onClick={handleLor} className={styles.close}>&times;</span>
// //                     </div>
// //                     <br />
// //                     <br />
// //                     <div>
// //                         {currentLors.map((lor, index) => (
// //                             <textarea
// //                                 key={index}
// //                                 value={lor}
// //                                 onChange={(e) => handleLorChange(e, index)}
// //                                 placeholder={`LOR #${index + 1}`}
// //                                 className={styles.textAreaInput}
// //                             />
// //                         ))}
// //                     </div>
// //                     <button onClick={addAnotherLor} 
// //                         className={styles.addButton}   
// //                         style={{margin:"8px 0"}}                
// //                     >
// //                         Add Another LOR 
// //                     </button>
// //                 </div>
// //             </div>


// //             {/* Modal for add SOP */}
// //            <div className={styles.modal} style={{ display: `${showSopModal ? "block" : "none"}` }}>
// //                 <div className={styles.modalBody}>
// //                     <div>
// //                         <span onClick={handleSop} className={styles.close}>&times;</span>
// //                     </div>
// //                     <br />
// //                     <div style={{ textAlign: "center" }}>
// //                         <h3>
// //                             <textarea
// //                                 // type="text"
// //                                 rows={20}
// //                                 value={currentSop}
// //                                 onChange={(e) => setCurrentSop(e.target.value)}
// //                                 placeholder="Enter the statement of purpose here!"
// //                                 className={styles.textAreaInput}
// //                             />
// //                         </h3>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Modal for Add Other Info */}
// //             <div className={styles.modal} style={{ display: `${showInfoModal ? "block" : "none"}` }}>
// //                 <div className={styles.modalBody}>
// //                     <div>
// //                         <span onClick={handleInfo} className={styles.close}>&times;</span>
// //                     </div>
// //                     <br />
// //                     <div>
                        
// //                         {/* Add Picture Field */}
// //                         <UploadStudentImage onImageUpload = {handleImageUpload}/>
                        
// //                         {/* School Name Input */}
// //                         <div style={{ marginTop: "20px" }}>
// //                             <label htmlFor="schoolName" style={{ display: "block", marginBottom: "10px" }}>School Name:</label>
// //                             <input 
// //                                 type="text" 
// //                                 id="schoolName" 
// //                                 value={currentCollegeName} 
// //                                 onChange={(e) => setCurrentCollegeName(e.target.value)} 
// //                                 placeholder="Enter School Name" 
// //                                 className={styles.textInput}
                                
// //                             />
// //                         </div>

// //                         {/* Date of Birth Selector */}
// //                         <div style={{ marginTop: "20px" }}>
// //                             <label htmlFor="dob" style={{ display: "block", marginBottom: "10px" }}>Date of Birth:</label>
// //                             <input 
// //                                 type="date" 
// //                                 id="dob" 
// //                                 className={styles.dateInput}
// //                                 // defaultValue="2002-01-01" 
// //                                 value={currentDob} 
// //                                 onChange={(e) => setCurrentDob(e.target.value)} 
// //                             />
// //                         </div>

                        
// //                         <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:"20px"}}>
// //                             <div className={styles.calBtn}>
// //                                 <button  onClick={handleInfo} >Save</button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Modal for view data */}
// //             <div className={styles.modal} style={{display:  `${showModal? "block":"none"}`}}>
// //                 <div className={styles.modalBody}>
// //                     <div>
// //                         <span onClick={handleModal} className={styles.close}>&times;</span>
// //                     </div>
// //                     {dataa.length>0 ?(
// //                     <div>
// //                     {dataa.map((user, index) => (
// //                         <div key={index}>
// //                         <h2>{index+1}. {`${user.fName} ${user.lName}`}</h2>
// //                         <div>
// //                             {user.researchProducts.map((product, productIndex) => (
// //                             <div key={productIndex}>
// //                                 <h3>{product.title}</h3>
// //                                 <p><strong>Research Type:</strong> {product.researchType}</p>
// //                                 <p><strong>Publication Status:</strong> {product.publicationStatus}</p>
// //                                 <p><strong>Publication Name:</strong> {product.publicationName}</p>
// //                                 <p><strong>Authors:</strong> {product.authors.map((author, authorIndex) => (
// //                                 <span key={authorIndex}>
// //                                     {author}
// //                                     {authorIndex !== product.authors.length - 1 && ", "}

// //                                 </span>
// //                                 ))}</p>
// //                             </div>
// //                             ))}
// //                         </div>
// //                         </div>
// //                     ))}
// //                     </div>)
// //                     :(
// //                     <div style={{textAlign:"center"}}>
// //                         <h3>No Data to display!</h3>
// //                     </div>
// //                     )}

// //                 </div>
// //             </div>

// //             {/* Modal for history */}
// //             <div className={styles.modal} style={{display:  `${showHistoryModal? "block":"none"}`}}>
// //                 <div className={styles.modalBody}>
// //                     <div>
// //                         <span onClick={handleHistory} className={styles.close}>&times;</span>
// //                     </div>
// //                     {previousData.length>0 ?(
// //                     <>
// //                     {!viewData?(
// //                         <div>
// //                             <div>
// //                                 <div>
// //                                     <h3 >Previous Student's Data </h3>
// //                                 </div>

// //                                 <hr style={{color:"#754B9C"}} />
// //                             <div>
// //                                 <table className={styles.table}>
// //                                 <thead>
// //                                     <tr>
// //                                     <th >No.</th>
// //                                     <th >Student Names </th>
// //                                     <th >Date</th>
// //                                     <th >Actions</th>
// //                                     <th ></th>
// //                                     </tr>
// //                                 </thead>
// //                                 <tbody>
// //                                     {previousData.map((studentSet, index)=>(
// //                                         Object.values(studentSet).map((student, idx)=>(
// //                                              <tr key={idx}>
// //                                                 <td>{idx + 1}</td>
// //                                                 <td>
// //                                                     <div className={styles.studentNames}>
// //                                                         {student.dataa.length<2?(
// //                                                         <>
// //                                                         {student.dataa[0].fName} {student.dataa[0].lName}
                                                        
// //                                                         </>):(
// //                                                         <select>
// //                                                             {student.dataa.map((std1,indx)=>(
// //                                                                 <option key={indx}
// //                                                                  >{std1.fName} {std1.lName}</option>
// //                                                             ))}
// //                                                         </select>
// //                                                         )}
                                                      
// //                                                     </div>
// //                                                 </td>
// //                                                 <td>{new Date(student.timestamp.seconds * 1000).toLocaleString()}</td>
// //                                                  <td>
// //                                                     <div className={styles.actionBtns}>
// //                                                         <span style={{ backgroundColor: "#00cf61" }}
// //                                                         onClick={()=>handleReuse(student.dataa)}
// //                                                         >Reuse</span>
// //                                                         <span style={{ backgroundColor: "#250096", color: "white" }}
// //                                                         onClick={()=>handleView(student.dataa)}
// //                                                         >View</span>
// //                                                         <span onClick={() => handleDelete(idx)}>Delete</span>
// //                                                     </div>
// //                                                 </td>
// //                                              </tr>
// //                                         ))
// //                                     ))
// //                                     }
// //                                 </tbody>
// //                                 </table>
// //                             </div>
// //                             </div>
// //                         </div>
// //                     ):(
// //                         <>
// //                          <div>
// //                             <button onClick={()=>setViewData(false)} style={{backgroundColor:'transparent',border:"none",cursor:"pointer"}}>
// //                                 <img src="./backIcon.svg" alt="" />
// //                             </button>
// //                         </div>
// //                             <hr style={{color:"#754B9C"}} />
// //                             {dataToView.map((user, index) => (
// //                             <div key={index}>
// //                             <h2>{index+1}. {`${user.fName} ${user.lName}`}</h2>
// //                             <div>
// //                                 {user.researchProducts.map((product, productIndex) => (
// //                                 <div key={productIndex}>
// //                                     <h3>{product.title}</h3>
// //                                     <p><strong>Research Type:</strong> {product.researchType}</p>
// //                                     <p><strong>Publication Status:</strong> {product.publicationStatus}</p>
// //                                     <p><strong>Publication Name:</strong> {product.publicationName}</p>
// //                                     <p><strong>Authors:</strong> {product.authors.map((author, authorIndex) => (
// //                                     <span key={authorIndex}>
// //                                         {author}
// //                                         {authorIndex !== product.authors.length - 1 && ", "}
// //                                     </span>
// //                                     ))}</p>
// //                                 </div>
// //                                 ))}
// //                             </div>
// //                             </div>
                        
// //                         ))}
// //                         </>
                        
// //                     )}
                      
                    
// //                     </>)
// //                     :(
// //                     <div style={{textAlign:"center"}}>
// //                         <h3>No history found!</h3>
                        
// //                     </div>
// //                     )}

// //                 </div>
// //             </div>

// //             </>
// //             ):
// //             <>
// //                 <Result userData={userData} rating={ratings} stdData={dataa} />
// //             </>}
// //         </>
// //     );
// // };

// // export default ProductInfo;

// import  { useEffect, useState } from 'react';
// import * as XLSX from 'xlsx';
// import Result from "../Result/Result";
// import {auth, db} from '../../firebase'
// import {  doc, setDoc, updateDoc,arrayUnion,getDoc,collection, query, where,getDocs   } from "firebase/firestore";
// import UploadStudentImage from '../UploadStudentImage';
// import {blankPictureUrl} from '../../data/blankPicUrl';


// const ProductInfo = ({userData,ratings,characteristics}) => {

//     const [fName, setFName] = useState("");
//     const [lName, setLName] = useState("");
//     const [title, setTitle] = useState("");
//     const [authorList, setAuthorList] = useState("");
//     const [researchType, setResearchType] = useState("");
//     const [publicationStatus, setPublicationStatus] = useState("");
//     const [publicationName, setPublicationName] = useState("");
//     const [prod, setProd] = useState([]);
//     const [prodNo, setProdNo] = useState(1);
//     const [dataa, setDataa] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [showHistoryModal, setShowHistoryModal] = useState(false);
//     const [showLorModal, setShowLorModal] = useState(false);
//     const [showSopModal, setShowSopModal] = useState(false);
//     const [showInfoModal, setShowInfoModal] = useState(false);
//     const [showForm,setShowForm] = useState(true)
//     const [previousData, setPreviousData] = useState([]);
//     const [viewData, setViewData] = useState(false);
//     const [dataToView, setDataToView] = useState([]);    
    
//     const [currentSop, setCurrentSop] = useState("");
//     const [currentLors, setCurrentLors] = useState([""]);
    
//     const [currentStudentPhoto, setCurrentStudentPhoto] = useState(blankPictureUrl);
//     const [currentDob, setCurrentDob] = useState();
//     const [currentCollegeName, setCurrentCollegeName] = useState("");
//     const [resetImageCompKey, setResetImageCompKey] = useState(0);


//     const handleLorChange = (e, index) => {
//         const updatedLors = [...currentLors];
//         updatedLors[index] = e.target.value;
//         setCurrentLors(updatedLors);
//     };

//     const addAnotherLor = () => {
//         setCurrentLors([...currentLors, ""]);
//     };

//     const getPreviousData = async (email) => {
//             try {
//                 const q = query(collection(db, 'researchProducts'),where('__name__', '==', email));
                
//                 const querySnapshot = await getDocs(q);
                
//                 const data = [];
//                 querySnapshot.forEach((doc) => {
//                     data.push({  ...doc.data().savedData });
//                 });
//                 return data;
//             } catch (error) {
//                 console.error('Error getting data by email: ', error);
//                 return [];
//             }
//     };

//     const fetchData = async () => {
//             const newData = await getPreviousData(auth.currentUser?.email);
//             // const newData = await getPreviousData('a@e.com');
//             setPreviousData(newData)
//     };

//     useEffect(()=>{
//         fetchData();
//     },[])

//     const handleModal = ()=>{
//         setShowModal(!showModal)
//     }

//     const handleHistory = ()=>{
//         // fetchData()
//         setShowHistoryModal(!showHistoryModal)
//     }

//     const handleLor = ()=>{
//         setShowLorModal(!showLorModal)
//     }

//     const handleSop = ()=>{
//         setShowSopModal(!showSopModal)
//     }

//     const handleInfo = ()=>{
//         setShowInfoModal(!showInfoModal)
//     }

//     const handleImageUpload = (url)=>{
//         setCurrentStudentPhoto(url)
//     }

//     const handleReuse = (item)=>{
//         setDataa(prevData => [...prevData, ...item]);
//         setShowHistoryModal(!showHistoryModal)

//     }

//     const handleView = (item)=>{
//         setDataToView(item)
//         setViewData(!viewData)

//     }

//     const handleDelete = async (itemIndex) => {
//         try {
//             const documentRef = doc(db, 'researchProducts',auth.currentUser?.email);
//             const snapshot = await getDoc(documentRef);
//             const documentData = snapshot.data();


//             // Construct a new array without the item to remove
//             const newData = documentData.savedData.filter((item, index) => index !== itemIndex);

//             // Update the document with the new array
//             await updateDoc(documentRef, {
//                 savedData: newData
//             });

//             fetchData();
        
//         } catch (error) {
//             console.error('Error deleting item from savedData array: ', error);
//         }
//     };

//     const resetProductFields = () => {
//         setTitle("");
//         setAuthorList("");
//         setResearchType("");
//         setPublicationStatus("");
//         setPublicationName("");
//     };

//     const addResearchProduct =  () => {
//         if (!fName || !lName || !title || !authorList || !researchType || !publicationName ) {
//             alert("You must fill all fields.");
//             return 0;
//         }

//         if (researchType =="Peer-reviewed publication" && !publicationStatus ) {
//             alert("Please enter publication status.");
//             return 0;
//         }

//         const authorRegex = /^[A-Za-z.]+(?:\s+[A-Za-z.]+)*(?:\s*;\s*[A-Za-z.]+(?:\s+[A-Za-z.]+)*)*(?:\s*;)?$/;


//         if (!authorRegex.test(authorList.trim())) {
//             alert("Input format should be author1; author2; ...");
//             return; 
//         }

//         // Proceed with parsing the valid authors
//         // const authors = authorList.split(';').map(author => {
//         //     const [firstName, lastName] = author.trim().split(',');
//         //     return { firstName, lastName };
//         // }).filter(author => author.firstName !== '');

//         const authors = authorList.split(';').map(author => {
//             return author.trim(); 
//         }).filter(author => author !== '')        

//         const finalPublicationStatus = publicationStatus || '-';

//         setProd(prevProd => [...prevProd, { title, authors, researchType, publicationStatus:finalPublicationStatus, publicationName }]);
//         setProdNo(prevProdNo => prevProdNo + 1);
//         resetProductFields();
//     };

//     const addStudent =   () => {
//         if (!fName || !lName) {
//             alert("Enter first and last name for the student.");
//             return;
//         }

//         if(!currentCollegeName){
//             alert("Please add college name of the current student.")
//             return
//         }
//         if(!currentDob){
//             alert("Please add DOB of the current student.")  
//             return         
//         }
//         if(!currentCollegeName){
//             alert("Please add college name of the current student.")
//             return
//         }
//         if(currentLors.every(item => item === '')){
//             alert("Please add at least one LOR of the current student.")
//             return
//         }
//         if(!currentSop){
//             alert("Please add personal statement of the current student.")
//             return
//         }
        

//         if (prod.length === 0 ) {
//             alert("Please add at least one research product for the student.");
//             return;
//         }

//         if(title || authorList  || publicationName){
//             alert("Please submit product details or clear product info fields before adding a new student.")
//             return
//         }

//         if(publicationStatus || researchType){
//             setPublicationStatus("")
//             setResearchType("")
//         }


        

        

//         // setDataa(prevDataa => [
//         //     ...prevDataa,
//         //     { fName, lName, researchProducts: [...prod] }
//         // ]);


     
//         // const item = { fName, lName, researchProducts: [...prod] }

//         // handleSaveData(item)
//         const studentData = {
//             fName,
//             lName,
//             researchProducts: [...prod],

//             sop: currentSop.replace(/\n{2,}/g, '\n'),
            
//             lors:   currentLors.filter(item => item !== '')
//                     .map(item => item.replace(/\n{2,}/g, '\n')),

//             collegeName: currentCollegeName,
//             dob:currentDob,
//             studentImage:currentStudentPhoto
            
//         };

//         setDataa(prevDataa => [...prevDataa, studentData]);

//         handleSaveData(studentData);

//         setProdNo(1);
//         setProd([]);
//         setFName("");
//         setLName("");
//         resetProductFields();
//         setCurrentSop(""); 
//         setCurrentLors([""]); 
//         setCurrentCollegeName(""); 
//         setCurrentDob(""); 
//         setCurrentStudentPhoto(blankPictureUrl); 
//         setResetImageCompKey(prev=>prev+1)


//     };

//     const handleSaveData = async(studentData) => {
//         console.log("Saving data:", studentData);
        
//         const currentDate = new Date();

//         const researchData = {
//             dataa:[studentData],
//             timestamp:currentDate
//         };


//         try {
             
//         // Reference to the document for the current user
//         const userDocRef = doc(db, 'researchProducts', auth.currentUser?.email);

      
//         // Check if the document exists
//         const docSnap = await getDoc(userDocRef);

//         if(docSnap.exists()){
//             await updateDoc(userDocRef,{
//                 savedData: arrayUnion(researchData)
//             })
//         }else {
//             // If the document doesn't exist, create it and set the form data
//             await setDoc(userDocRef, { savedData: [researchData] });
//         }
        
//         // setShowForm(false);

//     } catch (error) {
//         console.error('Error saving form data: ', error);
//     }
//     };

//     const handleSaveDataSession = async() => {
        
//         const currentDate = new Date();

//         const researchData = {
//             dataa,
//             timestamp:currentDate
//         };


//         try {
             
//         // Reference to the document for the current user
//         const userDocRef = doc(db, 'researchProducts', auth.currentUser?.email);

      
//         // Check if the document exists
//         const docSnap = await getDoc(userDocRef);

//         if(docSnap.exists()){
//             await updateDoc(userDocRef,{
//                 savedData: arrayUnion(researchData)
//             })
//         }else {
//             // If the document doesn't exist, create it and set the form data
//             await setDoc(userDocRef, { savedData: [researchData] });
//         }
        
//         setShowForm(false);

//     } catch (error) {
//         console.error('Error saving form data: ', error);
//     }
//     };

//     const calculateScore =  () => {
//         console.log(dataa)
//         if (dataa.length === 0) {
//             alert("You must add at least one student's data to calculate the score.");
//             return;
//         }

//         if(fName || lName || title || authorList || publicationName){
//             alert("Please submit the details or clear the fields before trying to calculate result.")
//             return
//         }

//         // handleSaveDataSession()

//         setShowForm(false) //this should be commented if storing a session.
//     };

//     const handleFileUpload = (e) => {
//         //this function will be implemented later!
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (evt) => {
//             const bstr = evt.target.result;
//             const wb = XLSX.read(bstr, { type: 'binary' });
//             const wsname = wb.SheetNames[0];
//             const ws = wb.Sheets[wsname];
//             const fileData = XLSX.utils.sheet_to_json(ws, { header: 1 });

//             const formattedData = [];

//             for (let i = 1; i < fileData.length; i++) {
//                 const row = fileData[i];
//                 const studentData = {
//                     fName: row[0],
//                     lName: row[1],
//                     researchProducts: []
//                 };

//                 for (let j = 2; j < row.length; j += 6) {
//                     const product = {
//                         title: row[j],
//                         authors: [{ lastName: row[j + 1], initials: "" }],
//                         researchType: row[j + 2],
//                         publicationStatus: row[j + 3] || "Accepted",
//                         publicationName: row[j + 4]
//                     };
//                     studentData.researchProducts.push(product);
//                 }

//                 formattedData.push(studentData);
//             }

//             setDataa(formattedData);
//         };

//         reader.readAsBinaryString(file);
//     };


// return (
//     <>
//         {showForm ? (
//             <div className="max-w-6xl mx-auto space-y-8">
//                 {/* Header Section */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                         {/* Action Buttons */}
//                         <div className="flex flex-wrap gap-3">
//                             <button
//                                 onClick={handleLor}
//                                 className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                             >
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.207-1.955L6 18l-1.955.793A7.962 7.962 0 014 12z" />
//                                 </svg>
//                                 Add LORs
//                             </button>
//                             <button
//                                 onClick={handleSop}
//                                 className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                             >
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                 </svg>
//                                 Add Personal Statement
//                             </button>
//                         </div>

//                         {/* View Actions */}
//                         <div className="flex items-center gap-3">
//                             <button
//                                 onClick={handleModal}
//                                 className="inline-flex items-center p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                                 title="View Current Data"
//                             >
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                 </svg>
//                             </button>
//                             <button
//                                 onClick={handleHistory}
//                                 className="inline-flex items-center p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                 title="View History"
//                             >
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </button>
//                         </div>
                        
//                         <input 
//                             id="fileInput" 
//                             style={{display: 'none'}} 
//                             type="file" 
//                             accept=".xlsx" 
//                             onChange={handleFileUpload} 
//                         />
//                     </div>
//                 </div>

//                 {/* Student Information Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="p-6 border-b border-gray-200">
//                         <div className="flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
//                                 <span className="text-white font-bold text-sm">{dataa.length + 1}</span>
//                             </div>
//                             <h2 className="text-xl font-semibold text-gray-900">Student {dataa.length + 1}</h2>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Name Fields */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                                     First Name
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="firstName"
//                                         type="text"
//                                         placeholder="First Name"
//                                         value={fName}
//                                         onChange={(e) => setFName(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Last Name
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="lastName"
//                                         type="text"
//                                         placeholder="Last Name"
//                                         value={lName}
//                                         onChange={(e) => setLName(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* School and Date */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
//                                     School Name
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="schoolName"
//                                         type="text"
//                                         placeholder="Enter School Name"
//                                         value={currentCollegeName}
//                                         onChange={(e) => setCurrentCollegeName(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Date of Birth
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="dob"
//                                         type="date"
//                                         value={currentDob}
//                                         onChange={(e) => setCurrentDob(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Image Upload */}
//                         <UploadStudentImage onImageUpload={handleImageUpload} key={resetImageCompKey} />
//                     </div>
//                 </div>

//                 {/* Research Product Section */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                     <div className="p-6 border-b border-gray-200">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
//                                     <span className="text-white font-bold text-sm">{prodNo}</span>
//                                 </div>
//                                 <h3 className="text-xl font-semibold text-gray-900">Research Product {prodNo}</h3>
//                             </div>
//                             <button
//                                 onClick={addResearchProduct}
//                                 className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                             >
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                 </svg>
//                                 Add Product
//                             </button>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {/* Title and Authors */}
//                         <div className="space-y-4">
//                             <div>
//                                 <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Research Title
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.207-1.955L6 18l-1.955.793A7.962 7.962 0 014 12z" />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="title"
//                                         type="text"
//                                         placeholder="Enter research title"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>
                            
//                             <div>
//                                 <label htmlFor="authorList" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Author List
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                                         </svg>
//                                     </div>
//                                     <input
//                                         id="authorList"
//                                         type="text"
//                                         placeholder="First Author; Second Author; Third Author; ..."
//                                         value={authorList}
//                                         onChange={(e) => setAuthorList(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                     />
//                                 </div>
//                                 <p className="mt-1 text-sm text-gray-500">Separate authors with semicolons</p>
//                             </div>
//                         </div>

//                         {/* Dropdowns */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label htmlFor="researchType" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Type of Research
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         id="researchType"
//                                         value={researchType}
//                                         onChange={(e) => setResearchType(e.target.value)}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
//                                     >
//                                         <option value="">Select research type</option>
//                                         <option value="Peer-reviewed publication">Peer-reviewed publication</option>
//                                         <option value="Non-peer reviewed publication">Non-peer reviewed publication</option>
//                                         <option value="Abstract">Abstract</option>
//                                         <option value="Presentation">Presentation</option>
//                                     </select>
//                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label htmlFor="publicationStatus" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Publication Status
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         id="publicationStatus"
//                                         value={publicationStatus}
//                                         onChange={(e) => setPublicationStatus(e.target.value)}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
//                                     >
//                                         <option value="">Select publication status</option>
//                                         <option value="Published">Published</option>
//                                         <option value="Accepted">Accepted</option>
//                                         <option value="Submitted">Submitted</option>
//                                     </select>
//                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Publication Name */}
//                         <div>
//                             <label htmlFor="publicationName" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Journal/Publication/Event Name
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//                                     </svg>
//                                 </div>
//                                 <input
//                                     id="publicationName"
//                                     type="text"
//                                     placeholder="Enter journal, publication, or event name"
//                                     value={publicationName}
//                                     onChange={(e) => setPublicationName(e.target.value)}
//                                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <button
//                         onClick={addStudent}
//                         className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                         </svg>
//                         Add Student
//                     </button>
                    
//                     <button
//                         onClick={calculateScore}
//                         className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                     >
//                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                         </svg>
//                         Calculate Score
//                     </button>
//                 </div>

//                 {/* LOR Modal */}
//                 <div 
//                     className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${showLorModal ? 'block' : 'hidden'}`}
//                 >
//                     <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex items-center justify-between">
//                                 <h3 className="text-xl font-semibold text-gray-900">Letters of Recommendation</h3>
//                                 <button
//                                     onClick={handleLor}
//                                     className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
                        
//                         <div className="p-6 space-y-4">
//                             {currentLors.map((lor, index) => (
//                                 <div key={index}>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Letter of Recommendation #{index + 1}
//                                     </label>
//                                     <textarea
//                                         value={lor}
//                                         onChange={(e) => handleLorChange(e, index)}
//                                         placeholder={`Enter LOR #${index + 1} content...`}
//                                         rows={6}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
//                                     />
//                                 </div>
//                             ))}
//                             <button
//                                 onClick={addAnotherLor}
//                                 className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
//                             >
//                                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                 </svg>
//                                 Add Another LOR
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* SOP Modal */}
//                 <div 
//                     className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${showSopModal ? 'block' : 'hidden'}`}
//                 >
//                     <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="p-6 border-b border-gray-200">
//                             <div className="flex items-center justify-between">
//                                 <h3 className="text-xl font-semibold text-gray-900">Personal Statement</h3>
//                                 <button
//                                     onClick={handleSop}
//                                     className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
                        
//                         <div className="p-6">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Statement of Purpose
//                             </label>
//                             <textarea
//                                 rows={20}
//                                 value={currentSop}
//                                 onChange={(e) => setCurrentSop(e.target.value)}
//                                 placeholder="Enter the statement of purpose here..."
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
//                             />
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         ) : (
//             <Result userData={userData} rating={ratings} stdData={dataa} />
//         )}
//     </>
// );
// };

// export default ProductInfo;


import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Result from "../Result/Result";
import { auth, db } from '../../firebase'
import { doc, setDoc, updateDoc, arrayUnion, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Tooltip } from 'react-tooltip'
import UploadStudentImage from '../UploadStudentImage';
import { blankPictureUrl } from '../../data/blankPicUrl';

const ProductInfo = ({ userData, ratings, characteristics }) => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [title, setTitle] = useState("");
    const [authorList, setAuthorList] = useState("");
    const [researchType, setResearchType] = useState("");
    const [publicationStatus, setPublicationStatus] = useState("");
    const [publicationName, setPublicationName] = useState("");
    const [prod, setProd] = useState([]);
    const [prodNo, setProdNo] = useState(1);
    const [dataa, setDataa] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showLorModal, setShowLorModal] = useState(false);
    const [showSopModal, setShowSopModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showForm, setShowForm] = useState(true)
    const [previousData, setPreviousData] = useState([]);
    const [viewData, setViewData] = useState(false);
    const [dataToView, setDataToView] = useState([]);

    const [currentSop, setCurrentSop] = useState("");
    const [currentLors, setCurrentLors] = useState([""]);

    const [currentStudentPhoto, setCurrentStudentPhoto] = useState(blankPictureUrl);
    const [currentDob, setCurrentDob] = useState();
    const [currentCollegeName, setCurrentCollegeName] = useState("");
    const [resetImageCompKey, setResetImageCompKey] = useState(0);

    const handleLorChange = (e, index) => {
        const updatedLors = [...currentLors];
        updatedLors[index] = e.target.value;
        setCurrentLors(updatedLors);
    };

    const addAnotherLor = () => {
        setCurrentLors([...currentLors, ""]);
    };

    const getPreviousData = async (email) => {
        try {
            const q = query(collection(db, 'researchProducts'), where('__name__', '==', email));

            const querySnapshot = await getDocs(q);

            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data().savedData });
            });
            return data;
        } catch (error) {
            console.error('Error getting data by email: ', error);
            return [];
        }
    };

    const fetchData = async () => {
        const newData = await getPreviousData(auth.currentUser?.email);
        setPreviousData(newData)
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleModal = () => {
        setShowModal(!showModal)
    }

    const handleHistory = () => {
        setShowHistoryModal(!showHistoryModal)
    }

    const handleLor = () => {
        setShowLorModal(!showLorModal)
    }

    const handleSop = () => {
        setShowSopModal(!showSopModal)
    }

    const handleInfo = () => {
        setShowInfoModal(!showInfoModal)
    }

    const handleImageUpload = (url) => {
        setCurrentStudentPhoto(url)
    }

    const handleReuse = (item) => {
        setDataa(prevData => [...prevData, ...item]);
        setShowHistoryModal(!showHistoryModal)
    }

    const handleView = (item) => {
        setDataToView(item)
        setViewData(!viewData)
    }

    const handleDelete = async (itemIndex) => {
        try {
            const documentRef = doc(db, 'researchProducts', auth.currentUser?.email);
            const snapshot = await getDoc(documentRef);
            const documentData = snapshot.data();

            const newData = documentData.savedData.filter((item, index) => index !== itemIndex);

            await updateDoc(documentRef, {
                savedData: newData
            });

            fetchData();

        } catch (error) {
            console.error('Error deleting item from savedData array: ', error);
        }
    };

    const resetProductFields = () => {
        setTitle("");
        setAuthorList("");
        setResearchType("");
        setPublicationStatus("");
        setPublicationName("");
    };

    const addResearchProduct = () => {
        if (!fName || !lName || !title || !authorList || !researchType || !publicationName) {
            alert("You must fill all fields.");
            return 0;
        }

        if (researchType == "Peer-reviewed publication" && !publicationStatus) {
            alert("Please enter publication status.");
            return 0;
        }

        const authorRegex = /^[A-Za-z.]+(?:\s+[A-Za-z.]+)*(?:\s*;\s*[A-Za-z.]+(?:\s+[A-Za-z.]+)*)*(?:\s*;)?$/;

        if (!authorRegex.test(authorList.trim())) {
            alert("Input format should be author1; author2; ...");
            return;
        }

        const authors = authorList.split(';').map(author => {
            return author.trim();
        }).filter(author => author !== '')

        const finalPublicationStatus = publicationStatus || '-';

        setProd(prevProd => [...prevProd, { title, authors, researchType, publicationStatus: finalPublicationStatus, publicationName }]);
        setProdNo(prevProdNo => prevProdNo + 1);
        resetProductFields();
    };

    const addStudent = () => {
        if (!fName || !lName) {
            alert("Enter first and last name for the student.");
            return;
        }

        if (!currentCollegeName) {
            alert("Please add college name of the current student.")
            return
        }
        if (!currentDob) {
            alert("Please add DOB of the current student.")
            return
        }
        if (currentLors.every(item => item === '')) {
            alert("Please add at least one LOR of the current student.")
            return
        }
        if (!currentSop) {
            alert("Please add personal statement of the current student.")
            return
        }

        if (prod.length === 0) {
            alert("Please add at least one research product for the student.");
            return;
        }

        if (title || authorList || publicationName) {
            alert("Please submit product details or clear product info fields before adding a new student.")
            return
        }

        if (publicationStatus || researchType) {
            setPublicationStatus("")
            setResearchType("")
        }

        const studentData = {
            fName,
            lName,
            researchProducts: [...prod],
            sop: currentSop.replace(/\n{2,}/g, '\n'),
            lors: currentLors.filter(item => item !== '')
                .map(item => item.replace(/\n{2,}/g, '\n')),
            collegeName: currentCollegeName,
            dob: currentDob,
            studentImage: currentStudentPhoto
        };

        setDataa(prevDataa => [...prevDataa, studentData]);
        handleSaveData(studentData);

        setProdNo(1);
        setProd([]);
        setFName("");
        setLName("");
        resetProductFields();
        setCurrentSop("");
        setCurrentLors([""]);
        setCurrentCollegeName("");
        setCurrentDob("");
        setCurrentStudentPhoto(blankPictureUrl);
        setResetImageCompKey(prev => prev + 1)
    };

    const handleSaveData = async (studentData) => {
        console.log("Saving data:", studentData);

        const currentDate = new Date();

        const researchData = {
            dataa: [studentData],
            timestamp: currentDate
        };

        try {
            const userDocRef = doc(db, 'researchProducts', auth.currentUser?.email);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                await updateDoc(userDocRef, {
                    savedData: arrayUnion(researchData)
                })
            } else {
                await setDoc(userDocRef, { savedData: [researchData] });
            }

        } catch (error) {
            console.error('Error saving form data: ', error);
        }
    };

    const handleSaveDataSession = async () => {
        const currentDate = new Date();

        const researchData = {
            dataa,
            timestamp: currentDate
        };

        try {
            const userDocRef = doc(db, 'researchProducts', auth.currentUser?.email);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                await updateDoc(userDocRef, {
                    savedData: arrayUnion(researchData)
                })
            } else {
                await setDoc(userDocRef, { savedData: [researchData] });
            }

            setShowForm(false);

        } catch (error) {
            console.error('Error saving form data: ', error);
        }
    };

    const calculateScore = () => {
        console.log(dataa)
        if (dataa.length === 0) {
            alert("You must add at least one student's data to calculate the score.");
            return;
        }

        if (fName || lName || title || authorList || publicationName) {
            alert("Please submit the details or clear the fields before trying to calculate result.")
            return
        }

        setShowForm(false)
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const fileData = XLSX.utils.sheet_to_json(ws, { header: 1 });

            const formattedData = [];

            for (let i = 1; i < fileData.length; i++) {
                const row = fileData[i];
                const studentData = {
                    fName: row[0],
                    lName: row[1],
                    researchProducts: []
                };

                for (let j = 2; j < row.length; j += 6) {
                    const product = {
                        title: row[j],
                        authors: [{ lastName: row[j + 1], initials: "" }],
                        researchType: row[j + 2],
                        publicationStatus: row[j + 3] || "Accepted",
                        publicationName: row[j + 4]
                    };
                    studentData.researchProducts.push(product);
                }

                formattedData.push(studentData);
            }

            setDataa(formattedData);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <>
            {showForm ? (
                <>
                    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
                        {/* Header with Action Buttons */}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleLor}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Add LORs
                                </button>
                                <button 
                                    onClick={handleSop}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Add Personal Statement
                                </button>
                            </div>

                            <input id="fileInput" className="hidden" type="file" accept=".xlsx" onChange={handleFileUpload} />
                            
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleModal}
                                    className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                    data-tooltip-id="viewToolTip" 
                                    data-tooltip-content="View Current Data"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={handleHistory}
                                    className="p-3 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
                                    data-tooltip-id="historyToolTip" 
                                    data-tooltip-content="View History"
                                >
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <Tooltip id="viewToolTip" />
                                <Tooltip id="historyToolTip" />
                            </div>
                        </div>

                        {/* Main Form Container */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            {/* Student Header */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                    {dataa.length + 1}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Student {dataa.length + 1}</h2>
                            </div>

                            {/* Student Basic Info */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter first name"
                                            value={fName}
                                            onChange={(e) => setFName(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter last name"
                                            value={lName}
                                            onChange={(e) => setLName(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            School Name
                                        </label>
                                        <input 
                                            type="text" 
                                            id="schoolName" 
                                            value={currentCollegeName} 
                                            onChange={(e) => setCurrentCollegeName(e.target.value)} 
                                            placeholder="Enter school name" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <input 
                                            type="date" 
                                            id="dob" 
                                            value={currentDob} 
                                            onChange={(e) => setCurrentDob(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Student Photo
                                    </label>
                                    <UploadStudentImage onImageUpload={handleImageUpload} key={resetImageCompKey} />
                                </div>
                            </div>
                        </div>

                        {/* Research Products Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                        {prodNo}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Research Product {prodNo}</h3>
                                </div>
                                <button 
                                    onClick={addResearchProduct}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Product
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter research title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author List
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="First Author; Second Author; ..."
                                            value={authorList}
                                            onChange={(e) => setAuthorList(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Type of Research
                                        </label>
                                        <select 
                                            value={researchType} 
                                            onChange={(e) => setResearchType(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
                                        >
                                            <option value="">Select type of research</option>
                                            <option value="Peer-reviewed publication">Peer-reviewed publication</option>
                                            <option value="Non-peer reviewed publication">Non-peer reviewed publication</option>
                                            <option value="Abstract">Abstract</option>
                                            <option value="Presentation">Presentation</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Publication Status
                                        </label>
                                        <select 
                                            value={publicationStatus} 
                                            onChange={(e) => setPublicationStatus(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
                                        >
                                            <option value="">Select publication status</option>
                                            <option value="Published">Published</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Submitted">Submitted</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Journal/Publication/Event Name
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="Enter journal, publication, or event name" 
                                        value={publicationName}
                                        onChange={(e) => setPublicationName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center">
                            <button 
                                onClick={addStudent}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Add Student
                            </button>
                            
                            <button 
                                onClick={calculateScore}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Calculate Score
                            </button>
                        </div>
                    </div>

                    {/* Modal for add LORs */}
                    {showLorModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900">Letters of Recommendation</h3>
                                    <button 
                                        onClick={handleLor}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="p-6 space-y-4">
                                    {currentLors.map((lor, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                LOR #{index + 1}
                                            </label>
                                            <textarea
                                                value={lor}
                                                onChange={(e) => handleLorChange(e, index)}
                                                placeholder={`Enter LOR #${index + 1} content here...`}
                                                rows={6}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
                                            />
                                        </div>
                                    ))}
                                    
                                    <button 
                                        onClick={addAnotherLor}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Another LOR
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal for add SOP */}
                    {showSopModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900">Statement of Purpose</h3>
                                    <button 
                                        onClick={handleSop}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Personal Statement
                                    </label>
                                    <textarea
                                        rows={20}
                                        value={currentSop}
                                        onChange={(e) => setCurrentSop(e.target.value)}
                                        placeholder="Enter the statement of purpose here..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal for Add Other Info */}
                    {showInfoModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
                                    <button 
                                        onClick={handleInfo}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="p-6 space-y-6">
                                    <UploadStudentImage onImageUpload={handleImageUpload} />
                                    
                                    <div>
                                        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                                            School Name
                                        </label>
                                        <input 
                                            type="text" 
                                            id="schoolName" 
                                            value={currentCollegeName} 
                                            onChange={(e) => setCurrentCollegeName(e.target.value)} 
                                            placeholder="Enter School Name" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <input 
                                            type="date" 
                                            id="dob" 
                                            value={currentDob} 
                                            onChange={(e) => setCurrentDob(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-center">
                                        <button 
                                            onClick={handleInfo}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            Save Information
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal for view data */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900">Current Session Data</h3>
                                    <button 
                                        onClick={handleModal}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="p-6">
                                    {dataa.length > 0 ? (
                                        <div className="space-y-8">
                                            {dataa.map((user, index) => (
                                                <div key={index} className="border border-gray-200 rounded-lg p-6">
                                                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                                                        {index + 1}. {user.fName} {user.lName}
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {user.researchProducts.map((product, productIndex) => (
                                                            <div key={productIndex} className="bg-gray-50 rounded-lg p-4">
                                                                <h5 className="font-semibold text-gray-900 mb-2">{product.title}</h5>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                                    <p><span className="font-medium text-gray-700">Research Type:</span> {product.researchType}</p>
                                                                    <p><span className="font-medium text-gray-700">Publication Status:</span> {product.publicationStatus}</p>
                                                                    <p className="md:col-span-2"><span className="font-medium text-gray-700">Publication Name:</span> {product.publicationName}</p>
                                                                    <p className="md:col-span-2">
                                                                        <span className="font-medium text-gray-700">Authors:</span> {product.authors.join(', ')}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <h4 className="text-lg font-medium text-gray-900 mb-2">No Data to Display</h4>
                                            <p className="text-gray-600">Add some students to see their information here.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal for history */}
                    {showHistoryModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {viewData ? "Student Details" : "Previous Student Data"}
                                    </h3>
                                    <button 
                                        onClick={handleHistory}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="p-6">
                                    {previousData.length > 0 ? (
                                        <>
                                            {!viewData ? (
                                                <div className="overflow-x-auto">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                            <tr className="border-b border-gray-200">
                                                                <th className="text-left py-3 px-4 font-semibold text-gray-900">No.</th>
                                                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Student Names</th>
                                                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                                                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {previousData.map((studentSet, index) => (
                                                                Object.values(studentSet).map((student, idx) => (
                                                                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                                        <td className="py-4 px-4 text-gray-700">{idx + 1}</td>
                                                                        <td className="py-4 px-4">
                                                                            {student.dataa.length < 2 ? (
                                                                                <span className="font-medium text-gray-900">
                                                                                    {student.dataa[0].fName} {student.dataa[0].lName}
                                                                                </span>
                                                                            ) : (
                                                                                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                                                                    {student.dataa.map((std1, indx) => (
                                                                                        <option key={indx}>
                                                                                            {std1.fName} {std1.lName}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            )}
                                                                        </td>
                                                                        <td className="py-4 px-4 text-gray-600 text-sm">
                                                                            {new Date(student.timestamp.seconds * 1000).toLocaleString()}
                                                                        </td>
                                                                        <td className="py-4 px-4">
                                                                            <div className="flex gap-2">
                                                                                <button 
                                                                                    onClick={() => handleReuse(student.dataa)}
                                                                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                                                                                >
                                                                                    Reuse
                                                                                </button>
                                                                                <button 
                                                                                    onClick={() => handleView(student.dataa)}
                                                                                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                                                                                >
                                                                                    View
                                                                                </button>
                                                                                <button 
                                                                                    onClick={() => handleDelete(idx)}
                                                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button 
                                                        onClick={() => setViewData(false)}
                                                        className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                        </svg>
                                                        Back to History
                                                    </button>
                                                    
                                                    <div className="space-y-8">
                                                        {dataToView.map((user, index) => (
                                                            <div key={index} className="border border-gray-200 rounded-lg p-6">
                                                                <h4 className="text-lg font-bold text-gray-900 mb-4">
                                                                    {index + 1}. {user.fName} {user.lName}
                                                                </h4>
                                                                <div className="space-y-4">
                                                                    {user.researchProducts.map((product, productIndex) => (
                                                                        <div key={productIndex} className="bg-gray-50 rounded-lg p-4">
                                                                            <h5 className="font-semibold text-gray-900 mb-2">{product.title}</h5>
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                                                <p><span className="font-medium text-gray-700">Research Type:</span> {product.researchType}</p>
                                                                                <p><span className="font-medium text-gray-700">Publication Status:</span> {product.publicationStatus}</p>
                                                                                <p className="md:col-span-2"><span className="font-medium text-gray-700">Publication Name:</span> {product.publicationName}</p>
                                                                                <p className="md:col-span-2">
                                                                                    <span className="font-medium text-gray-700">Authors:</span> {product.authors.join(', ')}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-12">
                                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h4 className="text-lg font-medium text-gray-900 mb-2">No History Found</h4>
                                            <p className="text-gray-600">No previous student data available.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <Result userData={userData} rating={ratings} stdData={dataa} />
                </>
            )}
        </>
    );
};

export default ProductInfo;