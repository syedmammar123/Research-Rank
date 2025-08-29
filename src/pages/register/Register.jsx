// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {auth, db} from '../../firebase'
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import styles from './index.module.css';


// const Register = (props) => {
//     const [userEmail,setUserEmail] = useState('')
//     const [loading, setLoading] = useState(true);


    
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     // email: '',
//     institution: '',
//     specialty: ''
//   });

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//         if (user) {
//             const email = user.email;

//             const q = query(collection(db, 'users'), where('email', '==', email));
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 const userData = querySnapshot.docs[0].data();
//                 navigate('/');
//             } else {
//                 // navigate('/');
//                 setUserEmail(user.email)
                  
//             }
//         } else {
//             // Handle case where user is not logged in
//             navigate('/login');
//         }
//               setLoading(false);


//     });

//     return unsubscribe;
// }, []);


//     const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.firstName || !formData.lastName  || !formData.institution ) {
//     alert('Please fill out all fields.');
//     return;
//   }
//   // Check if Specialty is not set to "Select Specialty"
//   if (formData.specialty === "") {
//     alert('Please select a specialty.');
//     return;
//   }

//   try {
     
//     const userData = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: auth.currentUser?.email,
//       institution: formData.institution,
//       specialty: formData.specialty
//     };

//     // Add user data to Firestore collection
//     const docRef = await addDoc(collection(db, 'users'), userData);
//     navigate('/')

//   } catch (error) {
//     console.error(error);
//     alert(error.message)
//   }
// };

//     if (loading) {
//         return  (
//       <div className={styles['loading-overlay']}>
//         <div className={styles['loading-spinner']}></div>
//         <div className={styles['loading-text']}>Loading...</div>
//       </div>
//     );
//     }
    

//     return (
//       <div className={styles.container}>
//      <form onSubmit={handleSubmit} className={styles.formContainer}>
//       <h1 style={{textAlign:"center"}}>Registration Form</h1>
//       <label className={styles.label}>
//         First Name:
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           className={styles.inputField}
//           placeholder="Enter your first name..."

//         />
//       </label>
//       <label className={styles.label}>
//         Last Name:
//         <input
//           type="text"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           className={styles.inputField}
//           placeholder="Enter your last name..."
//         />
//       </label>
//       <label className={styles.label}>
//         Email Address:
//         <input
//           type="text"
//           name="email"
//           value={auth.currentUser?.email || ""}
//           disabled
//           // onChange={handleInputChange}
//           className={styles.inputField}
//           placeholder="Enter your email..."

//         />
//       </label>
//       <label className={styles.label}>
//         Institution:
//         <input
//           type="text"
//           name="institution"
//           value={formData.institution}
//           onChange={handleInputChange}
//           className={styles.inputField}
//           placeholder="Enter your institution name..."

//         />
//       </label>
//       <label className={styles.label}>
//         Specialty:
//         <select
//           name="specialty"
//           value={formData.specialty}
//           onChange={handleInputChange}
//           className={styles.selectField}

//         >
//           <option value="">Select Specialty</option>
//           <option value="Anesthesiology">Anesthesiology</option>
//           <option value="Dermatology">Dermatology</option>
//           <option value="Emergency Medicine">Emergency Medicine</option>
//           <option value="Family Medicine">Family Medicine</option>
//           <option value="Internal Medicine">Internal Medicine</option>
//           <option value="Medical Genetics">Medical Genetics</option>
//           <option value="Neurology">Neurology</option>
//           <option value="Neurosurgery">Neurosurgery</option>
//           <option value="Nuclear Medicine">Nuclear Medicine</option>
//           <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
//           <option value="Ophalmology">Ophalmology</option>
//           <option value="Orthapedic Surgery">Orthapedic Surgery</option>
//           <option value="Otolaryngology">Otolaryngology</option>
//           <option value="Pediatrics">Pediatrics</option>
//           <option value="Physical Medicine and Rehabilitation">Physical Medicine and Rehabilitation</option>
//           <option value="Plastic Surgery">Plastic Surgery</option>
//           <option value="Preventative Medicine">Preventative Medicine</option>
//           <option value="Psychiatry">Psychiatry</option>
//           <option value="Radiology">Radiology</option>
//           <option value="Surgery">Surgery</option>
//           <option value="Thoracic Surgery">Thoracic Surgery</option>
//           <option value="Urology">Urology</option>
//           <option value="Vascular Surgery">Vascular Surgery</option>
//         </select>
//       </label>
//       <input type="submit" value="Submit" className={styles.submitButton} />

//     </form>
//     </div>


//     );
// }

// export default Register
 

 

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
    const [userEmail, setUserEmail] = useState('')
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        institution: '',
        specialty: ''
    });

    useEffect(() => {
        // Simulating auth state check for demo
        const simulateAuthCheck = async () => {
            // Your Firebase auth logic would go here
            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const email = user.email;
                    const q = query(collection(db, 'users'), where('email', '==', email));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        navigate('/');
                    } else {
                        setUserEmail(user.email)
                    }
                } else {
                    navigate('/login');
                }
                setLoading(false);
            });
            return unsubscribe;
            

        };

        simulateAuthCheck();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.firstName || !formData.lastName || !formData.institution) {
            alert('Please fill out all fields.');
            setIsSubmitting(false);
            return;
        }
        
        if (formData.specialty === "") {
            alert('Please select a specialty.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Your Firebase logic would go here
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: auth.currentUser?.email,
                institution: formData.institution,
                specialty: formData.specialty
            };
            const docRef = await addDoc(collection(db, 'users'), userData);
            navigate('/')


        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
                    <p className="text-gray-600">Please provide your details to set up your Research Rank account</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

                    <form onSubmit={handleSubmit}  className="space-y-6">
                        {/* Name Fields Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your first name..."
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your last name..."
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userEmail || ""}
                                    disabled
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Your email is automatically set from your account</p>
                        </div>

                        {/* Institution Field */}
                        <div>
                            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                                Institution
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="institution"
                                    name="institution"
                                    value={formData.institution}
                                    onChange={handleInputChange}
                                    placeholder="Enter your institution name..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Specialty Field */}
                        <div>
                            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                                Specialty
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <select
                                  id="specialty"
                                  name="specialty"
                                  value={formData.specialty}
                                  onChange={handleInputChange}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleSubmit(e);
                                    }
                                  }}
                                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                                            focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                                  disabled={isSubmitting}
                                >
                                                                
                                    <option value="">Select Specialty</option>
                                    <option value="Anesthesiology">Anesthesiology</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="Emergency Medicine">Emergency Medicine</option>
                                    <option value="Family Medicine">Family Medicine</option>
                                    <option value="Internal Medicine">Internal Medicine</option>
                                    <option value="Medical Genetics">Medical Genetics</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Neurosurgery">Neurosurgery</option>
                                    <option value="Nuclear Medicine">Nuclear Medicine</option>
                                    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                                    <option value="Ophthalmology">Ophthalmology</option>
                                    <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                                    <option value="Otolaryngology">Otolaryngology</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Physical Medicine and Rehabilitation">Physical Medicine and Rehabilitation</option>
                                    <option value="Plastic Surgery">Plastic Surgery</option>
                                    <option value="Preventative Medicine">Preventative Medicine</option>
                                    <option value="Psychiatry">Psychiatry</option>
                                    <option value="Radiology">Radiology</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Thoracic Surgery">Thoracic Surgery</option>
                                    <option value="Urology">Urology</option>
                                    <option value="Vascular Surgery">Vascular Surgery</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"   
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Completing Registration...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Submit
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Having trouble? Contact support at support@researchrank.com</p>
                </div>
            </div>
        </div>
    );
}

export default Register