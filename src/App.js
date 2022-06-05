import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import "./App.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Widgets from "./Widgets/Widgets";
import Login from "./Login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  // useSelector() -> redux hook to access store's state
  // user is the state that we're working with (with login and register)
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    // The recommended way to get the current user is by setting an observer on the Auth object
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is logged in
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {/* Header / Navbar */}
      <Header />

      {!user ? (
        <Login />
      ) : (
        // {/* App Body */}
        <div className="app__body">
          {/* Sidebar */}
          <Sidebar />

          {/* Feed */}
          <Feed />

          {/* Widgets */}
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
