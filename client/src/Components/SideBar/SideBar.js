import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Slide,
  Stack,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import {
  CaretCircleLeft,
  GoogleLogo,
  List,
  NotePencil,
  SignOut,
  Trash,
} from "@phosphor-icons/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteChatRoom, getAllChatRooms } from "../../actions/chatActions";
import { Popover, Spin, Tooltip } from "antd";
import { logOut } from "../../actions/userActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 0.5),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const SideBar = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { chatRooms, loading } = useSelector((state) => state.chatRooms);
  const { user } = useSelector((state) => state.user);
  const [deleteRoom, setDeleteRoom] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const { windows } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setResults(chatRooms?.toReversed());
  }, [chatRooms]);

  useEffect(() => {
    if (user) {
      dispatch(getAllChatRooms());
    } else {
      setResults([]);
    }
  }, [dispatch, user]);

  const handleDeleteRoom = (chatId) => {
    dispatch(deleteChatRoom(chatId));
    if (id && id === chatId) {
      navigate("/");
    } else {
      setResults(results.filter((el) => el._id !== chatId));
    }
    setOpen(false);
  };

  const logOutContent = (
    <Box width={"100%"}>
      <Button
        fullWidth
        startIcon={<SignOut weight="bold" />}
        sx={{
          color: "white",
          textAlign: "left",
          fontWeight: 600,
          fontSize: 12,
        }}
        onClick={() => setTimeout(() => dispatch(logOut(navigate)), 1000)}
      >
        Log Out
      </Button>
    </Box>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  return (
    <>
      <Box
        minWidth={260}
        width={260}
        sx={{
          display: "block",
          [theme.breakpoints.down("md")]: { display: "none" },
        }}
        height={"100vh"}
        borderRight={"1px solid rgba(255, 255, 255, 0.1)"}
        p={"16px 12px 6px"}
        bgcolor={"#31363F"}
      >
        <Stack
          height={"100%"}
          direction={"column"}
          justifyContent={"space-between"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={"10px 12px"}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#222831" },
            }}
            borderRadius={2}
            mb={"22px !important"}
            onClick={() => navigate("/")}
          >
            <Typography variant="h5" fontWeight={600}>
              Alfred
            </Typography>
            <NotePencil size={24} />
          </Stack>
          <Stack
            height={"100%"}
            direction={"column"}
            spacing={0.6}
            overflow={"scroll"}
          >
            {loading ? (
              <Stack height={"100%"} justifyContent={"center"} className="spin">
                <Spin size="small" />
              </Stack>
            ) : (
              results?.map((el) => (
                <Stack
                  component={"div"}
                  key={el._id}
                  className="nav_item"
                  direction={"row"}
                >
                  <NavLink
                    to={`/a/${el._id}`}
                    className={(e) => (e.isActive ? "active" : "")}
                  >
                    <Typography variant="h6" fontSize={16}>
                      {el.title.length > 20
                        ? `${el.title.slice(0, 20)}...`
                        : el.title}
                    </Typography>
                  </NavLink>
                  <Tooltip title="Delete" placement="right">
                    <Trash
                      size={22}
                      onClick={() => {
                        setOpen(true);
                        setDeleteRoom(el);
                      }}
                    />
                  </Tooltip>
                </Stack>
              ))
            )}
          </Stack>
          {user ? (
            <Popover
              content={logOutContent}
              trigger="click"
              arrow={false}
              style={{ backgroundColor: "ActiveCaption" }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1.6}
                mt={1}
                p={"8px 10px"}
                borderRadius={3}
                sx={{ cursor: "pointer", "&:hover": { bgcolor: "#222831" } }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user?.image}
                  sx={{ width: 32, height: 32 }}
                />
                <Typography variant="h6" fontSize={15}>
                  {user?.username}
                </Typography>
              </Stack>
            </Popover>
          ) : (
            <Stack
              mt={1}
              p={"8px 10px"}
              borderRadius={3}
              sx={{ cursor: "pointer", bgcolor: "#222831" }}
            >
              <Button
                sx={{ color: "white", fontWeight: 600 }}
                onClick={() =>
                  window.open(
                    "https://alfred-ai-server.onrender.com/api/v1/auth/google/callback",
                    "_self"
                  )
                }
                startIcon={<GoogleLogo size={32} weight="bold" />}
              >
                Login With Google{" "}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        position={"fixed"}
        zIndex={1}
        sx={{
          display: "none",
          [theme.breakpoints.down("md")]: { display: "flex" },
        }}
        alignItems={"center"}
        p={"6px 16px"}
        bgcolor={"#31363F"}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <List size={30} />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Alfred
        </Typography>
        <NotePencil
          size={30}
          cursor={"pointer"}
          onClick={() => navigate("/")}
        />
      </Stack>
      <nav>
        <Drawer
          container={container}
          anchor="left"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: "none",
            height: "100vh",
            [theme.breakpoints.down("md")]: { display: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              backgroundColor: "#31363F",
              borderRight: "1px solid rgba(255,255,255,0.1)",
              p: "0px 12px 6px",
            },
          }}
        >
          <Box height={"100%"} color={"white"} display={"block"}>
            <Stack
              height={"100%"}
              direction={"column"}
              justifyContent={"space-between"}
            >
              <Box component={"div"}>
                <DrawerHeader sx={{ justifyContent: "flex-end" }}>
                  <IconButton onClick={handleDrawerToggle} sx={{ ml: 0.5 }}>
                    <CaretCircleLeft size={32} color="white" />
                  </IconButton>
                </DrawerHeader>
                <Stack direction={"column"} spacing={0.6}>
                  {results?.map((el) => (
                    <Stack
                      component={"div"}
                      className="drawer_item"
                      key={el._id}
                      direction={"row"}
                      onClick={handleDrawerToggle}
                    >
                      <NavLink
                        to={`/a/${el._id}`}
                        className={(e) => (e.isActive ? "active" : "")}
                      >
                        <Typography variant="h6" fontSize={16}>
                          {el.title.length > 20
                            ? `${el.title.slice(0, 20)}...`
                            : el.title}
                        </Typography>
                        <Tooltip title="Delete" placement="right">
                          <Trash
                            size={22}
                            onClick={() => {
                              setOpen(true);
                              setDeleteRoom(el);
                            }}
                          />
                        </Tooltip>
                      </NavLink>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              {user ? (
                <Popover
                  content={logOutContent}
                  trigger="click"
                  arrow={false}
                  style={{ backgroundColor: "ActiveCaption" }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1.6}
                    mt={1}
                    p={"8px 10px"}
                    borderRadius={3}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#222831" },
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.image}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography variant="h6" fontSize={15}>
                      {user?.username}
                    </Typography>
                  </Stack>
                </Popover>
              ) : (
                <Stack
                  mt={1}
                  p={"8px 10px"}
                  borderRadius={3}
                  sx={{ cursor: "pointer", bgcolor: "#222831" }}
                >
                  <Button
                    sx={{ color: "white", fontWeight: 600 }}
                    onClick={() =>
                      window.open(
                        "https://alfred-ai-server.onrender.com/api/v1/auth/google/callback",
                        "_self"
                      )
                    }
                    startIcon={<GoogleLogo size={32} weight="bold" />}
                  >
                    Login With Google{" "}
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
        </Drawer>
      </nav>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <DialogTitle fontWeight={600} color={"white"}>
          {"Delete chat?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={18} color={"rgba(255,255,255,0.6)"}>
            This will delete{" "}
            <span style={{ fontWeight: 600, color: "white" }}>
              "{deleteRoom.title}"
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteRoom(deleteRoom._id)}
            sx={{ color: "red", fontWeight: 600 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SideBar;
