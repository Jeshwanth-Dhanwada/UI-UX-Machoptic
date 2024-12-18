import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import DashboardDrawer from "../component/dashboardDrawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../component/profile";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MailIcon from "@mui/icons-material/Mail";
import { getJobAssign } from "../api/shovelDetails";
import { BASE_URL } from "../constants/apiConstants";
import axios from "axios";
import { toast } from "react-toastify";
import { HEADER_HEIGHT } from "../utils/constants";
import useAuth from "../hooks/useAuth";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppBarContainer = ({ selectedMenuItem, setDate }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [Completejobs, setcompleteJobs] = React.useState();
  const [Pendingjobs, setPendingJobs] = React.useState();
  const [Assignedjobs, setAssignedJobs] = React.useState();

  const [JobAssigndata, setJobAssigndata] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState();
  const [selectedItem, setselectedItem] = React.useState();

  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleCloseNavMenu = () => {
    setOpenDrawer(true);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const HandleDateFilter = (e) => {
    setDateFilter(e.target.value);
    setDate(e.target.value);
  };

  const HandleSetting = (selecteditem) => {
    setselectedItem(selecteditem);
    if (selecteditem === "Dashboard") {
      navigate("/showRoutes");
    }
    if (selecteditem === "Logout") {
      handleLogout();
    }
  };

  const handleLogout = async (event) => {
    // event.preventDefault();
    try {
      // Use async/await to wait for each request to complete
      const data = { userName: username, password: password };
      const response = await axios.post(`${BASE_URL}/api/auth/logout`, data, {
        withCredentials: true,
      });
      const { accessToken, designation, empId, empTypeId } = response?.data;
      setAuth({ username, accessToken, designation, empId, empTypeId });
      navigate("/");
      console.log(response);
    } catch (error) {
      toast.error(<span>{error.response.data.message}</span>);
      console.log("Error Logging in", error);
      return;
    }
    console.log(`Logged Out username: ${username} and password: ${password}`);
  };

  const HandleBoolean = (item) => {
    setselectedItem(item);
  };

  const showgetjobAssign = async (key) => {
    const responsedata = await getJobAssign();
    setJobAssigndata(responsedata, key);
  };

  React.useEffect(() => {
    showgetjobAssign();

    // Set the initial date to today
    const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD' format
    setDateFilter(today);
    setDate(today);
  }, []);

  React.useEffect(() => {
    const completejobs = JobAssigndata.filter(
      (item) => item.status === "Completed" && item.date == currentDate
    ).map((item) => item);

    const completedjobsLenght = completejobs?.length;
    setcompleteJobs(completedjobsLenght);
    const assignedjobs = JobAssigndata.filter(
      (item) => item.status === "Assigned" && item.date == currentDate
    ).map((item) => item);
    const assignedjobsLenght = assignedjobs.length;
    setAssignedJobs(assignedjobsLenght);
    const pendingjobs = JobAssigndata.filter(
      (item) => item.status === "In Progress" && item.date == currentDate
    ).map((item) => item);
    const pendingjobsLenght = pendingjobs.length;
    setPendingJobs(pendingjobsLenght);
  }, [JobAssigndata, currentDate]);

  return (
    <AppBar
      style={{
        position: "fixed",
        height: HEADER_HEIGHT,
        backgroundColor: "#fff",
      }}
    >
      <DashboardDrawer
        drawerOption="bottom"
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Machoptic Logo */}
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }} // Flexbox styles
          >
            <Link to="/" style={{ cursor: "pointer" }}>
              <Box
                component="img"
                sx={{
                  height: 40,
                  // width: 125,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  marginLeft: -1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                alt="logo."
                src="./Machoptic Final New Logo.png"
              />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              position: "relative",
              left: "1%",
              color: "#45ADFC",
            }}
          >
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                flexGrow: 1,
                fontWeight: 700,
                color: "#034661",
                textDecoration: "none",
                width: "80px",
              }}
            >
              {selectedMenuItem}
            </Typography>
          </Box>
          {/* <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              position: "relative",
              left: "23.5%",
              color: "#45ADFC",
            }}
          >
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                  >
                    New Jobs
                    <Badge badgeContent={Assignedjobs} color="secondary">
                      <MailIcon color="action" />
                    </Badge>
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                  >
                    Finished Jobs
                    <Badge
                      badgeContent={Completejobs}
                      color="secondary"
                      max={1000}
                    >
                      <MailIcon color="action" />
                    </Badge>
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                  >
                    <input
                      type="date"
                      className="form-control"
                      style={{ width: "", height: "30px", cursor: "pointer" }}
                      onChange={HandleDateFilter}
                      value={dateFilter}
                      disabled={
                        selectedMenuItem === "Administration" ||
                        selectedMenuItem === "Configuration" ||
                        selectedMenuItem ===
                          "Analytics - Machine Wise Report" ||
                        selectedMenuItem ===
                          "Analytics - Material Data Report" ||
                        selectedMenuItem === "Analytics - Job Status" ||
                        selectedMenuItem ===
                          "Analytics - Material Production Report" ||
                        selectedMenuItem === "Analytics - Gantt Charts" ||
                        selectedMenuItem === "Analytics - DrillDown Analysis" ||
                        selectedMenuItem === "Analytics - Priority Job" ||
                        selectedMenuItem ===
                          "Analytics - Sensitivity Analysis" ||
                        selectedMenuItem === null
                      }
                    />
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
          </Box> */}

          {/* Avatar and Username */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{auth?.userName || ""}</Typography>
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => HandleSetting(setting)}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {selectedItem === "Profile" && (
        <div
          style={{
            width: "500px",
            height: "300px",
            background: "whitesmoke",
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999, // Adjust the z-index as needed
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "5px",
              color: "red",
              fontSize: "xx-large",
            }}
          >
            &times;
          </div>
          <Profile onclickclose={HandleBoolean} />
        </div>
      )}
    </AppBar>
  );
};

export default AppBarContainer;
