import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  SxProps,
  Theme
} from "@mui/material"
import TextFieldMui from "@mui/material/TextField"
import {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import useDebounce from "../../hooks/useDebounce/useDebounce"
import { onChangeType } from "../../types/types"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

export type TextFieldType = "email" | "password"

export type PasswordFieldType = "text" | "password"

export interface TextFieldProps {
  defaultValue?: string
  onChange: (data: onChangeType<string>) => void
  name: string
  hasError?: boolean
  errorMsg?: string
  helperMsg?: string
  label: string
  type?: TextFieldType
  debounceMs?: number
  value?: string
}
const TextField = ({
  value: propValue,
  defaultValue,
  onChange,
  name,
  errorMsg = "",
  hasError = false,
  helperMsg = "",
  label,
  type,
  debounceMs = 500
}: TextFieldProps) => {
  const [value, setValue] = useState<string>(propValue ?? defaultValue ?? "")
  const [passwordFieldType, setPasswordFieldType] =
    useState<PasswordFieldType>("password")

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  const { debouncedValue, flush } = useDebounce(value, debounceMs)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      flush()
    }
  }

  const handleClickShowPassword = useCallback(() => {
    setPasswordFieldType((prev) => (prev === "password" ? "text" : "password"))
  }, [setPasswordFieldType])

  const sx = useMemo(
    (): SxProps<Theme> => ({
      borderRadius: 6
    }),
    []
  )

  const slotProps = useMemo(
    () => ({
      input: {
        sx: {
          borderRadius: 6
        },
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {passwordFieldType !== "password" ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          ) : undefined
      }
    }),
    [handleClickShowPassword, type, passwordFieldType]
  )

  useEffect(() => {
    onChange({ name, value: debouncedValue })
  }, [debouncedValue])

  useEffect(() => {
    propValue !== undefined && propValue !== value && setValue(propValue)
  }, [propValue])

  return (
    <FormControl fullWidth sx={{ borderRadius: 6 }}>
      <TextFieldMui
        value={value}
        onChange={onChangeValue}
        fullWidth
        error={hasError}
        label={label}
        className="bg-white"
        slotProps={slotProps}
        sx={sx}
        type={type === "password" ? passwordFieldType : type}
        onBlur={flush}
        onKeyDown={handleKeyDown}
      />
      <FormHelperText error={hasError}>
        {hasError ? errorMsg : helperMsg}
      </FormHelperText>
    </FormControl>
  )
}

export default memo(TextField)
