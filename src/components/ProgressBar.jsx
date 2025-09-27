import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ProgressBar component using Material UI LinearProgress
const ProgressBar = ({ progress = 75 }) => {
	return (
		<Box sx={{ width: '100%', mb: 2 }}>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
				Progress: {progress}%
			</Typography>
			<LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
		</Box>
	);
};

export default ProgressBar;
