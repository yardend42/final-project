//rout-not-found, user-not-logged, vidio-not-found
export class ClientError {
  //errorCode
  public status: number;
  //errormessege
  public messege: string;
  public constructor(status: number, messege: string) {
    this.status = status;
    this.messege = messege;
  }
}

export class RouteNotFound extends ClientError {
  constructor(route: string) {
    super(404, `route ${route} was not found`);
  }
}

export class UserNotLogged extends ClientError {
  constructor() {
    super(401, "user not authorized please log in");
  }
}
export class videoNotFound extends ClientError {
  constructor() {
    super(404, `video id was not found`);
  }
}
