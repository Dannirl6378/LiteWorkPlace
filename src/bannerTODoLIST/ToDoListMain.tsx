import React, { FunctionComponent, useState, MouseEvent } from "react";
import {
  Button,
  Menu,
  MenuItem,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ToDoListProps{
  onListChange:(items: string[]) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ onListChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItem("");
      onListChange(updatedItems); // Předáváme změněný seznam zpět
    }
  };
  const handleDeleteItems = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onListChange(updatedItems); // Předáváme změněný seznam zpět
  };

  return (
    <div>
      <Badge badgeContent={items.length} color="secondary" overlap="circular" />
      <Button
        aria-controls="ToDoList"
        aria-haspopup="tree"
        onClick={handleClick}
        sx={{ background: "black", color: "white", fontWeight: "bold" }}
      >
        Open ToDo List
      </Button>
      <Menu
        id="ToDoList"
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleClose}
        sx={{
          style: {
            maxHeight: 300,
            width: "20ch",
          },
        }}
      >
        <MenuItem>
          <TextField
            label="Add Text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem();
                e.preventDefault();
              }
            }}
            fullWidth
          />
        </MenuItem>
        <List dense>
          {items.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteItems(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Menu>
    </div>
  );
};

export default ToDoList;