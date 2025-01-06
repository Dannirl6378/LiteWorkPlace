import { Box, List, ListItem, Typography } from '@mui/material';
import * as React from 'react';

function work() {
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
                height: "400px", // Pevná výška okna
                overflowY: "auto", // Povolení svislého skrolování
                scrollbarGutter: "stable", // Stabilní prostor pro posuvník
            }}
        >
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
                Práce
            </Typography>

            <List sx={{ padding: 0 }}>
                {[
                    {
                        date: "2010–2010",
                        role: "Technik domácích síti",
                        description:
                            "Pracovní praxe ve firmě Infos.cz v rámci středního odborného vzdělání. Instalace optiky, domácího připojeni k Internetu.",
                    },
                    {
                        date: "2014–2016",
                        role: "Operátor/skladník",
                        description:
                            "Starost o vyskladnění a zaskladnění materiálu. V technologickém skladu O2.",
                    },
                    {
                        date: "2016–2019",
                        role: "Specialista/Logistik",
                        description:
                            "Odpovědnost za naskladnění a vyskladnění materiálu, administrativní činnost a vykonanou práci podřízených.  V technologickém skladu České telekomunikační infrastruktury.",
                    },
                    {
                        date: "2019–2020",
                        role: "Technik zabezpecovacich systemů",
                        description:
                            "Montáž, oživení, a servis zabezpečovacích systémů pro obchodní řetězce. Ve firmě Alsig.",
                    },
                    {
                        date: "2020–2022",
                        role: "Technik docházkových systémů",
                        description:
                            "Montáž, oživení, a servis docházkových systémů pro všechny velikosti firem a státní správu. Ve firmě Anet.",
                    },
                    {
                        date: "2022–",
                        role: "Skladník",
                        description:
                            "Zastupování vedoucích skladníků a objednávání zboží na všechny sklady ve firmě Slovenské plavby a přístavy.",
                    },
                ].map((job, index) => (
                    <ListItem
                        key={index}
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
                            {job.date}
                            <br />
                            {job.role}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.primary", marginTop: "4px" }}
                        >
                            {job.description}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default work;
