import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { addActivity } from '../services/api';

const ActivityForm = ({onActivityAdded}) => {

  const [activity, setActivity] = useState({
    type: "RUNNING", duration: "", caloriesBurned: "",
    additionalMetrics: {}
  })

  const activities = [
  "RUNNING",
  "JOGGING",
  "WALKING",
  "CYCLING",
  "SWIMMING",
  "YOGA",
  "PILATES",
  "CARDIO",
  "WEIGHT_TRAINING",
  "HIIT",
  "STRETCHING",
  "ZUMBA",
  "OTHERS",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: ""});
    } catch (error) {
      console.error(error);
    } 
  }


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <FormControl fullWidth sx={{mb: 2}}>
        <InputLabel>Activity Type</InputLabel>
        <Select 
          value={activity.type}
          onChange={(e)=>setActivity({...activity, type: e.target.value})}
        >

        {activities.map((a) => (
          <MenuItem key={a} value={a}>
            {a.charAt(0) + a.slice(1).toLowerCase().replace(/_/g, " ")}
          </MenuItem>
        ))}

        </Select>
      </FormControl>
      <TextField fullWidth
                  label="Duration(in minutes)"
                  type="number"
                  sx={{mb:2}} 
                  value={activity.duration}
                  onChange={(e)=>setActivity({...activity, duration: e.target.value})} />
      <TextField fullWidth
                  label="Calories Burned"
                  type="number"
                  sx={{mb:2}} 
                  value={activity.caloriesBurned}
                  onChange={(e)=>setActivity({...activity, caloriesBurned: e.target.value})} />
      <Button type="submit" variant="contained">
        Add Activity
      </Button>
    </Box>
  );
}

export default ActivityForm;