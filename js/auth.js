// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBVtNhUK85kGFbbhEUKGGJRKdzlw7EIYfo",
  authDomain: "aiagentsnovaforge.firebaseapp.com",
  projectId: "aiagentsnovaforge",
  appId: "1:509850862618:web:833955f9d4233010dafda3"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// UI
let isLogin = true;
const form = document.getElementById("auth-form");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("auth-message");

// Toggle Login / Signup
toggleLink.onclick = () => {
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "Login" : "Signup";
  submitBtn.innerText = isLogin ? "Login" : "Signup";
  toggleLink.innerText = isLogin ? "Signup" : "Login";
  message.innerText = "";
};

// Handle Form Submit
form.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    if (isLogin) {
      await auth.signInWithEmailAndPassword(email, pass);
    } else {
      await auth.createUserWithEmailAndPassword(email, pass);
    }
  } catch (error) {
    message.innerText = error.message;
  }
};

// Google Auth
document.getElementById("google-login").onclick = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    message.innerText = error.message;
  }
};

// Guest Auth
document.getElementById("guest-login").onclick = async () => {
  try {
    await auth.signInAnonymously();
  } catch (error) {
    message.innerText = error.message;
  }
};

// Forgot Password
document.getElementById("forgot-link").onclick = async () => {
  const email = document.getElementById("email").value;
  if (!email) return (message.innerText = "Enter email first.");
  try {
    await auth.sendPasswordResetEmail(email);
    message.innerText = "Reset link sent!";
  } catch (error) {
    message.innerText = error.message;
  }
};

// redirect after auth
auth.onAuthStateChanged(user => {
  if (user) window.location.href = "index.html";
});
