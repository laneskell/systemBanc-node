import { Card } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import GlobalStateContext from "../global/GlobalStateContext";
import { goToCreateUser, goToExtract, goToPayment, goToTransfer } from "../routes/coordinator";

const HomePage = () => {
  const history = useHistory();
  const {users, setUsers} = useContext(GlobalStateContext);

  const allUsers = users.map((user)=>{
    return(
      <Card key={user.id}>
        <p>ID: {user.id}</p>
        <p>Nome : {user.name}</p>
        <p>CPF: {user.cpf}</p>
        <p>Nascimento: {user.dateOfBirth}</p>
      </Card>
    )
  })

    return (
      <div>
        <button onClick={()=> goToCreateUser(history)}>Criar Usuário</button>
       <button onClick={()=> goToPayment(history)}>Fazer pagameto</button>
       <button onClick={()=> goToTransfer(history)}>Transferencia</button>
        <button onClick={()=> goToExtract(history)}>Extrato</button>
        {allUsers}
      </div>
    );
  };
  
  export default HomePage;
  