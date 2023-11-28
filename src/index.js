import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

var logInOrSignUp = "login";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBzZQsPdoefcWyPm4MKHPTEBeTnxmsRslI",
    authDomain: "n315-cc.firebaseapp.com",
    projectId: "n315-cc",
    storageBucket: "n315-cc.appspot.com",
    messagingSenderId: "124018914014",
    appId: "1:124018914014:web:df6f512caa8a82d124484f",
    measurementId: "G-XEWMTQLJXY"
});

const auth = getAuth(firebaseApp);

// detect auth state

onAuthStateChanged(auth, (user) => {
    if (user != null) 
    {
        console.log("user logged in");
        console.log("authstate: ", user);
    } 
    else 
    {
        console.log("no user");
    }
});

function initListeners() {
    $(".loginToggle").on("click", function () {
        logInOrSignUp = "logIn";
    })
    $(".signUpToggle").on("click", function () {
        logInOrSignUp = "signUp";
    })
    window.addEventListener("hashchange", changeRoute);
}

export function accountHandler() {

    // Sign up inputs
    let emailAddress = $("#emailSU").val();
    let firstName = $("#firstNameSU").val();
    let lastName = $("#lastNameSU").val();
    let password = $("#passwordSU").val();

    // Login Inputs
    let loginEmail = $("#loginEmail").val();
    let loginPassword = $("#loginPassword").val();

    if (logInOrSignUp === 'signUp')
    {
        createUserWithEmailAndPassword(auth, emailAddress, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
            displayName: firstName
        }).catch((error) => {
            console.log(error);
        })

        console.log("sign up username: " + user.displayName);

        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
        });
    }
    else if (logInOrSignUp === 'login')
    {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    }
}

$(document).ready(function () {
    initListeners();
    changeRoute();
});