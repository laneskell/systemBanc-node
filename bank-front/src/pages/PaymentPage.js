import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import useForm from "../hooks/useForm";
import { goToHome } from "../routes/coordinator";


const PaymentPage = () => {
  const history = useHistory();
  const [form, onChange] = useForm({
    cpf: "",
    date: "",
    value:"",
    description:"",
   
  });
  const onSubmitForm = (event) => {
    postPayment(form, history);

  };

  const postPayment = (body, history) => {

    axios
      .post("http://ec2-15-228-23-22.sa-east-1.compute.amazonaws.com:3333/users/payment", body)
      .then((res) => {  
        console.log("pagou?");
        goToHome(history);
      })
      .catch((err) => {
      console.log(err.message)
      console.log("nao consegui pagar")
      });
  };

    return (
      <div>
        <form onSubmit={onSubmitForm}>
          <div>
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
              name={"data"}
              aria-label="data"
              value={form.data}
              onChange={onChange}
              label={"data"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"data"}
           
            />
              <TextField
              name={"value"}
              aria-label="value"
              value={form.value}
              onChange={onChange}
              label={"value"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"number"}
           
            />
                
            
              <TextField
              name={"description"}
              aria-label="description"
              value={form.description}
              onChange={onChange}
              label={"description"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"text"}
           
            />
          </div>

          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            color={"primary"}
          >
            <h3>PAGAR</h3>
          </Button>
        </form>
      </div>
    );
  };
  
  
  export default PaymentPage;
  