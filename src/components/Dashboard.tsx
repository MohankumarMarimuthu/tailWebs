import { Box } from "@mui/material";
import DataList from "../components/DataList";
import StudentModal from "../components/StudentModal";
import Button from "./Button";
import CalendarModal from "./CalendarModal";
import { useState } from "react";

const Dashboard = () => {
  const [isCalendarOpen, SetCalendarOpen] = useState(false);

  const handleCalendarClick = () => {
    SetCalendarOpen(true);
  };

  return (
    <Box>
      <Box
        bgcolor={"#ccc9c2"}
        minHeight={"90vh"}
        height={"100%"}
        // maxHeight={"300vh"}
        paddingY={"32px"}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 20px",
            "@media screen and (max-width:767px)": {
              width: "90%",
              overflowX: "scroll",
            },
            "@media screen and (min-width:768px)": {
              margin: "0 auto",
              width: "90%",
            },
            "@media screen and (min-width:1440px)": {
              maxWidth: "1340px",
            },
          }}
        >
          <Button
            handleClick={handleCalendarClick}
            buttonText={"View Calendar"}
          />
          <DataList />
          <StudentModal />
          <CalendarModal
            openCalendar={isCalendarOpen}
            closeCalendar={SetCalendarOpen}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
