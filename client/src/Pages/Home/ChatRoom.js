import {
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { askQuestion, getChats } from "../../actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../Components/SideBar/SideBar";
import ScrollToBottom from "react-scroll-to-bottom";
import { Spin } from "antd";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1920,
    },
  },
});

const ChatRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { chats, loading: chatLoad } = useSelector((state) => state.chats);
  const { loading } = useSelector((state) => state.askQuestion);
  const { user } = useSelector((state) => state.user);
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(chats);
  }, [chats]);

  const handleSearch = () => {
    if (question.trim() !== "" && !loading) {
      setResults((p) => [...p, { role: "user", parts: question }]);
      dispatch(askQuestion(question.trim(), id, setResults, user?._id));
      setQuestion("");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getChats(id));
    }
  }, [dispatch, id]);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        [theme.breakpoints.down("md")]: { flexDirection: "column" },
      }}
    >
      <SideBar />
      <Box
        component={"div"}
        width={"100%"}
        sx={{
          p: "1rem 3rem 0",
          [theme.breakpoints.down("md")]: { p: "3.3rem 1rem 0" },
        }}
        height={"100vh"}
      >
        <Stack direction={"column"} height={"100%"} pb={1.5}>
          {chatLoad ? (
            <Stack
              component={"div"}
              height={"100%"}
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              className="spin"
            >
              <Spin size="large" />
            </Stack>
          ) : (
            <ScrollToBottom className="scroll_bottom">
              {results?.map((el, index) => (
                <Box key={index}>
                  {el.role === "user" ? (
                    <Stack
                      p={"22px 16px"}
                      direction={"column"}
                      borderRadius={3}
                    >
                      <Typography variant="h6" fontSize={17} fontWeight={600}>
                        You :
                      </Typography>
                      <Typography variant="h6" fontSize={17} mt={0.5}>
                        {el.parts}
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack
                      p={"22px 16px"}
                      direction={"column"}
                      bgcolor={"#31363F"}
                      borderRadius={3}
                    >
                      <Typography variant="h6" fontSize={17} fontWeight={600}>
                        Alfred :
                      </Typography>
                      {el.parts.split(/[\n]/).map((el, index) => (
                        <Typography
                          key={index}
                          variant="h6"
                          fontSize={17}
                          mt={0.5}
                        >
                          {el}
                        </Typography>
                      ))}
                    </Stack>
                  )}
                </Box>
              ))}
              {loading && (
                <Box mt={1}>
                  <Stack
                    p={"22px 16px"}
                    direction={"column"}
                    bgcolor={"#31363F"}
                    borderRadius={3}
                  >
                    <Typography variant="h6" fontSize={17} fontWeight={600}>
                      Alfred :
                    </Typography>
                    <Typography variant={"h6"} fontSize={17} mt={0.5}>
                      <Skeleton
                        animation="wave"
                        height={35}
                        width={"90%"}
                        sx={{ bgcolor: "#222831" }}
                      />
                      <Skeleton
                        animation="wave"
                        height={35}
                        width={"80%"}
                        sx={{ bgcolor: "#222831" }}
                      />
                      <Skeleton
                        animation="wave"
                        height={35}
                        width={"70%"}
                        sx={{ bgcolor: "#222831" }}
                      />
                    </Typography>
                  </Stack>
                </Box>
              )}
            </ScrollToBottom>
          )}
          <Stack
            width={"100%"}
            direction={"row"}
            borderRadius={3}
            border={"1px solid rgba(255,255,255,0.4)"}
          >
            <TextField
              fullWidth
              onChange={(e) => setQuestion(e.target.value)}
              sx={{
                "& .MuiInputBase-input": { padding: "15px", color: "white" },
              }}
              type="text"
              placeholder="Message to Alfred..."
              value={question}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="outlined"
              onClick={handleSearch}
              sx={{
                border: "none",
                borderRadius: 3,
                "&:hover": { border: "none", background: "#31363F" },
              }}
            >
              {loading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <PaperPlaneRight size={30} color="rgba(255,255,255,0.6)" />
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChatRoom;
