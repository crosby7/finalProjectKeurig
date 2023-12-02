import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { changeRoute } from "../dist/services/services.js";

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
        $(".loginToggle").addClass("activeToggle");
        $(".signUpToggle").removeClass("activeToggle");
        $("#firstName").addClass("hide");
        $("#lastName").addClass("hide");
        $(".submitButton").html("SIGN IN");
    })
    $(".signUpToggle").on("click", function () {
        logInOrSignUp = "signUp";
        $(".signUpToggle").addClass("activeToggle");
        $(".loginToggle").removeClass("activeToggle");
        $("#firstName").removeClass("hide");
        $("#lastName").removeClass("hide");
        $(".submitButton").html("CREATE AN ACCOUNT");
    })
    $(".accountButton").on("click", function () {
        initLoginListeners();
    })
    $(".closeModal").on("click", function () {
        initLoginListeners();
    });

    $(".submitButton").on("click", function () {
        accountHandler();
    })
    window.addEventListener("hashchange", changeRoute);
}

function initLoginListeners() {
    if ($(".loginModal").hasClass("hide")) {
        $(".accountButton").on("click", openModal);
        $(".closeModal").off("click", ".closeModal", openModal);
    }
    else {
        $(".closeModal").on("click", openModal);
        $(".accountButton").off("click", ".accountButton", openModal);
    }
}

function openModal() {
    $(".loginModal").toggleClass("hide");
}

export function accountHandler() {

    // inputs
    let emailAddress = $("#email").val();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let password = $("#password").val();

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
        signInWithEmailAndPassword(auth, emailAddress, password)
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
    initLoginListeners();
    changeRoute();
});