import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MyCalendar from "./MyCalendar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function CalendarModal({ openCalendar, closeCalendar }: any) {
  const handleClose = () => {
    closeCalendar(false);
  };

  return (
    <div>
      <Modal
        open={openCalendar}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MyCalendar />
        </Box>
      </Modal>
    </div>
  );
}
