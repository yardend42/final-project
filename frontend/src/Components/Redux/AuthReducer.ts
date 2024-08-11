//1 - class => state
export class AuthState {
  email: string = "";
  jwt: string = "";
  name: string = "guest";
  role: string = "";
  isLoggedIn: boolean = false; // Add a flag to check if the user is logged in
}

//2 - enum => commands
export enum AuthActionType {
  login = "login",
  logout = "logout",
  updateToken = "updateToken",
}

//3 - interface => data type send and return
export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

//4 - method/function
export function loginAction(user: any): AuthAction {
  return { type: AuthActionType.login, payload: user };
}

export function logoutAction(): AuthAction {
  return { type: AuthActionType.logout };
}

export function updateTokenAction(token: string): AuthAction {
  return { type: AuthActionType.updateToken, payload: token };
}



//5 - reducer -> unique signature
export function AuthReducer(
  currentState: AuthState = new AuthState(),
  action: AuthAction
): AuthState {
  let newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.login:
      newState = { ...action.payload, isLoggedIn: true }; 
      break;
    case AuthActionType.logout:
      newState = new AuthState();
      break;
    case AuthActionType.updateToken:
      newState.jwt = action.payload;
      break;
 
  }

  return newState;
}
