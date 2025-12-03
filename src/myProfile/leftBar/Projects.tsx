import { Box, List, ListItem, Typography, Link } from '@mui/material';
import React from 'react';

function Projects() {
    const projects = [
        {
            name: 'Lite Work Place',
            url: 'https://github.com/Dannirl6378/LiteWorkPlace',
            description: 'Moje hlavní portfolio projektů',
        },
        {
            name: 'Exercise Arrays',
            url: 'https://github.com/Dannirl6378/exercie-arrays',
            description: 'Jednoduché cvičení Arrays',
        },
        {
            name: 'Dictionary',
            url: 'https://github.com/Dannirl6378/dictionary',
            description: 'Malý projekt na API',
        },
        {
            name: 'Weather',
            url: 'https://github.com/Dannirl6378/weather',
            description: 'Malý projekt na API',
        },
        {
            name: 'JobBoard',
            url: 'https://jobboard-psi.vercel.app/',
            description: 'Jednoduchá stránka pro hledání práce',
        }
    ];

    return (
        <Box
            sx={{
                lineHeight: 1.6,
                fontSize: '1rem',
                padding: '16px',
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: 2,
                maxWidth: '600px',
                margin: 'auto',
            }}
        >
            <List>
                {projects.map((project, index) => (
                    <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}
                        >
                            {project.name}
                        </Link>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '4px' }}>
                            {project.description}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Projects;
