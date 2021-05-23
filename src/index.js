"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cors_1["default"]());
var users = [
    {
        id: 1,
        name: "Kell Lanes",
        cpf: "12345678910",
        dateOfBirth: "1990-07-16",
        balance: 600,
        statement: [
            { value: 600, date: 1621609733, description: "Depósito em Dinheiro" },
        ]
    },
    {
        id: 2,
        name: "Clara Macedo",
        cpf: "12345678911",
        dateOfBirth: "1995-11-21",
        balance: 1500,
        statement: [
            { value: 1500, date: 1621613333, description: "Depósito em Dinheiro" },
        ]
    },
    {
        id: 3,
        name: "Jeann Chuab",
        cpf: "12345678912",
        dateOfBirth: "1989-03-11",
        balance: 10000,
        statement: [
            { value: 10000, date: 1621631893, description: "Depósito em Dinheiro" },
        ]
    },
    {
        id: 4,
        name: "Bruna Prado",
        cpf: "12345678913",
        dateOfBirth: "1994-10-31",
        balance: 800,
        statement: [
            { value: 800, date: 1621682293, description: "Depósito em Dinheiro" },
        ]
    },
];
function calculateAge(dobString) {
    var dob = new Date(dobString);
    var currentDate = new Date();
    var currentYear = currentDate.getUTCFullYear();
    var birthdayThisYear = new Date(currentYear, dob.getUTCMonth(), dob.getUTCDate());
    var age = currentYear - dob.getUTCFullYear();
    if (birthdayThisYear > currentDate) {
        age--;
    }
    return age;
}
app.get("/users", function (req, res) {
    try {
        res.status(200).send(users);
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
app.post("/users", function (req, res) {
    try {
        var _a = req.body, name_1 = _a.name, cpf_1 = _a.cpf, dateOfBirth = _a.dateOfBirth;
        var age = Number(calculateAge(dateOfBirth));
        if (age >= 18) {
            var newUser = {
                // Date.now()
                id: users.length + 1,
                name: name_1,
                cpf: cpf_1,
                dateOfBirth: dateOfBirth,
                balance: 0,
                statement: []
            };
            if (!name_1 || !cpf_1) {
                throw new Error("Check body, it requires name, CPF and date of birth.");
            }
            users.map(function (user) {
                if (user.cpf.includes(cpf_1)) {
                    throw new Error("This CPF is already registered.");
                }
            });
            users.push(newUser);
            res.status(200).send("User created sucessfully");
        }
        else {
            throw new Error("User is not 18 years old yet.");
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
app.get("/users/:cpf", function (req, res) {
    try {
        var cpfParams_1 = req.params.cpf;
        var name_2;
        var balance_1;
        if (cpfParams_1.length < 11) {
            throw new Error("The CPF must have 11 numbers");
        }
        else {
            users.map(function (user) {
                if (user.cpf === cpfParams_1) {
                    name_2 = user.name;
                    balance_1 = Number(user.balance);
                }
            });
            if (!balance_1) {
                throw new Error("No user with that CPF found.");
            }
            res.status(200).send({ name: name_2, balance: balance_1 });
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
app.put("/users/add", function (req, res) {
    try {
        var cpfQuery_1 = req.query.cpf;
        var nameQuery_1 = req.query.name;
        var valueQuery_1 = req.query.value;
        var result_1 = false;
        if (cpfQuery_1.length < 11 || !nameQuery_1 || !valueQuery_1) {
            throw new Error("Check parameters.");
        }
        else {
            users.map(function (user) {
                if (user.cpf === cpfQuery_1 &&
                    user.name.toLowerCase() === nameQuery_1.toLocaleLowerCase()) {
                    user.balance += Number(valueQuery_1);
                    var newItem = {
                        value: Number(valueQuery_1),
                        date: Date.now(),
                        description: "Depósito em Dinheiro"
                    };
                    user.statement.push(newItem);
                    result_1 = true;
                }
            });
            if (!result_1) {
                throw new Error("User not found, check name and cpf");
            }
            res.status(200).send("Value added successfully and Updated balance");
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
app.post("/users/payment", function (req, res) {
    try {
        var _a = req.body, cpf_2 = _a.cpf, value_1 = _a.value, description_1 = _a.description, date = _a.date;
        var result_2 = false;
        var datePayment_1 = date;
        if (date === "") {
            datePayment_1 = Date.now();
        }
        else if (date < Date.now) {
            throw new Error("Date cannot be earlier than today");
        }
        else {
            datePayment_1 = date;
        }
        if (cpf_2.length < 11 || !value_1 || !description_1) {
            throw new Error("Check parameters.");
        }
        else {
            users.map(function (user) {
                if (user.cpf === cpf_2) {
                    var balance = user.balance;
                    if (value_1 < balance) {
                        user.balance -= Number(value_1);
                        var newItem = {
                            value: Number(value_1) * -1,
                            date: datePayment_1,
                            description: description_1
                        };
                        user.statement.push(newItem);
                        result_2 = true;
                    }
                    else {
                        throw new Error("insufficient funds, Check the Value");
                    }
                }
            });
        }
        if (!result_2) {
            throw new Error("User not found, Check the CPF");
        }
        res.status(200).send("Payment of expense successful");
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
app.post("/users/transfer", function (req, res) {
    try {
        var _a = req.body, namePayer_1 = _a.namePayer, cpfPayer_1 = _a.cpfPayer, recipientName_1 = _a.recipientName, recipientCpf_1 = _a.recipientCpf, value_2 = _a.value;
        var balance_2;
        var result = users;
        if (cpfPayer_1.length !== 11 || recipientCpf_1.length !== 11) {
            throw new Error("The CPF must have 11 numbers");
        }
        else {
            if (recipientName_1 && recipientCpf_1) {
                result = result
                    .filter(function (user) { return user.name === recipientName_1; })
                    .filter(function (user) { return user.cpf === recipientCpf_1; });
            }
            if (!result.length) {
                throw new Error("User Payer or User Recipient not found. check the cpfs");
            }
            users.map(function (user) {
                if (user.cpf === cpfPayer_1 &&
                    user.name.toLowerCase() === namePayer_1.toLowerCase()) {
                    if (user.balance >= Number(value_2)) {
                        user.balance -= Number(value_2);
                        var newItem = {
                            value: Number(value_2) * -1,
                            date: Date.now(),
                            description: "Transferência entre contas"
                        };
                        balance_2 = true;
                        user.statement.push(newItem);
                    }
                    else {
                        throw new Error("Insufficient balance, check the value");
                    }
                }
            });
            users.map(function (user) {
                if (user.cpf === recipientCpf_1 &&
                    user.name.toLowerCase() === recipientName_1.toLowerCase()) {
                    user.balance += Number(value_2);
                    var newItem = {
                        value: Number(value_2),
                        date: Date.now(),
                        description: "Transferência entre contas"
                    };
                    user.statement.push(newItem);
                }
            });
            if (!balance_2) {
                throw new Error("User not found, Check your parameters.");
            }
            else {
                res.status(200).send("Transfered successfully.");
            }
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
app.listen(3333, function () {
    console.log("Server is running at port 3333");
});
