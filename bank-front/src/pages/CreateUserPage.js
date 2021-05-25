import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import useForm from "../hooks/useForm";
import { goToHome } from "../routes/coordinator";


const CreateUserPage = () => {
  const history = useHistory();
  const [form, onChange] = useForm({
    name: "",
    cpf: "",
    dateOfBirth:"",
   
  });
  const onSubmitForm = (event) => {
    getCreateUser(form, history);

  };

  const getCreateUser = (body, history) => {

    axios
      .post("http://ec2-15-228-23-22.sa-east-1.compute.amazonaws.com:3333/users", body)
      .then((res) => {  
        console.log("criou?");
        goToHome(history);
      })
      .catch((err) => {
      console.log(err.message)
      console.log("deu ruim")
      });
  };

    return (
      <div>
        <form onSubmit={onSubmitForm}>
          <div>
            <TextField
              name={"name"}
              aria-label="name"
              value={form.name}
              onChange={onChange}
              label={"name"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"text"}
            />
   
            <TextField
              name={"cpf"}
              aria-label="cpf"
              value={form.cpf}
              onChange={onChange}
              label={"cpf"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"number"}
           
            />
              <TextField
              name={"dateOfBirth"}
              aria-label="dateOfBirth"
              value={form.dateOfBirth}
              onChange={onChange}
              label={""}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"date"}
           
            />
          </div>

          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
          >
            <h3>ENTRAR</h3>
          </Button>
        </form>
      </div>
    );
  };
  
  export default CreateUserPage;
  