import { Box, List, ListItem, Typography } from '@mui/material';
import * as React from 'react';

function School() {
    return (
        <Box
            sx={{
                lineHeight: 1.6,
                fontSize: "1rem",
                padding: "16px",
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 2,
                maxWidth: "600px",
                margin: "auto",
            }}
        >
            {/* Nadpis sekce */}
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    color: "primary.main",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "16px",
                }}
            >
                Školy
            </Typography>

            {/* Seznam škol */}
            <List
                sx={{
                    padding: 0,
                }}
            >
                <ListItem
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "12px",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                        2008–2012
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                        SOŠ průmyslová a SOU strojírenské, Prostějov
                    </Typography>
                </ListItem>

                <ListItem
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "12px",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: "text.secondary" }}
                    >
                        2012–2014
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                        Přírodovědecká fakulta<br />
                        Univerzita Palackého v Olomouci<br />
                        Katedra informatiky<br />
                        <i>(nedostudováno, odchod ve 2. ročníku)</i>
                    </Typography>
                </ListItem>
            </List>
        </Box>
    );
}

export default School;
