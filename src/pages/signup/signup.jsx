// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import {auth} from '../../firebase'
// // import {createUserWithEmailAndPassword} from 'firebase/auth'
// // import styles from './index.module.css';


// // const SignUp = (props) => {
// //     const [email, setEmail] = useState("")
// //     const [password, setPassword] = useState("")
// //     const [password1, setPassword1] = useState("")
// //     const [emailError, setEmailError] = useState("")
// //     const [passwordError, setPasswordError] = useState("")
    
// //     const navigate = useNavigate();

    
// // const onButtonClick = async (e) => {

// //         setEmailError("")
// //         setPasswordError("")

// //         // Check if the user has entered both fields correctly
// //         if ("" === email) {
// //             setEmailError("Please enter your email")
// //             return
// //         }

// //         if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
// //             setEmailError("Please enter a valid email")
// //             return
// //         }

// //         if ("" === password) {
// //             setPasswordError("Please enter a password")
// //             return
// //         }

// //         if (password.length < 6) {
// //             setPasswordError("The password must be 6 characters or longer")
// //             return
// //         }

// //         if(password!==password1){
// //             setPasswordError("The passwords doesnot match!")
// //             return

// //         }

// //         try {
// //             const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
// //             const user = userCredentials.user;
// //             localStorage.setItem('token',user.accessToken)
// //             localStorage.setItem('user',JSON.stringify(user));
// //             navigate('/')
            
// //         } catch (error) {
// //             console.error(error)
// //             setEmailError(error.message)
// //         }      

// // }

// //     return <div className={styles.mainContainer}>
// //         <div className={styles.titleContainer}>
// //             <div>SignUp</div>
// //         </div>
// //         <br />
// //         <div className={styles.inputContainer}>
// //             <input
// //                 value={email}
// //                 placeholder="Enter your email here"
// //                 onChange={ev => setEmail(ev.target.value)}
// //                 className={styles.inputBox} />
// //             <label className={styles.errorLabel}>{emailError}</label>
// //         </div>
// //         <br />
// //         <div className={styles.inputContainer}>
// //             <input
// //                 value={password}
// //                 placeholder="Enter your password"
// //                 type="password"
// //                 onChange={ev => setPassword(ev.target.value)}
// //                 className={styles.inputBox} />
// //             <label className={styles.errorLabel}>{passwordError}</label>
// //         </div>
// //         <br />
// //         <div className={styles.inputContainer}>
// //             <input
// //                 value={password1}
// //                 placeholder="Re-enter your password"
// //                 type="password"
// //                 onChange={ev => setPassword1(ev.target.value)}
// //                 className={styles.inputBox} />
// //             {/* <label className={styles.errorLabel}>{passwordError}</label> */}
// //         </div>
// //         <br />
// //         <div className={styles.inputContainer}>
// //             <input
// //                 className={styles.inputButton}
// //                 type="button" 
// //                 onClick={onButtonClick}
// //                 value={"Sign Up"} />
// //         </div>
// //         <div className={styles.loginOrSignUp}>Need to <Link to='/login'>Login?</Link></div>
// //     </div>
// // }

// // export default SignUp


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {auth} from '../../firebase'
// import {createUserWithEmailAndPassword} from 'firebase/auth'

// const SignUp = (props) => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [password1, setPassword1] = useState("")
//     const [emailError, setEmailError] = useState("")
//     const [passwordError, setPasswordError] = useState("")
//     const [isLoading, setIsLoading] = useState(false)

//     const navigate = useNavigate();

//     const onButtonClick = async (e) => {
//         setEmailError("")
//         setPasswordError("")
//         setIsLoading(true)

//         // Check if the user has entered both fields correctly
//         if ("" === email) {
//             setEmailError("Please enter your email")
//             setIsLoading(false)
//             return
//         }

//         if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//             setEmailError("Please enter a valid email")
//             setIsLoading(false)
//             return
//         }

//         if ("" === password) {
//             setPasswordError("Please enter a password")
//             setIsLoading(false)
//             return
//         }

//         if (password.length < 6) {
//             setPasswordError("The password must be 6 characters or longer")
//             setIsLoading(false)
//             return
//         }

//         if(password !== password1){
//             setPasswordError("The passwords do not match!")
//             setIsLoading(false)
//             return
//         }

//         try {
//             // Your Firebase auth logic would go here
//             const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
//             const user = userCredentials.user;
//             localStorage.setItem('token', user.accessToken)
//             localStorage.setItem('user', JSON.stringify(user));
//             navigate('/')
            
//             console.log("Account created successfully!")
//         } catch (error) {
//             console.error(error)
//             setEmailError(error.message)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
//             <div className="w-full max-w-md">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
//                         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                         </svg>
//                     </div>
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Rank</h1>
//                     <p className="text-gray-600">Create your professor account</p>
//                 </div>

//                 {/* Sign Up Form */}
//                 <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//                     <div className="space-y-6">
//                         {/* Email Field */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Email Address
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 value={email}
//                                 placeholder="Enter your email address"
//                                 onChange={ev => setEmail(ev.target.value)}
//                                 className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
//                                     emailError 
//                                         ? 'border-red-300 bg-red-50' 
//                                         : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500'
//                                 }`}
//                                 disabled={isLoading}
//                             />
//                             {emailError && (
//                                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                     </svg>
//                                     {emailError}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Password Field */}
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Password
//                             </label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 value={password}
//                                 placeholder="Enter your password"
//                                 onChange={ev => setPassword(ev.target.value)}
//                                 className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
//                                     passwordError 
//                                         ? 'border-red-300 bg-red-50' 
//                                         : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500'
//                                 }`}
//                                 disabled={isLoading}
//                             />
//                             {passwordError && (
//                                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                     </svg>
//                                     {passwordError}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Confirm Password Field */}
//                         <div>
//                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 id="confirmPassword"
//                                 type="password"
//                                 value={password1}
//                                 placeholder="Re-enter your password"
//                                 onChange={ev => setPassword1(ev.target.value)}
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
//                                 disabled={isLoading}
//                             />
//                         </div>

//                         {/* Sign Up Button */}
//                         <button
//                             onClick={onButtonClick}
//                             disabled={isLoading}
//                             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center"
//                         >
//                             {isLoading ? (
//                                 <>
//                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                     </svg>
//                                     Creating Account...
//                                 </>
//                             ) : (
//                                 'Create Account'
//                             )}
//                         </button>
//                     </div>

//                     {/* Login Link */}
//                     <div className="mt-6 text-center">
//                         <p className="text-gray-600">
//                             Already have an account?{' '}
//                             <Link 
//                                 to="/login" 
//                                 className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 cursor-pointer"
//                             >
//                                 Sign In
//                             </Link>
//                         </p>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="mt-8 text-center text-sm text-gray-500">
//                     <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SignUp

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from '../../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

const SignUp = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            e.preventDefault();
            onButtonClick(e);
        }
    };

    const onButtonClick = async (e) => {
        setEmailError("")
        setPasswordError("")
        setIsLoading(true)

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            setIsLoading(false)
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            setIsLoading(false)
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            setIsLoading(false)
            return
        }

        if (password.length < 6) {
            setPasswordError("The password must be 6 characters or longer")
            setIsLoading(false)
            return
        }

        if(password !== password1){
            setPasswordError("The passwords do not match!")
            setIsLoading(false)
            return
        }

        try {
            // Your Firebase auth logic would go here
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user;
            localStorage.setItem('token', user.accessToken)
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/')
            
            console.log("Account created successfully!")
        } catch (error) {
            console.error(error)
            setEmailError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Rank</h1>
                    <p className="text-gray-600">Create your professor account</p>
                </div>

                {/* Sign Up Form */}
                <form onSubmit={(e) => { e.preventDefault(); onButtonClick(e); }} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="space-y-6">
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
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder="Enter your email address"
                                    onChange={ev => setEmail(ev.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                        emailError 
                                            ? 'border-red-300 bg-red-50' 
                                            : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500'
                                    }`}
                                    disabled={isLoading}
                                />
                            </div>
                            {emailError && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {emailError}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={ev => setPassword(ev.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                        passwordError 
                                            ? 'border-red-300 bg-red-50' 
                                            : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500'
                                    }`}
                                    disabled={isLoading}
                                />
                            </div>
                            {passwordError && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={password1}
                                    placeholder="Re-enter your password"
                                    onChange={ev => setPassword1(ev.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Create Account
                                </>
                            )}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 cursor-pointer"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}

export default SignUp