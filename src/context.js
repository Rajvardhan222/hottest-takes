import { bindActionCreators } from '@reduxjs/toolkit';
import { createContext, useMemo, useReducer } from 'react';
import { postActions, postsReducer } from './features/posts';
import { userActions, usersReducer } from './features/users';

import postData from './api/posts.json';
import userData from './api/users.json';
import User from './components/user';

export const StateContext = createContext({});
export const ActionsContext = createContext({});
export const useUserContext =createContext({});

export const Provider = ({ children }) => {
  const [posts, postDispatch] = useReducer(postsReducer, postData);
  const [users, userDispatch] = useReducer(usersReducer, userData);

  const actions = useMemo(
    () => ({
      ...bindActionCreators(postActions, postDispatch),
      ...bindActionCreators(userActions, userDispatch),
    }),
    [postDispatch, userDispatch],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={ posts}>
        <useUserContext.Provider value={users}>
        {children}
        </useUserContext.Provider>
      </StateContext.Provider>
    </ActionsContext.Provider>
  );
};
