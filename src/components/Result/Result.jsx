// import { useEffect, useState } from "react";
// import styles from './index.module.css';
// import { createPdf } from "../../utils/createPdf";
// import { dummyResult } from "../../mocks/mockData";
// import { countAbstractResearch, countFirstName, countImpact, countPeerReviewedArticles, countPublished, countSpecialty, lorInfo, sopInfo } from "../../utils/calculationsHelper";



// const Result = ( {userData,rating,stdData}) => {
//   const [loading, setLoading] = useState(true);
//   const [result,setResult] = useState([])
//   const [resData,setResData] = useState([])
//   const [stdName,setStdName] = useState('')
//   const [selectedProperty,setSelectedProperty] = useState('research')

//   var userSpecialty = userData.specialty
//   // var userSpecialty = "Radiology"
//   // var userSpecialty = "Neurology"

//   useEffect(()=>{
//     calculations()
//   },[])

//   // useEffect(()=>{
//   //   setLoading(false)
//   //   setResult(dummyResult)
//   // },[])
  
//   const calculations = async ()=>{
//     const totalRating = Object.values(rating).reduce((acc,curr)=>acc+curr,0)


//     for(let i=0;i<stdData.length;i++){

//       let startTime = new Date().getTime()

//       let currentStd = stdData[i];
//       let score = 0;
//       setStdName(currentStd.fName)

//       //a
//       let researchProductsCount = currentStd.researchProducts.length * (rating.totalNumberOfResearchProducts);
//       score = researchProductsCount
//       console.log(`1: ${currentStd.researchProducts.length}`);

//       //b 
//       let specialtyCount = await countSpecialty(userSpecialty,currentStd.researchProducts)
//       score += specialtyCount * (rating.researchRelatesToSpecialty)

//       //c
//       let fNameCount = await countFirstName(currentStd.fName,currentStd.lName,currentStd.researchProducts)
//       score += fNameCount * (rating.firstAuthorOnProject)

//       //d 
//       let peerReviewedCount = countPeerReviewedArticles(currentStd.researchProducts)
//       score += peerReviewedCount * (rating.peerReviewedJournalArticles)
      
//       //e 
//       let abstractResearchCount = countAbstractResearch(currentStd.researchProducts)
//       score += abstractResearchCount * (rating.abstractResearch)
      
//       //f
//       let publishedCount = countPublished(currentStd.researchProducts)
//       score += publishedCount * (rating.publishedResearch)

//       //g
//       let impactFactorCount = countImpact(currentStd.researchProducts)
//       score += impactFactorCount * (rating.impactFactorOfJournals)

//       let sopScore = await sopInfo(rating.selectedCheckboxes,currentStd.sop)
//       let lorScore = await lorInfo(rating.selectedCheckboxes, currentStd.lors);    
      
//       console.log("Sop Score ",sopScore)
//       console.log("Lor scores",lorScore)

//       let final = {
//         name:currentStd.fName+" "+currentStd.lName,
//         researchScore:score,
//         sopScore,
//         lorScore, 
//         // prefferedRating: (sopScore!=="NA" )? Math.floor(
//         //   (Number(sopScore?.percentageMatchInSOP.replace('%', '') || 0) )
//         // )
//         // :"NA"
//         // prefferedRating: (sopScore!=="NA" && lorScore!=="NA")? Math.floor(
//         //   (Number(sopScore?.percentageMatchInSOP.replace('%', '') || 0) +
//         //   Number(lorScore?.percentageMatchInLOR.replace('%', '') || 0)) / 2
//         // )
//         // :"NA",
//         pic:currentStd.studentImage,
//         dob:currentStd.dob,
//         medSchool:currentStd.collegeName,
//         lor:currentStd.lors,
//         sop:currentStd.sop,
//         researchProductsCount:currentStd.researchProducts.length,
//         specialtyCount,
//         fNameCount,
//         peerReviewedCount,
//         abstractResearchCount,
//         publishedCount,
//         id:i+1
//       }

//       let endTime = new Date().getTime()

//       console.log("Time for ",i,(endTime-startTime)/1000)


//       resData.push(final)
//     }

//     resData.sort((a,b)=>b.researchScore-a.researchScore)
//     console.log(resData)
//     setResult(resData)

//     setLoading(false)
//   }


//   const handleSort = (val) => {
//     setSelectedProperty(val);
//     setResult(prevResult => {
//       return [...prevResult].sort((a, b) => {
//         if (val === 'research') {
//           return b.researchScore - a.researchScore; 
//         } else if (val === 'sopScore') {
//           return Number((b.sopScore.matchedCharacteristics[0])) - 
//                 Number((a.sopScore.matchedCharacteristics[0])); 
//         } else if (val === 'lorScore') {
//           return (Number(b.lorScore.matchedCharacteristics[0])) - 
//                 Number((a.lorScore.matchedCharacteristics[0])); 
//         }
//         return 0;
//       });
//     });
//   };


//    if (loading) {
//         return  (
//       <div className={styles['loading-overlay']}>
//         <div className={styles['loading-spinner']}></div>
//         <div className={styles['loading-text']}>Processing Results for {stdName}...</div>
//       </div>
//     );
//     }

//   return (
//     <div>
//         <div >
//         {result.length > 0 && (
//           <div className={styles.container} >
//           <div className={styles.sce}>
//             <table >
//               <thead className={styles.mainHeader}>
//                 <tr>
//                 <th >Rank #</th>
//                 <th >Name</th>
//                 <th >Medical School</th>
//                 <th className={selectedProperty==="research"? `${styles.selectedProperty}`:`${styles.cursorPointer}`}
//                 onClick={()=>handleSort("research")}
//                 >Research Rating</th>
//                 <th className={selectedProperty==="sopScore"? `${styles.selectedProperty}`: `${styles.cursorPointer}`} 
//                 onClick={()=>handleSort("sopScore")}
//                 >Personal Statement Rating</th>
//                 <th className={selectedProperty==="lorScore"? `${styles.selectedProperty}`: `${styles.cursorPointer}`} 
//                 onClick={()=>handleSort("lorScore")}>LOR Rating</th>
//                 <th >Report</th>
//                 </tr>
//               </thead>
//               <tbody>
                     
//             {result?.map((item, index) => (
//             <tr  key={index}>
//               <td className={styles.mainHeader1}>{index+1}</td>
//               <td className={styles.mainHeader2}>{item.name}</td>
//               <td className={styles.mainHeader3}>{item.medSchool}</td>
//               <td className={styles.mainHeader4}>{item.researchScore.toFixed(1)}</td>
//               <td className={styles.mainHeader5}>{item.sopScore.matchedCharacteristics}</td>
//               <td className={styles.mainHeader6}>{item.lorScore.matchedCharacteristics}</td>
//               <td className={styles.mainHeader7}> <a href="javascript:void(0);" onClick={()=>createPdf(item,index,result)}>Report</a></td>
//             </tr>
                
//             ))}
//             </tbody>
//             </table>
//           </div>
//           </div>
//         ) }
//         </div>
//     </div>   
//     )

// }

// export default Result

import { useEffect, useState } from "react";
import { createPdf } from "../../utils/createPdf";
import { dummyResult } from "../../mocks/mockData";
import { countAbstractResearch, countFirstName, countImpact, countPeerReviewedArticles, countPublished, countSpecialty, lorInfo, sopInfo } from "../../utils/calculationsHelper";

const Result = ({ userData, rating, stdData }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([])
  const [resData, setResData] = useState([])
  const [stdName, setStdName] = useState('')
  const [selectedProperty, setSelectedProperty] = useState('research')

  var userSpecialty = userData.specialty

  useEffect(() => {
    calculations()
  }, [])

  const calculations = async () => {
    const totalRating = Object.values(rating).reduce((acc, curr) => acc + curr, 0)

    for (let i = 0; i < stdData.length; i++) {
      let startTime = new Date().getTime()

      let currentStd = stdData[i];
      let score = 0;
      setStdName(currentStd.fName)

      //a
      let researchProductsCount = currentStd.researchProducts.length * (rating.totalNumberOfResearchProducts);
      score = researchProductsCount
      console.log(`1: ${currentStd.researchProducts.length}`);

      //b 
      let specialtyCount = await countSpecialty(userSpecialty, currentStd.researchProducts)
      score += specialtyCount * (rating.researchRelatesToSpecialty)

      //c
      let fNameCount = await countFirstName(currentStd.fName, currentStd.lName, currentStd.researchProducts)
      score += fNameCount * (rating.firstAuthorOnProject)

      //d 
      let peerReviewedCount = countPeerReviewedArticles(currentStd.researchProducts)
      score += peerReviewedCount * (rating.peerReviewedJournalArticles)

      //e 
      let abstractResearchCount = countAbstractResearch(currentStd.researchProducts)
      score += abstractResearchCount * (rating.abstractResearch)

      //f
      let publishedCount = countPublished(currentStd.researchProducts)
      score += publishedCount * (rating.publishedResearch)

      //g
      let impactFactorCount = countImpact(currentStd.researchProducts)
      score += impactFactorCount * (rating.impactFactorOfJournals)

      let sopScore = await sopInfo(rating.selectedCheckboxes, currentStd.sop)
      let lorScore = await lorInfo(rating.selectedCheckboxes, currentStd.lors);

      console.log("Sop Score ", sopScore)
      console.log("Lor scores", lorScore)

      let final = {
        name: currentStd.fName + " " + currentStd.lName,
        researchScore: score,
        sopScore,
        lorScore,
        pic: currentStd.studentImage,
        dob: currentStd.dob,
        medSchool: currentStd.collegeName,
        lor: currentStd.lors,
        sop: currentStd.sop,
        researchProductsCount: currentStd.researchProducts.length,
        specialtyCount,
        fNameCount,
        peerReviewedCount,
        abstractResearchCount,
        publishedCount,
        id: i + 1
      }

      let endTime = new Date().getTime()

      console.log("Time for ", i, (endTime - startTime) / 1000)

      resData.push(final)
    }

    resData.sort((a, b) => b.researchScore - a.researchScore)
    console.log(resData)
    setResult(resData)

    setLoading(false)
  }

  const handleSort = (val) => {
    setSelectedProperty(val);
    setResult(prevResult => {
      return [...prevResult].sort((a, b) => {
        if (val === 'research') {
          return b.researchScore - a.researchScore;
        } else if (val === 'sopScore') {
          return Number((b.sopScore.matchedCharacteristics[0])) -
            Number((a.sopScore.matchedCharacteristics[0]));
        } else if (val === 'lorScore') {
          return (Number(b.lorScore.matchedCharacteristics[0])) -
            Number((a.lorScore.matchedCharacteristics[0]));
        }
        return 0;
      });
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-gray-900">Processing Results</h3>
          <p className="mt-2 text-sm text-gray-600">Analyzing data for {stdName}...</p>
          <div className="mt-4 flex justify-center">
            <div className="bg-gray-200 rounded-full h-2 w-64">
              <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {result.length > 0 && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Student Rankings</h1>
                  <p className="text-sm text-gray-600">{result.length} students evaluated</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleSort("research")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                      selectedProperty === "research" 
                        ? "bg-white text-indigo-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Research
                  </button>
                  <button
                    onClick={() => handleSort("sopScore")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                      selectedProperty === "sopScore" 
                        ? "bg-white text-indigo-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    SOP
                  </button>
                  <button
                    onClick={() => handleSort("lorScore")}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                      selectedProperty === "lorScore" 
                        ? "bg-white text-indigo-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    LOR
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Rank</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Student</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Medical School</th>
                    <th 
                      className={`text-left py-4 px-6 text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                        selectedProperty === "research" 
                          ? "text-indigo-600 bg-indigo-50" 
                          : "text-gray-900 hover:text-indigo-600"
                      }`}
                      onClick={() => handleSort("research")}
                    >
                      <div className="flex items-center gap-1">
                        Research Rating
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th 
                      className={`text-left py-4 px-6 text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                        selectedProperty === "sopScore" 
                          ? "text-indigo-600 bg-indigo-50" 
                          : "text-gray-900 hover:text-indigo-600"
                      }`}
                      onClick={() => handleSort("sopScore")}
                    >
                      <div className="flex items-center gap-1">
                        Personal Statement
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th 
                      className={`text-left py-4 px-6 text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                        selectedProperty === "lorScore" 
                          ? "text-indigo-600 bg-indigo-50" 
                          : "text-gray-900 hover:text-indigo-600"
                      }`}
                      onClick={() => handleSort("lorScore")}
                    >
                      <div className="flex items-center gap-1">
                        LOR Rating
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? "bg-yellow-100 text-yellow-700" :
                            index === 1 ? "bg-gray-100 text-gray-700" :
                            index === 2 ? "bg-orange-100 text-orange-700" :
                            "bg-gray-50 text-gray-600"
                          }`}>
                            {index + 1}
                          </div>
                          {index < 3 && (
                            <div className="flex">
                              {index === 0 && <span className="text-yellow-500">🥇</span>}
                              {index === 1 && <span className="text-gray-500">🥈</span>}
                              {index === 2 && <span className="text-orange-500">🥉</span>}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.pic} 
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">DOB: {item.dob}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900 font-medium">{item.medSchool}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {item.researchScore.toFixed(1)}
                          </div>
                          {selectedProperty === "research" && (
                            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {item.sopScore.matchedCharacteristics}
                          </div>
                          {selectedProperty === "sopScore" && (
                            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {item.lorScore.matchedCharacteristics}
                          </div>
                          {selectedProperty === "lorScore" && (
                            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => createPdf(item, index, result)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{result.length}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {result.length > 0 ? result[0].researchScore.toFixed(1) : 0}
                  </p>
                  <p className="text-sm text-gray-600">Highest Score</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {result.length > 0 ? (result.reduce((sum, item) => sum + item.researchScore, 0) / result.length).toFixed(1) : 0}
                  </p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Result