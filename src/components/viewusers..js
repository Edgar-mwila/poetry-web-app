import { useEffect, useState } from 'react';
import './App.css';
import {db} from '.firebase.config';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';

function userPage() {
  
  const [ newName, setNewName] = useState("");
  const [ newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "usernames");
  

  const updateAge = async (id, age) => {
    const userDoc = doc(db, "usernames", id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
   const userDoc = doc(db, "usernames", id);
   await deleteDoc(userDoc); 
  }
  const createUser = async () => {
      await addDoc(usersRef, {name: newName, age: Number(newAge)});
  };
   
  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(usersRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    };
    getUsers();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
     
     <input placeholder='name' onChange={(event) => {setNewName(event.target.value)}}/>
     <input placeholder='Age' onChange={(event) => {setNewAge(event.target.value)}}/>
      <button onClick={createUser}> Create User </button>
     {users.map((user) => {
      return (
        <div>
          
          {""}
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>
          <button onClick={() => {updateAge(user.id, user.age)}}>increase Age</button>
          <button onClick={() => {deleteUser(user.id)}}>Delete user</button>
        </div>
      )
     })}
    </div>
  );
}

export default userPage;