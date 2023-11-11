import {db} from './firebase.config';
import { useState, useEffect } from 'react';
import {collection, getDocs, addDoc } from 'firebase/firestore';
//import { useUser } from './context';
import { auth } from './firebase.config';
import { useNavigate } from 'react-router-dom';
import { signOut, updateCurrentUser } from "firebase/auth";


function HomePage() {

    const [newPost, setNewPost] = useState("");
    const [posts, setPosts] = useState([]);
    const postsRef = collection(db, "posts");
    const { user } = updateCurrentUser;
    
    
    const history = useNavigate();

     const createPost = async () => {
    if (user) {
      try {
        await addDoc(postsRef, { postText: newPost, User: { email: user.email } });
        setNewPost(""); // Clear the input field after posting
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    history('/');
  };

    useEffect(() => {
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getPosts();
    // eslint-disable-next-line
  }, [])

  if (!user) {
    return <div>Loading...</div>;
  }

    return (
            <div>
              <h4> User Logged In: </h4>
            {user?.email}
                 <input placeholder='Post' onChange={(event) => {setNewPost(event.target.value)}}/>
      <button onClick={createPost}> Add Post </button>
     {posts.map((posts) => {
      return (
        <div key={posts.id}>
          
          {""}
          <h1>User: {posts.User}</h1>
          <h1>postText: {posts.postText}</h1>
          
        </div>
      )
     })}
     <button onClick={logout}> Sign Out </button>
            </div>
    );
   
}


export default HomePage;