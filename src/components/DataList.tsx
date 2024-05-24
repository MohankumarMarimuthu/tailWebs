import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../redux/student/actions";
import toast from "react-hot-toast";
import StudentModal from "./StudentModal";
import { listDataItems } from "../types/TypeHelpers";

export default function BasicTable() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fetchId, setFetchId] = useState("");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = useSelector((state: any) => state?.studentData);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setFetchId(event.currentTarget.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRecord = (id: string) => {
    toast.success("one record deleted");
    dispatch(deleteData(id));
  };

  const handleEditRecord = (id: string) => {
    setEdit(true);
    console.log("check", id);
  };

  return (
    <Box
    // sx={{ overflowY: "scroll", minHeight: "450px", maxHeight: "600px" }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            margin: "20px",
            maxWidth: 1300,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ color: "#aba7a7", fontSize: "20px", fontWeight: 600 }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ color: "#aba7a7", fontSize: "20px", fontWeight: 600 }}
                align="left"
              >
                Subject
              </TableCell>
              <TableCell
                sx={{ color: "#aba7a7", fontSize: "20px", fontWeight: 600 }}
                align="left"
              >
                Mark
              </TableCell>
              <TableCell
                sx={{ color: "#aba7a7", fontSize: "20px", fontWeight: 600 }}
                align="left"
              >
                Date
              </TableCell>
              <TableCell
                sx={{ color: "#aba7a7", fontSize: "20px", fontWeight: 600 }}
                align="left"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                ?.filter((item: listDataItems) => item !== null)
                .map((row: listDataItems) => (
                  <TableRow
                    key={row?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <Avatar sx={{ bgcolor: "#45a1f7" }}>
                          {row?.name?.charAt(0)}
                        </Avatar>
                        <span>{row?.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row?.subject}</TableCell>
                    <TableCell align="left">{row?.marks}</TableCell>
                    <TableCell align="left">{row?.date}</TableCell>
                    <TableCell align="left">
                      <Tooltip title="Account settings">
                        <IconButton
                          onClick={handleClick}
                          id={row?.id}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <Avatar
                            sx={{ width: 32, height: 32, bgcolor: "#000000" }}
                          >
                            <BiSolidDownArrow color="white" />
                          </Avatar>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleEditRecord(fetchId);
          }}
        >
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleDeleteRecord(fetchId);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {edit &&
        (console.log("Edit mode"),
        (
          <StudentModal
            show={true}
            isEdit={true}
            editId={fetchId}
            setEdit={setEdit}
            editstatus={edit}
          />
        ))}
    </Box>
  );
}
