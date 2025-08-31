import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const Protected = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user.email))
          const querySnapshot = await getDocs(q)
          
          if (!querySnapshot.empty) {
            setIsAuthenticated(true)
            setHasProfile(true)
          } else {
            // User is authenticated but no profile - redirect to registration
            setIsAuthenticated(true)
            setHasProfile(false)
          }
        } catch (error) {
          console.error('Error checking user profile:', error)
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/app/login" />
  }

  if (!hasProfile) {
    return <Navigate to="/app/register" />
  }

  return <Outlet />
}

export default Protected