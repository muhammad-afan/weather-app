import React, { useState } from 'react'
import { Card, CardContent, CardMedia, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

function Weather({ image, city }) {
    const [input, setInput] = useState('')
    const [data, setData] = useState([])
    const handleChange = async (event) => {
        setInput(event.target.value)
    }

    const fetchApi = async () => {
        const api = `https://api.weatherapi.com/v1/current.json?key=cd0111d6cae24d9bb83135219230110&q=${input}`
        const data = await fetch(api);
        const parsedData = await data.json();
        setData(parsedData);
    }

    return (
        <div>
            <Paper sx={{ width: '400px', display: 'flex', justifyContent: 'center', alignItem: 'center', flexDirection: 'column', }}>
                <TextField
                    sx={{ width: '400px', position: 'relative' }}
                    onChange={handleChange}
                    value={input}
                    label="Enter city"
                    variant="outlined"
                    InputProps={{
                        endAdornment: <InputAdornment position='start'>
                            <IconButton onClick={fetchApi}
                                disableRipple
                                sx={{ cursor: 'pointer', color: 'white', position: 'absolute', right: 0 }}
                            >
                                <SearchIcon sx={{ background: '#282c34', padding: '14px 10px', position: 'absolute', right: 0 }} />
                            </IconButton>
                        </InputAdornment>
                    }}
                />
                <Card sx={{ width: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} elevation={2}>
                    <CardContent>
                        <Typography variant='h3'>{data.location?.name ? data.location?.name : 'Enter valid city'}</Typography>
                    </CardContent>
                    <CardMedia>
                        <img src={data.current?.condition.icon ? data.current?.condition.icon : ''} alt="" width={120} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant='h4'>{data.current?.temp_c ? data.current?.temp_c : ''}&deg;C</Typography>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    )
}

export default Weather
