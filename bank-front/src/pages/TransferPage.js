import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import useForm from "../hooks/useForm";
import { goToHome } from "../routes/coordinator";


const TransferPage = () => {

  const history = useHistory();
  const [form, onChange] = useForm({
    namePayer: "",
    cpfPayer: "",
    recipientName:"",
    recipientCpf:"",
    value:"",
   
  });
  const onSubmitForm = (event) => {
    postPayment(form, history);

  };

  const postPayment = (body, history) => {

    axios
      .post("http://ec2-15-228-23-22.sa-east-1.compute.amazonaws.com:3333/users/transfer", body)
      .then((res) => {  
        console.log("transferiu?");
        goToHome(history);
      })
      .catch((err) => {
      console.log(err.message)
      console.log("nao consegui transferir")
      });
  };

    return (
      <div>
        <form onSubmit={onSubmitForm}>
          <div>
            <TextField
              name={"namePayer"}
              aria-label="namePayer"
              value={form.namePayer}
              onChange={onChange}
              label={"namePayer"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"text"}
            />
   
            <TextField
              name={"cpfPayer"}
              aria-label="cpfPayer"
              value={form.cpfPayer}
              onChange={onChange}
              label={"cpfPayer"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"cpfPayer"}
           
            />

              <TextField
              name={"recipientName"}
              aria-label="recipientName"
              value={form.recipientName}
              onChange={onChange}
              label={"recipientName"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"text"}
           
            />


              <TextField
              name={"recipientCpf"}
              aria-label="recipientCpf"
              value={form.recipientCpf}
              onChange={onChange}
              label={"recipientCpf"}
              variant={"outlined"}
              fullWidth
              margin={"normal"}
              required
              type={"number"}
           
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
  
  
  export default TransferPage;
  