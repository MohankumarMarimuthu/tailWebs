/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import StudentModal from "./StudentModal";
import { MdEdit } from "react-icons/md";

const colStartClasses: any = {
  0: "1",
  1: "2",
  2: "3",
  3: "4",
  4: "5",
  5: "6",
  6: "7",
};

const MyCalendar = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const { data: records } = useSelector((state: any) => state?.studentData);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const selectedDayMeetings = records.filter((item: any) =>
    isSameDay(parseISO(item.date), selectedDay)
  );

  const daysInWeek = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <>
      <Box sx={{ paddingTop: "16px" }}>
        <Box
          sx={{
            //   marginX: "auto",
            paddingX: "28px",
            maxWidth: "448px",
            "@media screen and (min-width:768px) and (max-width: 1024px)": {
              paddingX: "24px",
            },
            "@media screen and (min-width:1025px)": {
              paddingX: "16px",
              maxWidth: "896px",
            },
          }}
        >
          <Box
            sx={{
              "@media (min-width: 768px)": {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                "& > :not(:last-child)": {
                  borderRight: "1px solid",
                  borderColor: "gray.200",
                },
              },
            }}
          >
            <Box
              sx={{
                "@media screen and (min-width:768px)": {
                  paddingRight: "56px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    flex: "1 1 auto",
                    fontWeight: "600",
                    color: "rgba(17, 24, 39, 1)",
                  }}
                >
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </Typography>
                <Button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  sx={{
                    marginY: "-6px",
                    display: "flex",
                    flex: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    color: "rgba(156, 163, 175, 1)",
                    "&:hover": {
                      color: "rgba(107, 114, 128, 1)",
                    },
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: "1px",
                      height: "1px",
                      padding: 0,
                      margin: "-1px",
                      overflow: "hidden",
                      clip: "rect(0, 0, 0, 0)",
                      whiteSpace: "nowrap",
                      borderWidth: 0,
                    }}
                  >
                    Previous month
                  </span>
                  <MdChevronLeft
                    style={{ width: "20px", height: "20px" }}
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  onClick={nextMonth}
                  type="button"
                  sx={{
                    marginY: "-6px",
                    display: "flex",
                    flex: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    marginLeft: "8px",
                    marginRight: "-6px",
                    color: "rgba(156, 163, 175, 1)", // text-gray-400
                    "&:hover": {
                      color: "rgba(107, 114, 128, 1)", // hover:text-gray-500
                    },
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: "1px",
                      height: "1px",
                      padding: 0,
                      margin: "-1px",
                      overflow: "hidden",
                      clip: "rect(0, 0, 0, 0)",
                      whiteSpace: "nowrap",
                      borderWidth: 0,
                    }}
                  >
                    Next month
                  </span>
                  <MdChevronRight
                    style={{ width: "20px", height: "20px" }}
                    aria-hidden="true"
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  marginTop: "40px",
                  fontSize: "0.75rem",
                  lineHeight: "1.5",
                  textAlign: "center",
                  color: "black",
                }}
              >
                {daysInWeek.map((item, index) => (
                  <Typography key={index}>{item}</Typography>
                ))}
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  marginTop: "8px",
                  fontSize: "0.875rem",
                }}
              >
                {days.map((day, dayIdx) => (
                  <Box
                    key={day.toString()}
                    sx={{
                      paddingY: "6px",
                      ...(dayIdx === 0 && {
                        gridColumnStart: colStartClasses[getDay(day)],
                      }),
                    }}
                  >
                    <Button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      sx={{
                        color: isEqual(day, selectedDay)
                          ? ""
                          : isToday(day)
                          ? "red"
                          : !isSameMonth(day, firstDayCurrentMonth)
                          ? "#ccc"
                          : "#b8b2b2",
                        backgroundColor:
                          isEqual(day, selectedDay) && isToday(day)
                            ? "red.500"
                            : isEqual(day, selectedDay) && !isToday(day)
                            ? "gray.900"
                            : !isEqual(day, selectedDay)
                            ? "transparent"
                            : undefined,
                        "&:hover": {
                          backgroundColor: !isEqual(day, selectedDay)
                            ? "gray.200"
                            : undefined,
                        },
                        fontWeight:
                          isEqual(day, selectedDay) || isToday(day)
                            ? "bold"
                            : "normal",
                        mx: "auto",
                        flex: "none",
                        h: "32px",
                        w: "32px",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </Button>

                    <Box
                      sx={{
                        width: "4px",
                        height: "4px",
                        marginTop: "4px",
                        marginX: "auto",
                      }}
                    >
                      {records.some((item: any) =>
                        isSameDay(parseISO(item.date), day)
                      ) && (
                        <Box
                          sx={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            backgroundColor: "#ad160e",
                          }}
                        ></Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "48px",
                "@media screen and (min-width:768px)": {
                  marginTop: "0px",
                  paddingLeft: "56px",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "gray.200",
                }}
              >
                Schedule for{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMM dd, yyy")}
                </time>
              </Typography>
              <ol
                style={{
                  marginTop: "16px",
                  fontSize: "12px",
                  color: "#ccc",
                  padding: "0px",
                  lineHeight: "24px",
                }}
              >
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((item: any) => (
                    <Meeting meeting={item} key={item.id} />
                  ))
                ) : (
                  <Typography>No student records for today.</Typography>
                )}
              </ol>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

function Meeting({ meeting }: any) {
  const [edit, setEdit] = useState(false);
  const [fetchId, setFetchId] = useState();

  const handleEditing = (param: any) => {
    setFetchId(param);
    setEdit(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          gap: "16px",
          borderRadius: "16px",
          "&:focus-within": {
            backgroundColor: "rgba(243, 244, 246, 1)",
          },
          "&:hover": {
            backgroundColor: "rgba(243, 244, 246, 1)",
          },
          "&:nth-child(n+2)": {
            marginTop: "60px",
          },
        }}
      >
        <Avatar sx={{ bgcolor: "#45a1f7" }}>{meeting.name.charAt(0)}</Avatar>
        <Box sx={{ flex: "auto" }}>
          <Typography
            sx={{
              color: "rgba(17, 24, 39, 1)",
              fontSize: "20px",
            }}
          >
            Name : {meeting.name}
          </Typography>
          <Typography
            sx={{
              color: "rgba(17, 24, 39, 1)",
            }}
          >
            Sub: {meeting.subject}
          </Typography>
          <Typography
            sx={{
              color: "rgba(17, 24, 39, 1)",
            }}
          >
            Marks: {meeting.marks}
          </Typography>
          <Typography
            sx={{
              color: "rgba(17, 24, 39, 1)",
            }}
          >
            Date: {meeting.date}
          </Typography>
        </Box>
        <IconButton
          onClick={() => {
            handleEditing(meeting.id);
          }}
        >
          <MdEdit />
        </IconButton>
      </Box>
      {edit && (
        <StudentModal
          show={true}
          isEdit={true}
          editId={fetchId}
          setEdit={setEdit}
          editstatus={edit}
        />
      )}
    </>
  );
}

export default MyCalendar;
