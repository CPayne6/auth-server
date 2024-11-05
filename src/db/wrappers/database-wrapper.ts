import * as DB from './database.types'

interface DatabaseWrapperArgs {
  connectionString: string;
}

export abstract class DatabaseWrapper {
  protected connectionString: string;
  
  constructor(args: DatabaseWrapperArgs) {
    this.connectionString = args.connectionString
  }

  public abstract findUser(email: string): Promise<DB.User>;

  public abstract createLocalUser(user: Omit<DB.User, 'id' | 'uuid'>, password: string): Promise<boolean>;
  public abstract createGoogleUser(user: Omit<DB.User, 'id' | 'uuid'>, accessToken: string, refreshToken: string): Promise<boolean>;

  public abstract logoutUser(user: )

  public abstract changePassword(user_id: number, oldPassword: string, newPassword: string): Promise<boolean>

  public abstract updateUser(user: Omit<DB.User, 'id' | 'uuid'>): Promise<boolean>
  public abstract deleteUser(user: Omit<DB.User, 'id' | 'uuid'>): Promise<boolean>
}
