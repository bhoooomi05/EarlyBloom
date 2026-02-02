let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("formTitle").innerText =
    isLogin ? "Login" : "Signup";

  document.getElementById("submitBtn").innerText =
    isLogin ? "Login" : "Create Account";

  document.getElementById("email").style.display =
    isLogin ? "none" : "block";

  document.getElementById("confirmPassword").style.display =
    isLogin ? "none" : "block";

  document.getElementById("formBox")
    .classList.toggle("signup", !isLogin);
}

function handleSubmit() {
  const role = document.getElementById("role").value;

  if (!role) {
    alert("Please select Parent or Therapist.");
    return false;
  }

  if (!isLogin) {
    const p1 = document.getElementById("password").value;
    const p2 = document.getElementById("confirmPassword").value;

    if (p1 !== p2) {
      alert("Passwords do not match.");
      return false;
    }
  }

  alert(`${isLogin ? "Login" : "Signup"} successful as ${role}`);
  return false; // frontend demo
}