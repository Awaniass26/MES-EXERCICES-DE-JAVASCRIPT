document.addEventListener("DOMContentLoaded", function () {
    // Event listener for the registration form
    const formInscription = document.getElementById("FormInscription");
    if (formInscription) {
        formInscription.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confpassword = document.getElementById("passwordconf").value;

            let isValid = true;

            document.getElementById("usernameError").textContent = '';
            document.getElementById("emailError").textContent = '';
            document.getElementById("nameError").textContent = '';
            document.getElementById("passwordError").textContent = '';

            document.getElementById("usernameError").style.display = 'none';
            document.getElementById("passwordError").style.display = 'none';
            document.getElementById("nameError").style.display = 'none';
            document.getElementById("emailError").style.display = 'none';

            if (!username) {
                document.getElementById("usernameError").textContent = 'Ce champ est obligatoire.';
                document.getElementById("usernameError").style.display = 'block';
                isValid = false;
            }
            if (password !== confpassword) {
                document.getElementById("passwordError").textContent = 'Les mots de passe ne correspondent pas.';
                document.getElementById("passwordError").style.display = 'block';
                isValid = false;
            }
            if (!name) {
                document.getElementById("nameError").textContent = 'Ce champ est obligatoire.';
                document.getElementById("nameError").style.display = 'block';
                isValid = false;
            }
            if (!email) {
                document.getElementById("emailError").textContent = 'Ce champ est obligatoire.';
                document.getElementById("emailError").style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                registerUser(name, username, email, password);
                alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
                window.location.href = "connexion.html";
            }
        });
    }

    // Event listener for the login form
    const formConnexion = document.getElementById("FormConnexion");
    if (formConnexion) {
        formConnexion.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            let isValid = true;

            document.getElementById("usernameError").textContent = '';
            document.getElementById("passwordError").textContent = '';
            document.getElementById("usernameError").style.display = 'none';
            document.getElementById("passwordError").style.display = 'none';

            if (!username) {
                document.getElementById("usernameError").textContent = 'Ce champ est obligatoire.';
                document.getElementById("usernameError").style.display = 'block';
                isValid = false;
            }
            if (!password) {
                document.getElementById("passwordError").textContent = 'Ce champ est obligatoire.';
                document.getElementById("passwordError").style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const user = loginUser(username, password);

                if (user) {
                    alert(`Bienvenue, ${user.name} !`);
                    window.location.href = "page.html";
                } else {
                    alert("Nom d'utilisateur ou mot de passe incorrect !");
                }
            }
        });
    }

    // Event listener for the logout button
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            logoutUser();
        });
    }

    // Event listener for the reset password form
    const resetForm = document.getElementById("resetForm");
    if (resetForm) {
        resetForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const newPassword = document.getElementById("newPassword").value;

            if (document.getElementById("usernameSection").style.display !== "none") {
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const user = users.find(u => u.username === username);

                if (user) {
                    document.getElementById("usernameSection").style.display = "none";
                    document.getElementById("newPasswordSection").style.display = "block";
                } else {
                    alert("Nom d'utilisateur introuvable !");
                }
            } else {
                const success = resetPassword(username, newPassword);

                if (success) {
                    alert("Mot de passe réinitialisé avec succès !");
                    window.location.href = "connexion.html";
                } else {
                    alert("Erreur lors de la réinitialisation du mot de passe !");
                }
            }
        });
    }
});

// User-related functions
function registerUser(name, username, email, password) {
    const Id = getNextUserId();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { Id, name, username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}

function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    }
    return user;
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "connexion.html";
}

function resetPassword(username, newPassword) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    }

    return false;
}

function getNextUserId() {
    let IdCounter = parseInt(localStorage.getItem('IdCounter')) || 0;
    localStorage.setItem('IdCounter', (IdCounter + 1).toString());
    return IdCounter;
}
