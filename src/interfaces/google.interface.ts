export interface GoogleUser {
  profile: GoogleProfile;
  token: string;
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  name: Name;
  emails: EmailsEntity[];
  photos: PhotosEntity[];
  provider: string;
}

export interface Name {
  familyName: string;
  givenName: string;
}

export interface EmailsEntity {
  value: string;
  verified: boolean;
}

export interface PhotosEntity {
  value: string;
}
