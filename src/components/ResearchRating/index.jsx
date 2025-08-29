// import  { useEffect, useState } from 'react';
// import ProductInfo from '../ResearchProducts';
// import styles from './index.module.css';
// import {auth, db} from '../../firebase'
// import {  collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
// import { Tooltip } from 'react-tooltip'
// import CheckboxGroup from '../AttributesCheckBox/attributeCheckBox';



// const ResearchRatingComponent = ({userData}) => {
//     const [showRatingComp,setShowRatingComp] = useState(true)
//     const [showModal, setShowModal] = useState(false);
//     const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);



//     const [ratings, setRatings] = useState({
//         totalNumberOfResearchProducts: 0,
//         researchRelatesToSpecialty: 0,
//         firstAuthorOnProject: 0,
//         peerReviewedJournalArticles: 0,
//         abstractResearch: 0,
//         publishedResearch: 0,
//         impactFactorOfJournals: 0,
        
//     });

//     const handleRatingChange = (event, characteristic) => {
//         const value = parseFloat(event.target.value);
//         setRatings(prevState => ({
//         ...prevState,
//         [characteristic]: value
//         }));
//     };

//     const handleCheckboxSelectionChange = (checkedItems) => {
//       setSelectedCheckboxes(checkedItems);
//     };

//     const handleModal = ()=>{
//         setShowModal(!showModal)
//     }

//     const handleSubmit = async (event) => {
//       // console.log(ratings)
//       event.preventDefault();

//       if (selectedCheckboxes.length < 5) {
//         alert("Please select at least five preferred characteristics!");
//         return;
//       } else if (selectedCheckboxes.length > 10) {
//           alert("Please choose no more than ten preferred characteristics!");
//           return;
//       }

//       try {
//         const newRatings = {...ratings,selectedCheckboxes }

//         // Reference to the document for the current user
//         const userDocRef = doc(db, 'ratings', auth.currentUser?.email);

//         // Check if the document exists
//         const docSnap = await getDoc(userDocRef);

//         if(docSnap.exists()){
//             await updateDoc(userDocRef,
//                 newRatings
//             )
//         }else {
//             // If the document doesn't exist, create it and set the form data
//             await setDoc(userDocRef, newRatings);
//         }

//         setRatings(newRatings);
        
//         setShowRatingComp(false)  

//     } catch (error) {
//         console.error('Error saving ratings: ', error);
//         alert(error.message)
//     }
//     };

//     const fetchData = async () => {
//         try {
//           const q = query(collection(db, 'ratings'),where('__name__', '==', auth.currentUser?.email));
          
//           const querySnapshot = await getDocs(q);
//           if (!querySnapshot.empty) {
//                 const userData = querySnapshot.docs[0].data();
//                 setRatings(userData)
//                 setSelectedCheckboxes(userData.selectedCheckboxes || []);
//           } else {
//             //do nothing.
//           } 
          
//         }catch (error) {
//           console.error('Error getting ratings: ', error);
//           alert(error.message)
//         }                
//     };
    
//     useEffect(() => {
//       fetchData()
//     }, []);


// return (
//     <>{
//       showRatingComp ? (

//         <form onSubmit={handleSubmit} className={styles.mainContainer}>

        
//           {/* add more options */}
//           {/* <div className={styles.modal} style={{display:`${showModal? "block":"none"}`}}>
//               <div className={styles.modalBody}>
//                   <div>
//                       <span onClick={handleModal} className={styles.close}>&times;</span>
//                   </div>
//                   <CheckboxGroup selectedItems={selectedCheckboxes} onSelectionChange={handleCheckboxSelectionChange} />

                  
               

//               </div>
//           </div> */}

//           <div style={{width:"100%",textAlign:"center",paddingBottom:"20px",fontSize:"22px"}}>
//             Research Ratings
//           </div>
//           {/* <div className={styles.addButtonDiv}>
//             <button
//             type="button"
//             onClick={handleModal} className={styles.addButton}
//             data-tooltip-id="viewToolTip" data-tooltip-content="Add more attributes"
//             >
//             <img src="./addIcon.svg" alt="" />
//             </button>
//            <Tooltip id="viewToolTip" />
//           </div> */}
         
          
//           <div className={styles.container} >
            
//             <label>
//               A. Total Number of Research Products:
//               <input
//                   type="number"
//                   min={0}
//                   max={10}
//                   step={0.1}
//                   value={ratings.totalNumberOfResearchProducts}
//                   onChange={(event) => handleRatingChange(event, 'totalNumberOfResearchProducts')}
//                   />
//               <div>
//               <input
//                 type="range"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.totalNumberOfResearchProducts}
//                 onChange={(event) => handleRatingChange(event, 'totalNumberOfResearchProducts')}
//               />
                
//               </div>
              
    
//             </label>
//           </div>     

//           <div className={styles.container} >
//             <label >
//               B. Having Research that Relates to Your Specialty:
//                <input
//                 type="number"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.researchRelatesToSpecialty}
//                 onChange={(event) => handleRatingChange(event, 'researchRelatesToSpecialty')}
//                 />
//               <div>
//                 <input
//                     type="range"
//                     min={0}
//                     max={10}
//                     step={0.1}
//                     value={ratings.researchRelatesToSpecialty}
//                     onChange={(event) => handleRatingChange(event, 'researchRelatesToSpecialty')}
//                 />
               
               

//               </div>

//             </label>
//           </div>

//           <div className={styles.container} >
//             C. Being First Author on the Project:

//               <input
//                 type="number"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.firstAuthorOnProject}
//                 onChange={(event) => handleRatingChange(event, 'firstAuthorOnProject')}
//               />
//             <label >
//               <div>
//                 <input
//                 type="range"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.firstAuthorOnProject}
//                 onChange={(event) => handleRatingChange(event, 'firstAuthorOnProject')}
                
//               />
            

//               </div>
              
//             </label>
//           </div>

//           <div className={styles.container} >
//             <label >
//               D. Having research that is categorized as "Peer-Reviewed Journal Articles" rather than other types of research products (abstracts, presentations, etc.)
//                <input
//                 type="number"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.peerReviewedJournalArticles}
//                 onChange={(event) => handleRatingChange(event, 'peerReviewedJournalArticles')}
//                 />
//               <div>
//                 <input
//                 type="range"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.peerReviewedJournalArticles}
//                 onChange={(event) => handleRatingChange(event, 'peerReviewedJournalArticles')}
//                 />
               

//               </div>
//             </label>
//           </div>

//           <div className={styles.container} >
//             <label >
//               E. Having research that is categorized as "Abstract" or "Presentation":
//                 <input
//                 type="number"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.abstractResearch}
//                 onChange={(event) => handleRatingChange(event, 'abstractResearch')}
//               />
//               <div>
//                 <input
//                 type="range"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.abstractResearch}
//                 onChange={(event) => handleRatingChange(event, 'abstractResearch')}
//               />


//               </div>
              
//             </label>
//           </div>

//           <div className={styles.container}>
//             <label >
//               F. Number of research products that are published (rather than accepted or submitted):
//                             <input
//                 type="number"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.publishedResearch}
//                 onChange={(event) => handleRatingChange(event, 'publishedResearch')}
//               />
//               <div>
//                 <input
//                 type="range"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.publishedResearch}
//                 onChange={(event) => handleRatingChange(event, 'publishedResearch')}
//               />


//               </div>
              
//             </label>
//           </div>

//           <div className={styles.container}>
//             <label >
//               G. Impact Factor of the journals published in/submitted to:
//                <input
//                 type="number"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.impactFactorOfJournals}
//                 onChange={(event) => handleRatingChange(event, 'impactFactorOfJournals')}
                
//               />
//               <div>
//                 <input
//                 type="range"
//                 min={0}
//                 max={10}
//                 step={0.1}
//                 value={ratings.impactFactorOfJournals}
//                 onChange={(event) => handleRatingChange(event, 'impactFactorOfJournals')}
//               />
//               </div>
              
//             </label>
//           </div>

//           <div style={{width:"100%",textAlign:"center",fontSize:"22px"}}>
//             Characteristics Preference Ratings
//           </div>

//           <div style={{fontSize:"10px",fontStyle:"italic",color:"gray",paddingTop:"10px"}}>
//             Please select any 05-10 characteristics.
//           </div>

//           <div className={styles.checkBoxDiv}>
//             <CheckboxGroup selectedItems={selectedCheckboxes} onSelectionChange={handleCheckboxSelectionChange} />

//           </div>

          

           

//           <button type="submit"  className={styles.submitButton}>Submit Ratings</button>
//         </form>


//       ):(
//      <>
//         <ProductInfo userData={userData} ratings={ratings}  />
//      </>
//       )
//       }

//     </>
//   );

// };

// export default ResearchRatingComponent;


import React, { useEffect, useState } from 'react';
import ProductInfo from '../ResearchProducts';
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import CheckboxGroup from '../AttributesCheckBox/attributeCheckBox';

const ResearchRatingComponent = ({ userData }) => {
    const [showRatingComp, setShowRatingComp] = useState(true);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [ratings, setRatings] = useState({
        totalNumberOfResearchProducts: 0,
        researchRelatesToSpecialty: 0,
        firstAuthorOnProject: 0,
        peerReviewedJournalArticles: 0,
        abstractResearch: 0,
        publishedResearch: 0,
        impactFactorOfJournals: 0,
    });

    const ratingLabels = [
        {
            key: 'totalNumberOfResearchProducts',
            label: 'Total Number of Research Products',
            icon: '📊',
            description: 'Overall quantity of research outputs'
        },
        {
            key: 'researchRelatesToSpecialty',
            label: 'Research Relates to Your Specialty',
            icon: '🎯',
            description: 'Alignment with your field of expertise'
        },
        {
            key: 'firstAuthorOnProject',
            label: 'Being First Author on Project',
            icon: '👤',
            description: 'Leadership role in research projects'
        },
        {
            key: 'peerReviewedJournalArticles',
            label: 'Peer-Reviewed Journal Articles',
            icon: '📝',
            description: 'Quality publications vs. other research products'
        },
        {
            key: 'abstractResearch',
            label: 'Abstract or Presentation Research',
            icon: '🎤',
            description: 'Conference presentations and abstracts'
        },
        {
            key: 'publishedResearch',
            label: 'Published Research Products',
            icon: '📚',
            description: 'Published vs. accepted or submitted work'
        },
        {
            key: 'impactFactorOfJournals',
            label: 'Impact Factor of Journals',
            icon: '⭐',
            description: 'Quality and influence of publication venues'
        }
    ];

    const handleRatingChange = (event, characteristic) => {
        const value = parseFloat(event.target.value);
        setRatings(prevState => ({
            ...prevState,
            [characteristic]: value
        }));
    };

    const handleKeyPress = (e, characteristic) => {
        if (e.key === 'Enter' && !isSubmitting) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleCheckboxSelectionChange = (checkedItems) => {
        setSelectedCheckboxes(checkedItems);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (selectedCheckboxes.length < 5) {
            alert("Please select at least five preferred characteristics!");
            setIsSubmitting(false);
            return;
        } else if (selectedCheckboxes.length > 10) {
            alert("Please choose no more than ten preferred characteristics!");
            setIsSubmitting(false);
            return;
        }

        try {
            const newRatings = { ...ratings, selectedCheckboxes };
            const userDocRef = doc(db, 'ratings', auth.currentUser?.email);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                await updateDoc(userDocRef, newRatings);
            } else {
                await setDoc(userDocRef, newRatings);
            }

            setRatings(newRatings);
            setShowRatingComp(false);

        } catch (error) {
            console.error('Error saving ratings: ', error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchData = async () => {
        try {
            const q = query(collection(db, 'ratings'), where('__name__', '==', auth.currentUser?.email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setRatings(userData);
                setSelectedCheckboxes(userData.selectedCheckboxes || []);
            }
        } catch (error) {
            console.error('Error getting ratings: ', error);
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!showRatingComp) {
        return <ProductInfo userData={userData} ratings={ratings} />;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Ratings</h1>
                    <p className="text-gray-600">Rate the importance of various research characteristics (0-10 scale)</p>
                </div>

                {/* Rating Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {ratingLabels.map((item, index) => (
                        <div key={item.key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-start space-x-3 mb-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <span className="text-indigo-600 font-bold text-sm">{String.fromCharCode(65 + index)}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Number Input */}
                                <div className="flex items-center space-x-3">
                                    <label htmlFor={`${item.key}-number`} className="text-sm font-medium text-gray-700 min-w-fit">
                                        Rating:
                                    </label>
                                    <input
                                        id={`${item.key}-number`}
                                        type="number"
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        value={ratings[item.key]}
                                        onChange={(event) => handleRatingChange(event, item.key)}
                                        onKeyPress={(e) => handleKeyPress(e, item.key)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center font-medium"
                                        disabled={isSubmitting}
                                    />
                                    <span className="text-sm text-gray-500 min-w-fit">/ 10</span>
                                </div>

                                {/* Range Slider */}
                                <div className="relative">
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        value={ratings[item.key]}
                                        onChange={(event) => handleRatingChange(event, item.key)}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        style={{
                                            background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${(ratings[item.key] / 10) * 100}%, #e5e7eb ${(ratings[item.key] / 10) * 100}%, #e5e7eb 100%)`
                                        }}
                                        disabled={isSubmitting}
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>0</span>
                                        <span>2</span>
                                        <span>4</span>
                                        <span>6</span>
                                        <span>8</span>
                                        <span>10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Characteristics Preference Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Characteristics Preference Ratings</h2>
                        <p className="text-sm text-gray-600">Please select 5-10 characteristics that are most important to you</p>
                    </div>

                   

                    <CheckboxGroup 
                        selectedItems={selectedCheckboxes} 
                        onSelectionChange={handleCheckboxSelectionChange} 
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting || selectedCheckboxes.length < 5}
                        className="inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving Ratings...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Submit Ratings
                            </>
                        )}
                    </button>
                    
                    {selectedCheckboxes.length < 5 && (
                        <p className="mt-2 text-sm text-red-600">Please select at least 5 characteristics to continue</p>
                    )}
                </div>

                {/* Help Text */}
                <div className="text-center text-sm text-gray-500">
                    <p>Press Enter in any rating field to submit the form</p>
                </div>
            </form>
        </div>
    );
};

export default ResearchRatingComponent;