interface FirebaseUser extends BasicInfo {
    email: string;
}

interface BasicInfo {
    firstName: string;
    lastName: string;
}

type IdToken = string;