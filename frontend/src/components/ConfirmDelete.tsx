import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ConfirmDelete({ open, onClose, onConfirm}) {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Excluir tarefa</DialogTitle>
            <DialogContent>
                <DialogContentText>Tem certeza que deseja excluir essa tarefa?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={onConfirm} color="error" variant="contained">Excluir</Button>
            </DialogActions>
        </Dialog>
    )
}