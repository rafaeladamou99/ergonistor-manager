import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { onChangeType } from "../../types/types"
import { useMemo } from "react"

export interface Option {
  value: string
  label: string
}

interface DropdownProps {
  name: string
  onChange: (data: onChangeType<Option>) => void
  options: Option[]
  value?: Option
  label: string
  errorMsg?: string
  hasError?: boolean
}

const Dropdown = ({
  name,
  onChange,
  options,
  value,
  label,
  errorMsg,
  hasError
}: DropdownProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedOption = options.find(
      (option) => option.value.toString() === event.target.value.toString()
    )
    selectedOption && onChange({ name, value: selectedOption })
  }

  const labelId = useMemo(
    () => `dropdown-label-${label.replace(" ", "").toLowerCase()}`,
    [label]
  )

  const dropdownId = useMemo(
    () => `dropdown-${label.replace(" ", "").toLowerCase()}`,
    [label]
  )
  return (
    <FormControl fullWidth sx={{ borderRadius: 6 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={dropdownId}
        value={value?.value}
        label={label}
        onChange={handleChange}
      >
        {options.map(({ label, value }) => (
          <MenuItem value={value}>{label}</MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText error={hasError}>{errorMsg}</FormHelperText>}
    </FormControl>
  )
}

export default Dropdown
