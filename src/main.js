function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        const url = 'http://localhost:3010/users/login';
        const username= document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const data = { username:username, password:password};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const resp = fetch_function(url, options);
      
        resp.then(function(value) {console.log(value);
            console.log(value.ERROR);
            if (value.ERROR==null){
                setFormMessage(loginForm, "success", "Correct Login");
            }else{
                setFormMessage(loginForm, "error", "Invalid username/password combination");
            }
        },
        function(error) {errormssg=error}
      );
        console.log(resp);
        

    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        // window.localStorage.getItem(key);

        // Perform your AJAX/Fetch login
        const url = 'http://localhost:3010/users/register';
        let username = document.getElementById("createEmail").value;
        let password = document.getElementById("createPassword").value;
        let passwordConfirm = document.getElementById("createPassConfirm").value;
        if (username && password==passwordConfirm){
            const data = { username:username, password:password};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const resp = fetch_function(url, options);
            resp.then(function(value) {console.log(value);
                console.log(value.ERROR);
                if (value.ERROR==null){
                    setFormMessage(createAccountForm, "success", "User created successfully");
                }else{
                    setFormMessage(createAccountForm, "error", "Invalid username/password combination");
                }
            },
            function(error) {errormssg=error}
          );

        }
        
                console.log(resp);
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


async function  fetch_function(url, options){
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
    return data;
    
}
