import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IDeletePodcastBtnProps {
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
}

export const DeletePodcastBtn: React.FC<IDeletePodcastBtnProps> = ({
  open,
  handleClose,
  onDelete,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"팟캐스트를 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            팟캐스트를 삭제하시면 에피소드도 함께 삭제됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={onDelete} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
