import AdbIcon from "@mui/icons-material/Adb"
import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/useAuth"
import Colors from "../../ColorsModule/Colors.module.scss"
import { Routes } from "../../Router/Routes"
import "./NavigationBar.scss"

const NavigationBar = () => {
  const { dispatch } = useAuth()
  const pages = useMemo(
    () => [
      Routes.SliderLogo,
      Routes.ServicesCategories,
      Routes.Services,
      Routes.Projects,
      Routes.Contents
    ],
    []
  )
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const navigateTo = useCallback(
    (path: string) => () => {
      navigate(path)
      handleCloseNavMenu()
    },
    [navigate]
  )

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white" }}
      className="app-bar"
    >
      <div>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <div
            className="menu-items logo"
            onClick={navigateTo(Routes.Contents.path)}
          >
            <AdbIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: Colors.primary,
                cursor: "pointer"
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Roboto",
                // fontFamily: "Caesar Dressing",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: Colors.primary,
                textDecoration: "none"
              }}
            >
              ERGONISTOR
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: Colors.primary }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={navigateTo(page.path)}
                  className="menu-items"
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      color: Colors.secondary,
                      // fontFamily: "Caesar Dressing",
                      fontFamily: "Roboto"
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                key={"logout"}
                onClick={async () => {
                  await dispatch({
                    type: "LOGOUT"
                  })
                  navigateTo("/")
                }}
                className="menu-items"
              >
                <Typography
                  textAlign="center"
                  sx={{
                    color: "#ff0000",
                    fontFamily: "Roboto"
                  }}
                >
                  LOGOUT
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: Colors.primary,
              cursor: "pointer"
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Roboto",
              // fontFamily: "Caesar Dressing",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: Colors.primary,
              textDecoration: "none"
            }}
            onClick={navigateTo(Routes.Contents.path)}
          >
            ERGONISTOR
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around"
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={navigateTo(page.path)}
                sx={{
                  my: 2,
                  color: Colors.secondary,
                  display: "block",
                  fontSize: "24px",
                  fontFamily: "Roboto"
                  // fontFamily: "Caesar Dressing",
                }}
                className="menu-items"
              >
                {page.name}
              </Button>
            ))}
            <Button
              key={"logout"}
              onClick={async () => {
                await dispatch({
                  type: "LOGOUT"
                })
                navigateTo("/")
              }}
              sx={{
                my: 2,
                color: "#ff0000",
                display: "block",
                fontSize: "24px",
                fontFamily: "Roboto"
              }}
              className="menu-items"
            >
              LOGOUT
            </Button>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  )
}

export default NavigationBar
