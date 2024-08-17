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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ToDoList() {
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
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem("");
    }
  };
  const handleDeleteItems = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Button
        aria-controls="ToDoList"
        aria-haspopup="tree"
        onClick={handleClick}
      >
        Open ToDo List
      </Button>
      <Menu
        id="ToDo List"
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

