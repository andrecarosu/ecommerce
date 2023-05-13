import React from "react";
import AccountDatabase from './AccountDatabase';
import AccountGoogle from './AccountGoogle';


const Account = () => {
const estaLogueado = localStorage.getItem("estaLogueado");
 
  return (
  <>
  {estaLogueado === "database" && (
    <AccountDatabase/>
  )}

{estaLogueado === "google" && (
    <AccountGoogle/>
  )}
  </>
  );
};



export default Account;
