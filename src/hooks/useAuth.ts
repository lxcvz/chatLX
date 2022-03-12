import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { activeUser } from "../redux/slice/authSlice";
import { auth } from "../services/firebase";

const dispatch = useDispatch();

useEffect(() => { 
  const unsubscribe =  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(activeUser({
        userName: user.displayName,
        userEmail: user.email,
        userUid: user.uid
    }))
    }
  })

  return () => {
    unsubscribe()
  }
}, [])