export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface PersonalInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  bvn: number;
  gender: string;
  maritalStatus: string;
  children: number;
  typeOfResidence: string;
}

export interface EducationAndEmployment {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string[];
  loanRepayment: string;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface UserProfile {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;

  tier: number;
  balance: number;
  accountNumber: number;
  bankName: string;

  personalInfo: PersonalInfo;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantor: Guarantor[];
}