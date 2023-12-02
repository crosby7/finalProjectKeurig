import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { changeRoute, getData, updateCartCounter } from "../dist/services/services.js";

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
        if (auth.currentUser)
        {
            $(".loggedInModal").toggleClass("hide");
        }
        else
        {
            $(".loginModal").toggleClass("hide");
        }
    })
    $(".closeModal").on("click", function () {
        $(".loginModal").addClass("hide");
        $(".loggedInModal").addClass("hide");
    });

    $(".submitButton").on("click", function () {
        console.log("clicked");
        accountHandler();
    })

    $(".cartButton").on("click", function () {
        window.location.hash = "cart";
    })

    $(".exitBanner").on("click", function () {
        $(".bannerAd").addClass("hide");
    })

    $(".logoutButton").on("click", function () {
        auth.signOut();
        $(".loginModal").addClass("hide");
        $(".loggedInModal").addClass("hide");
    })

    window.addEventListener("hashchange", changeRoute);
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
        $(".loggedInModal h1").html(`Hello, ${user.displayName}`);
        $(".loggedInModal").removeClass("hide");
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
            console.log("log in username: " + user.displayName);
            $(".loggedInModal h1").html(`Hello, ${user.displayName}`);
            $(".loggedInModal").removeClass("hide");
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
    getData();
    changeRoute();
    updateCartCounter();
});