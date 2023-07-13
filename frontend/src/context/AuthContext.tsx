import { createContext, useReducer } from 'react';

export const AuthContext = createContext({});

type ReactAction = {
  type: string;
  user: object | null;
};

function AuthReducer(state: object, action: ReactAction) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user };
    case 'LOGOUT':
      return { user: null };
    default:
      return { ...state };
  }
}

/* This is a wrapper for our context provider that will give a reducer that 
allows us to change the authentication state anywhere in our program. */
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  // The context's value will always be in sync with the reducer
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
