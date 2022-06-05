import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import InputOption from "../InputOption/InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "../Post/Post";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");

  const [posts, setPosts] = useState([]);
  // useEffect() -> controls the component lifecycle
  // If we leave the second parameter empty it'll only execute once even if the component re-rendered.
  useEffect(() => {
    // onSnapShot() -> a real-time listener for our firestore database
    // Get Data from Firebase Firestore
    // onSnapshot(collectionRef, payload);
    // unsub -> to unsubscribe to this socket whenever the component unMounts
    // query() --> just to order our data we get from the firestore database
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsub;
    // db.collection("posts").onSnapShot((snapshot) => (
    //   setPosts(snapshot.docs.map(doc => (
    //     {
    //       id: doc.id,
    //       data: doc.data()
    //     }
    //   )))
    // ))
  }, []);

  // e -> event
  // serverTimestamp() -> we're using the server timestamp cuz every country has different time so that's why to make it the same for everyone
  const sendPost = (e) => {
    e.preventDefault(); // prevent default behaviour from refreshing the page
    // setDoc(docRef, payload) for modyfing existing document in firestore <<
    // Push Data To Firebase Firestore
    addDoc(collection(db, "posts"), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp(),
    });

    setInput("");
    // db.collection("posts").add({
    //   name: 'Basil Tarek',
    //   description: 'This is a test',
    //   message: input,
    //   photoUrl: '',
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // });
  };

  // const handleInputChange = (event) => {
  //   setInput(event.target.value);
  // }

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start a post"
            />
            {/* <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Start a post" /> */}
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* Posts */}
      {/* key is very important whenever dealing with lists in react to not 
        re-render the whole elements we must give it unique key to only render the newly added element in that array */}
      {/* FlipMove is the animation when the post is rendered */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
