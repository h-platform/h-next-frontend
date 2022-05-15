
export class User {
    id: number;
    username: string;
    userImage: string;
    mobileNumber: string;
    isMobileNumberVerified: boolean;
    mobileVerifiedDate: Date;
    email: string;
    isEmailVerified: boolean;
    emailVerifiedDate: Date;
    displayName: string;
    legalName: string;
    isActive: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    addressCountry: string;
    addressRegion: string;
    addressCity: string;
    addressLine: string;
    roles: string[];
    grants: Array<Record<string, string[]>>;
    attributes: any;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}
