import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Container, Box } from '@mui/material';
function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <Box sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
                <Button 
                    startIcon={<HomeIcon />}
                    onClick={() => routeTo("/home")}
                    sx={{ 
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                >
                    Back to Home
                </Button>
            </Box>
            
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#667eea', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VideoCallIcon sx={{ fontSize: 40 }} />
                    Meeting History
                </Typography>
                {
                    (meetings.length !== 0) ? meetings.map((e, i) => {
                        return (
                            <Card 
                                key={i} 
                                sx={{ 
                                    mb: 3, 
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { 
                                        transform: 'translateY(-8px)', 
                                        boxShadow: '0 16px 40px rgba(102, 126, 234, 0.2)' 
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                        <VideoCallIcon sx={{ color: '#667eea', fontSize: 32 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                                            {e.meetingCode}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CalendarTodayIcon sx={{ color: '#999', fontSize: 18 }} />
                                        <Typography sx={{ color: '#666' }}>
                                            {formatDate(e.date)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        )
                    }) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <VideoCallIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#999' }}>
                                No meeting history yet
                            </Typography>
                        </Box>
                    )
                }
            </Container>
        </Box>
    )
}

export default History;
