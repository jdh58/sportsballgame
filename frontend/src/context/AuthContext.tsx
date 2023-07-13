import { Dispatch, createContext, useReducer } from 'react';

type Auth = {
  user: {
    email: string;
    username: string;
    _id: string;
    token: string;
  } | null;
  dispatch: Dispatch<ReactAction>;
};

/* The two TS expect errors here are because TS doesn't understand the value
is initialized later no matter what */

// @ts-expect-error
export const AuthContext = createContext<Auth>();

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

  console.log(`Auth Context: ${state}`);

  // The context's value will always be in sync with the reducer
  return (
    // @ts-expect-error
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
