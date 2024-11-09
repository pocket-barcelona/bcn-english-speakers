export interface UserSession {
  /** Newly registered users are 0 (unconfirmed). After clicking email link, become confirmed */
  emailConfirmed: UserEmailConfirmedEnum;
  /** Like: "2024-10-02T12:45:05.106Z" */
  createdAt: string;
  /** Like: "2024-10-02T12:45:05.106Z" */
  signupDate: string;
  email: string;
  /** Like: "2024-10-02T12:45:05.106Z" */
  lastLogin: string;
  isVerified: boolean;
  /** Like: "EMAIL" */
  authMethod: string;
  lastname: string;
  credit: number;
  role: number;
  userId: string;
  /** Like "2024-10-02T12:45:05.106Z" */
  updatedAt: string;
  firstname: string;
  userStatus: number;
  /** Like: 1731105550548 */
  iat: number;
  /** Like: 1731321550548 */
  exp: number;
  session: {
    userAgent: string;
    user: string;
    valid: boolean;
  };

  // /** User's email - UNIQUE / PRIMARY KEY */
  // email: string;
  // /** An auto-generated uuid for the user */
  // userId: string;
  // /** The user's role */
  // role: UserRoleEnum;
  // /** User active status */
  // userStatus: UserStatusEnum;
  // /** What they used to auth/login with */
  // authMethod: "FB" | "IG" | "GOOGLE" | "EMAIL";
  // /** The external auth token of their auth session */
  // authToken: string;
  // /** UTC of when user signed up */
  // signupDate: Date;
  // /** UTC of user's last logged-in time */
  // lastLogin: Date;
  // /** If the user is a verified user (requires an admin to set) */
  // isVerified?: boolean;
  // /** Allows users to have credit to spend on going to paid events */
  // credit: number;
  // /** Number of RSVPs that the user has done up to now */
  // completedRSVPs: number;
  // /** User's firstname */
  // firstname: string;
  // /** User's lastname */
  // lastname: string;
  // /** Telegram username, without the @ */
  // telegram?: string;
  // /** User's nickname */
  // nickname?: string;
  // /** User phone number - will also work on WhatsApp */
  // mobile: string;
  // /** User's identity document */
  // identity?: {
  //   /** User's DNI or NIE/TIE or Passport number */
  //   documentNumber: string;
  //   /** The type of document for the document number. "DNI" | "TIE" | "PASSPORT" | "OTHER" */
  //   documentType: string;
  // };
  // /** Profile info about the user - will be HTML */
  // about: string;
  // /** User's current location city in Spain. Ex: Barcelona */
  // currentLocation: string;
  // /** ID of the neighbourhood */
  // barrioId: number;
  // /** UTC of the time that the user arrived in BCN */
  // arrivedInBarcelona: string;
  // /** User's profile pic */
  // profilePhoto: GenericMediaItem[];
  // /** List of tag-like interests that the user has, like hiking, photography, cycling, food etc */
  // interests: string[];
  // /** List of Group IDs that the user is following */
  // followingGroupIds: string[];

  // /** Where the signup came from - for marketing campaigns */
  // utmSource: string;
  // utmMedium: string;
  // utmCampaign: string;
  // avatarColor: string;
}
export enum UserEmailConfirmedEnum {
  Unconfirmed = 0,
  Confirmed = 1,
}
export enum UserStatusEnum {
  Active = 1,
  ReadOnly = 2,
  Disabled = 3,
  Banned = 4,
  Deleted = 5,
}
export enum UserRoleEnum {
  Admin = 1, // super admin of the system
  Owner = 2, // admin of e.g a meetup group
  User = 3, // normal user
  Guest = 4, // guest
  Demo = 5, // not implement yet
}
