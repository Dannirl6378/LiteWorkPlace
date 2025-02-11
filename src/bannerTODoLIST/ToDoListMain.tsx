import React, { useState, useEffect, MouseEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
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
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ToDoListProps {
  onListChange: (items: string[]) => void; // Pro uložení do databáze
  todoList: string[]; // Načteno z databáze
}

interface ToDoItem {
  text: string;
  checked: boolean;
}

const ToDoList: React.FC<ToDoListProps> = ({ onListChange, todoList }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [items, setItems] = useState<ToDoItem[]>([]); // Prázdné pole jako výchozí hodnota
  const [newItem, setNewItem] = useState<string>("");

  useEffect(() => {
    // Načtení a synchronizace dat z todoList
    console.log("todoList z databáze:", todoList);
    const parsedItems = todoList.map((item) => JSON.parse(item)); // Konverze
    setItems(parsedItems); // Nastavení
  }, [todoList]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      const updatedItems = [...items, { text: newItem, checked: false }];
      setItems(updatedItems);
      setNewItem("");
      onListChange(updatedItems.map((item) => JSON.stringify(item))); // Aktualizace databáze
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onListChange(updatedItems.map((item) => JSON.stringify(item))); // Aktualizace databáze
  };

  const handleToggleChecked = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    onListChange(updatedItems.map((item) => JSON.stringify(item))); // Aktualizace databáze
  };

  return (
    <Box>
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
        anchorReference="anchorPosition"
  anchorPosition={{
    top: window.innerHeight / 3.3,
    left: window.innerWidth / 2.6,
  }}
        sx={{
          style: {
            width: "300px",
            maxHeight: "400px", // Omezení maximální výšky
            overflowY: "auto",
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
        <List dense sx={{ maxHeight: "300px",maxWidth:"250px", overflowY: "auto" }}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Box display="flex" alignItems="center" sx={{ marginRight: "-13px"}}>
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleToggleChecked(index)}
                    size="small"
                    
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText primary={item.text}
              sx={{ maxWidth:"250px",wordBreak: "break-word", whiteSpace: "normal", flex: 1 }} />
            </ListItem>
          ))}
        </List>
      </Menu>
    </Box>
  );
};

export default ToDoList;
