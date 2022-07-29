import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUsername } from '../redux/Examplereducer';
import '../index.css';
const ReduxToolkit = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.example.value);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  return (
    <>
      <div className='add-user'>
        <h1>Redux toolkit example</h1>
        <h3>Add new user</h3>
        <div>
          <input
            type='text'
            placeholder='Name...'
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
          <input
            type='text'
            placeholder='Username...'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <button
            onClick={() => {
              dispatch(
                addUser({
                  id: userList[userList.length - 1].id + 1,
                  name,
                  username,
                })
              );
            }}
          >
            Add User
          </button>
        </div>
      </div>
      <div className='wrapper-user'>
        {userList.map((user, index) => {
          return (
            <div className='user-item' key={index}>
              <div className='user-name'>
                <h3 style={{ marginRight: '10px' }}>{user.name}</h3>
                <h3>{user.username}</h3>
              </div>
              <div className='user-process'>
                <input
                  type='text'
                  placeholder='New Username...'
                  onChange={(event) => {
                    setNewUsername(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    dispatch(
                      updateUsername({ id: user.id, username: newUsername })
                    );
                  }}
                >
                  Update Username
                </button>
                <button
                  className='delete-user'
                  onClick={() => {
                    dispatch(deleteUser({ id: user.id }));
                  }}
                >
                  Delete User
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReduxToolkit;
