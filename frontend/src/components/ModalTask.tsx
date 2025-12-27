import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Stack,
  Alert
} from "@mui/material";
import { useEffect, useState, type FormEvent } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
  onUpdate: (id: number, title: string) => void;
  id?: number;
  title?: string;
  mode: "create" | "update";
}

export function ModalTask({ open, onClose, onCreate, onUpdate, id, mode = "create", title: initialTitle = "" }: Props) {
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (open) {
      if (mode === "update") {
        setTitle(initialTitle);
      } else setTitle("");
    }
  }, [open, mode, initialTitle])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setShowAlert(true);
      return;
    }
    if (mode === "create") {
      onCreate(title);

    } else if (mode === "update") {
      onUpdate(id!, title);
    }

    setTitle("");
    setShowAlert(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} key={id ?? "create"}>
      <form action="POST" onSubmit={handleSubmit}>
        <DialogTitle>{ mode === "create" ? "Criar tarefa" : "Editar tarefa" }</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              />
            <Button variant="contained" type="submit">
              { mode === "create" ? "Criar" : "Salvar alterações"}
            </Button>
          </Stack>
          {
            showAlert && (
                <Alert variant="outlined" severity="warning"
                  sx={{ marginTop: "16px", height: "44px", display: "flex", justifyContent: "center", alignItems: "center", '& .MuiAlert-message': {
                    margin: 0,
                    width: "100%",
                    marginRight: "24px",
                    textAlign: "center"
                  }, "& .MuiAlert-icon": {
                    width: "24px"
                  }}}>
                  Título não pode estar vazio
                </Alert>
            )
          }
        </DialogContent>
      </form>
    </Dialog>
  );
}
