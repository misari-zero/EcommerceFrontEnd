import { Button, Card, CardContent, CardHeader, Container, Grid, Paper, Table, Typography } from "@mui/material";
import { logOut } from "../config/firebase";
import { useState } from "react";


const Dashboard = () => {
  const handleLogout = async () => {
    try {
        await logOut()
    } catch (error) {
        console.log(error);
    }
  };

  return (
    
    <div className="h-screen w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Dashboard</div>
     <nav className="flex-1">
    <ul>
    <li className="p-4 font-bold hover:bg-sky-400">Inicio</li>
    <li className="p-4 font-bold hover:bg-sky-400">Solicitudes</li>
    <li className="p-4 font-bold hover:bg-sky-400">Nueva solicitud</li>
    </ul>
    <Table />
    </nav>
    <div className="p-4 bg-blue-800">
    <Button variant="contained" onClick={handleLogout}>LogOut</Button>
    </div>
    </div>
  );
};

export default Dashboard;