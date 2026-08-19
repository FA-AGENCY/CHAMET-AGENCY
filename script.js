function showLogin() {
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("registerSection").classList.add("hidden");
    document.getElementById("forgotSection").classList.add("hidden");
}

function showRegister() {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("registerSection").classList.remove("hidden");
    document.getElementById("forgotSection").classList.add("hidden");
}

function showForgotPassword() {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("registerSection").classList.add("hidden");
    document.getElementById("forgotSection").classList.remove("hidden");
}

/* Unified account keys used by dashboard / profile / other pages */
function saveSession(user) {
    // Keys used by script.js login flow
    localStorage.setItem("rayhanLoggedInUser", JSON.stringify(user));

    // Keys expected by dashboard.html, profile.html, etc.
    const account = {
        fullName: user.name || user.fullName || "",
        name: user.name || user.fullName || "",
        mobile: user.mobile || "",
        email: user.email || "",
        password: user.password || ""
    };
    localStorage.setItem("raihanAgencyAccount", JSON.stringify(account));
    sessionStorage.setItem("raihanAgencyLoggedIn", "1");
}

function clearSession() {
    localStorage.removeItem("rayhanLoggedInUser");
    localStorage.removeItem("raihanAgencyAccount");
    sessionStorage.removeItem("raihanAgencyLoggedIn");
}

/* =========================
   REGISTER
========================= */
document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const mobile = document.getElementById("registerMobile").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;

        // Real email validation
        var emailOk = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        if (!emailOk) {
            alert("সঠিক Email Address দিন (যেমন: name@gmail.com)");
            return;
        }
        // Real mobile validation (BD: 11 digits starting 01, or general 10-15)
        var digits = mobile.replace(/\D/g, "");
        var phoneOk = digits.length >= 10 && digits.length <= 15 && !/^(0{5,}|1{5,}|1234567890|0123456789)$/.test(digits);
        if (!phoneOk || /^0{1,}$|^1{5,}$|^1234/.test(digits)) {
            alert("সঠিক Mobile Number দিন (যেমন: 017XXXXXXXX)");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("rayhanUsers") || "[]");

        const alreadyExists = existingUsers.some(
            (user) =>
                (user.email && user.email.toLowerCase() === email.toLowerCase()) ||
                (user.mobile && user.mobile === mobile)
        );

        if (alreadyExists) {
            alert("This email or mobile number is already registered.");
            return;
        }

        const user = {
            id: Date.now(),
            name: name,
            fullName: name,
            mobile: mobile,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        existingUsers.push(user);
        localStorage.setItem("rayhanUsers", JSON.stringify(existingUsers));

        alert("Registration completed successfully. Please login to your account.");
        document.getElementById("registerForm").reset();
        showLogin();
    });

/* =========================
   LOGIN
========================= */
document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const identifier = document.getElementById("loginIdentifier").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("rayhanUsers") || "[]");

        const user = users.find(
            (item) =>
                ((item.email && item.email.toLowerCase() === identifier.toLowerCase()) ||
                    (item.mobile && item.mobile === identifier)) &&
                item.password === password
        );

        if (!user) {
            alert("Invalid email/mobile number or password.");
            return;
        }

        saveSession(user);
        window.location.href = "dashboard.html";
    });

/* =========================
   FORGOT PASSWORD
========================= */
document
    .getElementById("forgotForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const identifier = document.getElementById("forgotIdentifier").value.trim();
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmNewPassword").value;

        if (newPassword !== confirmPassword) {
            alert("New password and confirmation do not match.");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("rayhanUsers") || "[]");

        const index = users.findIndex(
            (user) =>
                (user.email && user.email.toLowerCase() === identifier.toLowerCase()) ||
                (user.mobile && user.mobile === identifier)
        );

        if (index === -1) {
            alert("No account was found with this email or mobile number.");
            return;
        }

        users[index].password = newPassword;
        localStorage.setItem("rayhanUsers", JSON.stringify(users));

        alert("Password changed successfully. Please login.");
        document.getElementById("forgotForm").reset();
        showLogin();
    });

/* URL mode support: auth.html?mode=register | login | forgot */
(function () {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    if (mode === "register") showRegister();
    else if (mode === "forgot") showForgotPassword();
    else showLogin();
})();
