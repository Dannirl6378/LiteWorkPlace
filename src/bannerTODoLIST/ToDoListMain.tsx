import React, {  FunctionComponent, useState } from 'react'
import { Button,Menu,MenuItem,TextField,IconButton,Box } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete"
interface ToDoListProps {
    
}
 
const ToDoList: FunctionComponent<ToDoListProps> = () => {
    const [showList,setShowList]=useState(false);



    return ( <div>
        <Button>
            Open ToDo List
        </Button>
        <Menu open={showList}>
        <Box>
            <TextField>

            </TextField>
            <MenuItem>

            </MenuItem>
            <Button>Add</Button>
            <Box>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </Box>

        </Box>
        </Menu>
    </div> );
}
 
export default ToDoList;