import { CircularProgress } from "@mui/material"
import MuiButton from "@mui/material/Button"
import { useMemo } from "react"

export type ButtonType = "primary" | "secondary" | "tertiary"

export type ButtonProps = {
  label: string
  type?: ButtonType
  isLoading?: boolean
} & (
  | {
      onClick: () => void
      isSubmit?: never
    }
  | {
      onClick?: () => void
      isSubmit: boolean
    }
)
const Button = ({
  label,
  type = "primary",
  onClick,
  isSubmit = false,
  isLoading = false
}: ButtonProps) => {
  const variant = useMemo((): "text" | "contained" | "outlined" => {
    switch (type) {
      case "primary":
        return "contained"
      case "secondary":
        return "outlined"
      case "tertiary":
      default:
        return "text"
    }
  }, [type])

  return (
    <MuiButton
      variant={variant}
      sx={{ borderRadius: 6 }}
      onClick={onClick}
      type={isSubmit ? "submit" : undefined}
      className="w-fit"
      disabled={isLoading}
      startIcon={
        isLoading ? <CircularProgress className="!h-6 !w-6" /> : undefined
      }
    >
      {label}
    </MuiButton>
  )
}

export default Button
