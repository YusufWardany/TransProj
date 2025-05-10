import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DirectionsBus, Train, DirectionsCar, TwoWheeler } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    navigate('/login');
  };
const DashBoard = () => {
  console.log('Dashboard component rendering'); // Check if this appears
  
  return (
    <div>
      <h1>Test Content - Can you see this?</h1>
      {/* Rest of your content */}
    </div>
  );
}
  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Transportation System Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Welcome to the City Transportation Management System
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <DirectionsBus sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography>Bus Routes</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Train sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography>Train Schedules</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <DirectionsCar sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography>Parking</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <TwoWheeler sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography>Bike Sharing</Typography>
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;