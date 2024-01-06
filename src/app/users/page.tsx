"use client";
import { useState } from "react";
import Layout from "../components/layout";
import UserList from "./usersList";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserDetail from "./userDetail";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function Users() {
  const [addUser, setAddUser] = useState(false);
  return (
    <Layout>
      <>
        {addUser ? (
          <div>
          <div className="flex justify-start">
             <ArrowBackIcon className="mr-2 cursor pointer" onClick={() => setAddUser(false)} />
            <h1 className="font-bold">Users</h1>
           
          </div>
          <UserDetail />
        </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold">Users</h1>
              <Button
                variant="outlined"
                onClick={() => setAddUser(true)}
                className="mb-2"
                endIcon={<AddCircleIcon />}
              >
                Add User
              </Button>
            </div>
            <UserList />
          </div>
        )}
      </>
    </Layout>
  );
}
