import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { Title } from "react-admin";

const Dashboard = () => {
  return (
    <>
      <Title title="Dashboard" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h2>Welcome to Admin Dashboard</h2>
              <p>Manage your application data and users here.</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <h3>Quick Links</h3>
              <ul>
                <li>Manage Users</li>
                <li>View Options Chain</li>
                <li>Update Pricing</li>
                <li>Check Contact Messages</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
