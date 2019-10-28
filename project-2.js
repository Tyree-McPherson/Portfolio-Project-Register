const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Rendering the web page on a GET request.
router.get("/", (req, res) => {
    try {
        res.render("project-2", {
            // Set all the default values.
            title: "Register Validation - Tyree McPherson",
            email: "",
            password: "",
            passwordBcrypt: "",
            emailEntered: ""
        });
    } catch (error) {
        // If any errors, redirect to the portfolio home page.
        res.redirect("/");
    };
});

router.post("/", (req, res) => {
    try {

        // Get the password that the user has input.
        let password = req.body.password;

        // Hashing the user's password via Bcrypt and salt10.
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(404).render("project-2", {
                    title: "ERROR",
                    email: "",
                    password: "",
                    passwordBcrypt: "",
                    emailEntered: ""
                });
            } else {
                // If there were no errors, successfully hash the password and render
                // the register page with the email, hashed password, and newly added information.
                password = hash;
                var email = req.body.email;
                return res.status(409).render("project-2", {
                    title: "Register Validation - Tyree McPherson",
                    email: email,
                    password: password,
                    passwordBcrypt: " bcrypted (show)",
                    emailEntered: " entered"
                });
            };
        });
    } catch (error) {
        // If any errors, redirect to the portfolio home page.
        return res.redirect("/");
    };
});

module.exports = router;