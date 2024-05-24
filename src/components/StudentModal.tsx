import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "./Button";
import { InputAdornment, TextField } from "@mui/material";
import { CiUser } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineTextsms } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addData, editData } from "../redux/student/actions";
import { format } from "date-fns";
import { FormData, studentModalProps } from "../types/TypeHelpers";
import { validateName, validateSubject } from "../helpers/utils";

export default function StudentModal({
  show,
  isEdit,
  editId,
  setEdit,
  editstatus,
}: studentModalProps) {
  const [open, setOpen] = useState(show || false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isMarksValid, setIsMarksValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (editstatus) {
      setEdit(false);
    }
    setOpen(false);
  };
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state?.studentData);
  const editableData: any =
    isEdit && data?.filter((item: any) => item?.id === editId);
  const [formData, setFormData] = useState<FormData>({
    name: (editableData && editableData[0]?.name) || "",
    subject: (editableData && editableData[0]?.subject) || "",
    marks: (editableData && editableData[0]?.marks) || 0,
    date: (editableData && editableData[0]?.date) || null,
  });

  useEffect(() => {
    if (isEdit && editableData && editableData.length > 0) {
      const { name, subject, marks, date } = editableData[0];
      setFormData({ name, subject, marks, date });
    }
  }, [isEdit]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "name") {
      const isValid = validateName(value);
      setIsNameValid(isValid);
      return;
    }
    if (id === "subject") {
      const isValidd = validateSubject(value);
      setIsSubjectValid(isValidd);
      return;
    } else {
      const marks = parseInt(value);
      const isValidd = marks >= 0 && marks <= 100;
      setIsMarksValid(isValidd);
    }
  };

  const handleDateChange = (date: Date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,
    }));
    setIsDateValid(date !== null);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      if (
        formData.name.trim() !== "" &&
        formData.subject.trim() !== "" &&
        formData.marks < 0 &&
        formData.marks > 100 &&
        formData.date !== null
      ) {
        createNewRecord();
      }
    }
  };

  const createNewRecord = () => {
    if (
      formData.name !== "" &&
      formData.subject !== "" &&
      formData.date !== null
    ) {
      const nameValid = validateName(formData.name);
      const subjectValid = validateSubject(formData.subject);
      const isValidd = formData.marks >= 0 && formData.marks <= 100;
      const dateValid = formData.date !== null;
      setIsNameValid(nameValid);
      setIsSubjectValid(subjectValid);
      setIsMarksValid(isValidd);
      setIsDateValid(dateValid);
      if (isNameValid && isSubjectValid && isMarksValid && dateValid) {
        // it is for edit data
        if (isEdit) {
          const formatedNewDate = format(formData?.date, "yyyy-MM-dd");
          const formatedOldDate = format(
            new Date(editableData[0]?.date),
            "yyyy-MM-dd"
          );

          if (formatedNewDate !== formatedOldDate) {
            dispatch(
              editData({
                id: editableData[0]?.id,
                ...formData,
                date: formatedNewDate,
              })
            );
            toast.success("record edited");
          } else {
            dispatch(editData({ id: editableData[0]?.id, ...formData }));
            toast.success("record edited");
          }
          setFormData({
            name: "",
            subject: "",
            marks: 0,
            date: new Date() || null,
          });
          setEdit(false);
          handleClose();
          window.location.reload();
          return;
        }
        //////////

        // Editing the data using add //

        // add Data
        else {
          const formatedDate = format(formData?.date, "yyyy-MM-dd");
          const newData = {
            ...formData,
            id: Date.now().toString(),
            date: formatedDate,
          };
          dispatch(addData(newData));
          toast.success("new record added");
          setFormData({
            name: "",
            subject: "",
            marks: 0,
            date: new Date() || null,
          });
          handleClose();
          window.location.reload();
        }
      } else {
        toast.error("check the record again");
      }
    } else {
      toast.error("check the record again");
    }
  };

  return (
    <div>
      {!isEdit && <Button handleClick={handleOpen} buttonText={"ADD"} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            outline: "none",
            p: 4,
            "@media screen and (max-width:767px)": {
              width: 280,
            },
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              color={"#333333"}
              variant="detailBold"
              sx={{ marginBottom: "4px" }}
            >
              Name
            </Typography>
            <TextField
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              error={!isNameValid}
              onKeyDown={handleKeyPress}
              helperText={
                !isNameValid ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <IoIosWarning style={{ color: "C61341" }} />
                    Enter a valid Name
                  </span>
                ) : (
                  ""
                )
              }
              sx={{
                marginBottom: "8px",
                ".MuiInputBase-input": {
                  color: "#333333",
                  paddingX: "8px",
                  paddingY: "8px",
                  fontSize: "14px",
                  fontWeight: "400",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #D2D2D0",
                },
                ".css-3j0wgu-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid #C61341",
                  },
                "& .css-5ifmys-MuiFormHelperText-root.Mui-error": {
                  color: "#181A20",
                },
                "& .css-5ifmys-MuiFormHelperText-root": {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CiUser
                      style={{
                        borderRight: "1px solid #D2D2D0",
                        paddingRight: "14px",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              color={"#333333"}
              variant="detailBold"
              sx={{ marginBottom: "4px" }}
            >
              Subject
            </Typography>
            <TextField
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
              variant="outlined"
              error={!isSubjectValid}
              onKeyDown={handleKeyPress}
              helperText={
                !isSubjectValid ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <IoIosWarning style={{ color: "C61341" }} />
                    Subject Doesnt Exist
                  </span>
                ) : (
                  ""
                )
              }
              sx={{
                marginBottom: "8px",
                ".MuiInputBase-input": {
                  color: "#333333",
                  paddingX: "8px",
                  paddingY: "8px",
                  fontSize: "14px",
                  fontWeight: "400",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #D2D2D0",
                },
                ".css-3j0wgu-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid #C61341",
                  },
                "& .css-5ifmys-MuiFormHelperText-root.Mui-error": {
                  color: "#181A20",
                },
                "& .css-5ifmys-MuiFormHelperText-root": {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineTextsms
                      style={{
                        borderRight: "1px solid #D2D2D0",
                        paddingRight: "14px",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              color={"#333333"}
              variant="detailBold"
              sx={{ marginBottom: "4px" }}
            >
              Mark
            </Typography>
            <TextField
              id="marks"
              value={formData.marks}
              onChange={handleInputChange}
              variant="outlined"
              type="Number"
              error={!isMarksValid}
              onKeyDown={handleKeyPress}
              helperText={
                !isMarksValid ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <IoIosWarning style={{ color: "C61341" }} />
                    Enter a valid Marks
                  </span>
                ) : (
                  ""
                )
              }
              sx={{
                marginBottom: "8px",
                ".MuiInputBase-input": {
                  color: "#333333",
                  paddingX: "8px",
                  paddingY: "8px",
                  fontSize: "14px",
                  fontWeight: "400",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #D2D2D0",
                },
                ".css-3j0wgu-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid #C61341",
                  },
                "& .css-5ifmys-MuiFormHelperText-root.Mui-error": {
                  color: "#181A20",
                },
                "& .css-5ifmys-MuiFormHelperText-root": {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CiBookmark
                      style={{
                        borderRight: "1px solid #D2D2D0",
                        paddingRight: "14px",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              color={"#333333"}
              variant="detailBold"
              sx={{ marginBottom: "4px" }}
            >
              Date
            </Typography>
            <input
              type="date"
              value={
                formData.date instanceof Date
                  ? formData.date.toISOString().split("T")[0]
                  : formData.date || ""
              }
              onChange={(e) => {
                handleDateChange(new Date(e.target.value));
              }}
              style={{
                border: "1px solid #D2D2D0",
                padding: "10px",
                borderRadius: "6px",
              }}
            />
            {!isDateValid ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <IoIosWarning style={{ color: "C61341" }} />
                Enter a valid Date
              </span>
            ) : (
              ""
            )}
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              handleClick={createNewRecord}
              buttonText={isEdit ? "EDIT" : "ADD"}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

// Editing the data using add
// const isAvailable = data.filter(
//   (item: any) => formData.name === item.name && formData.subject
// );
// if (isAvailable.length > 0) {
//   const newMarks = isAvailable[0]?.marks * 1 + formData.marks * 1;
//   console.log("tailweb", isAvailable[0]?.marks, formData.marks);
//   dispatch(
//     editData({ id: isAvailable[0]?.id, ...formData, marks: newMarks })
//   );
//   handleClose();
//   setFormData({
//     name: "",
//     subject: "",
//     marks: 0,
//     date: dayjs(),
//   });
//   return;
// }
