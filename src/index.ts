import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

type Expense = {
  value: number;
  date: number | string;
  description: string;
};

type User = {
  id: number;
  name: string;
  cpf: string;
  dateOfBirth: string;
  balance: number;
  statement: Expense[];
};

let users: User[] = [
  {
    id: 1,
    name: "Kell Lanes",
    cpf: "12345678910",
    dateOfBirth: "1990-07-16",
    balance: 600,
    statement: [
      { value: 600, date: 1621609733, description: "Depósito em Dinheiro" },
    ],
  },
  {
    id: 2,
    name: "Clara Macedo",
    cpf: "12345678911",
    dateOfBirth: "1995-11-21",
    balance: 1500,
    statement: [
      { value: 1500, date: 1621613333, description: "Depósito em Dinheiro" },
    ],
  },
  {
    id: 3,
    name: "Jeann Chuab",
    cpf: "12345678912",
    dateOfBirth: "1989-03-11",
    balance: 10000,
    statement: [
      { value: 10000, date: 1621631893, description: "Depósito em Dinheiro" },
    ],
  },
  {
    id: 4,
    name: "Bruna Prado",
    cpf: "12345678913",
    dateOfBirth: "1994-10-31",
    balance: 800,
    statement: [
      { value: 800, date: 1621682293, description: "Depósito em Dinheiro" },
    ],
  },
];

function calculateAge(dobString: any) {
  var dob = new Date(dobString);
  var currentDate = new Date();
  var currentYear = currentDate.getUTCFullYear();
  var birthdayThisYear = new Date(
    currentYear,
    dob.getUTCMonth(),
    dob.getUTCDate()
  );
  var age = currentYear - dob.getUTCFullYear();
  if (birthdayThisYear > currentDate) {
    age--;
  }
  return age;
}
app.get("/ping", (req: Request, res: Response) => {
  try {
    res.status(200).send("pong!!");
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});


app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    const { name, cpf, dateOfBirth } = req.body;
    let age = Number(calculateAge(dateOfBirth));
    if (age >= 18) {
      const newUser: User = {
        // Date.now()
        id: users.length + 1,
        name,
        cpf,
        dateOfBirth,
        balance: 0,
        statement: [],
      };
      if (!name || !cpf) {
        throw new Error("Check body, it requires name, CPF and date of birth.");
      }
      users.map((user) => {
        if (user.cpf.includes(cpf)) {
          throw new Error("This CPF is already registered.");
        }
      });
      users.push(newUser);
      res.status(200).send("User created sucessfully");
    } else {
      throw new Error("User is not 18 years old yet.");
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.get("/users/:cpf", (req: Request, res: Response) => {
  try {
    const cpfParams = req.params.cpf as string;
    let name;
    let balance;
    if (cpfParams.length < 11) {
      throw new Error("The CPF must have 11 numbers");
    } else {
      users.map((user) => {
        if (user.cpf === cpfParams) {
          name = user.name;
          balance = Number(user.balance);
        }
      });
      if (!balance) {
        throw new Error("No user with that CPF found.");
      }
      res.status(200).send({ name, balance });
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.put("/users/add", (req: Request, res: Response) => {
  try {
    const cpfQuery = req.query.cpf as string;
    const nameQuery = req.query.name as string;
    const valueQuery = req.query.value;
    let result = false;
    if (cpfQuery.length < 11 || !nameQuery || !valueQuery) {
      throw new Error("Check parameters.");
    } else {
      users.map((user) => {
        if (
          user.cpf === cpfQuery &&
          user.name.toLowerCase() === nameQuery.toLocaleLowerCase()
        ) {
          user.balance += Number(valueQuery);

          let newItem: Expense = {
            value: Number(valueQuery),
            date: Date.now(),
            description: "Depósito em Dinheiro",
          };
          user.statement.push(newItem);
          result = true;
        }
      });
      if (!result) {
        throw new Error("User not found, check name and cpf");
      }
      res.status(200).send("Value added successfully and Updated balance");
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.post("/users/payment", (req: Request, res: Response) => {
  try {
    const { cpf, value, description, date } = req.body;
    let result = false;

    let datePayment = date;

    if (date === "") {
      datePayment = Date.now();
    } else if (date < Date.now) {
      throw new Error("Date cannot be earlier than today");
    } else {
      datePayment = date;
    }
    if (cpf.length < 11 || !value || !description) {
      throw new Error("Check parameters.");
    } else {
      users.map((user) => {
        if (user.cpf === cpf) {
          let balance = user.balance;
          if (value < balance) {
            user.balance -= Number(value);
            let newItem: Expense = {
              value: Number(value)*-1,
              date: datePayment,
              description: description,
            };
            user.statement.push(newItem);
            result = true;
          } else {
            throw new Error("insufficient funds, Check the Value");
          }
        }
      });
    }
    if (!result) {
      throw new Error("User not found, Check the CPF");
    }
    res.status(200).send("Payment of expense successful");
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

app.post("/users/transfer", (req: Request, res: Response) => {
    try {
        const { namePayer, cpfPayer, recipientName, recipientCpf, value } = req.body;
        let balance;
        let result = users;
        if (cpfPayer.length !== 11 || recipientCpf.length !== 11) {
          throw new Error("The CPF must have 11 numbers");
        } else {
          if (recipientName && recipientCpf) {
            result = result
              .filter((user) => user.name === recipientName)
              .filter((user) => user.cpf === recipientCpf);
          }
          if (!result.length) {
            throw new Error("User Payer or User Recipient not found. check the cpfs");
          }
          users.map((user) => {
            if (
              user.cpf === cpfPayer &&
              user.name.toLowerCase() === namePayer.toLowerCase()
            ) {
              if (user.balance >= Number(value)) {
                user.balance -= Number(value)
                let newItem: Expense = {
                  value: Number(value)*-1,
                  date:Date.now(),
                  description: "Transferência entre contas",
                };
                balance = true;
                user.statement.push(newItem);
              } else {
                throw new Error(
                  "Insufficient balance, check the value"
                );
              }
            }
          });
          users.map((user) => {
            if (
              user.cpf === recipientCpf &&
              user.name.toLowerCase() === recipientName.toLowerCase()
            ) {
                user.balance += Number(value)
              let newItem: Expense = {
                value: Number(value),
                date: Date.now(),
                description: "Transferência entre contas",
                
              };
              user.statement.push(newItem);
            }
          });
          if (!balance) {
            throw new Error("User not found, Check your parameters.");
          } else {
            res.status(200).send("Transfered successfully.");
          }
        }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    })
  }
});

app.listen(3333, () => {
  console.log("Server is running at port 3333");
});
