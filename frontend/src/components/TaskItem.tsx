import { Card, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import { ModalTask } from "./ModalTask";
import { toggleTask } from "../services/requests";
import ConfirmDelete from "./ConfirmDelete";

interface Props {
  id: number;
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onUpdated: () => void;
}

export function TaskItem({ id, title, completed, onToggle, onDelete, onUpdated }: Props) {
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Stack direction="row" spacing={2}>
        <Checkbox
          checked={completed}
          sx={{ width: "50px", height: "50px" }}
          onChange={onToggle}
        />
        <Typography
                  sx={{ textDecoration: completed ? "line-through" : "none", display: "flex", alignItems: "center" }}
        >
          {title}
        </Typography>
      </Stack>
      <IconButton
        color="info"
        sx={{ width: "50px", height: "50px"}}
        onClick={() => setOpen(true)}
      >
        <Edit />
      </IconButton>
      <IconButton
        color="default"
        sx={{ width: "50px", height: "50px", color: "rgba(232, 73, 73, 1)" }}
        onClick={() => setOpenDelete(true)}
      >
        <DeleteIcon />
      </IconButton>
      <ModalTask
        open={open}
        onClose={() => setOpen(false)}
        mode="update" 
        onCreate={() => {}}
        id={id}
        title={title}
        onUpdate={(id, title) => {
          toggleTask(id, title, toggle).then(onUpdated)} }
        />
        <ConfirmDelete
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={() => {
            onDelete();
            setOpenDelete(false);
          }}
          />
    </Card>
  );
}
