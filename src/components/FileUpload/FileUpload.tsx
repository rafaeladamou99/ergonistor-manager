import { FormControl, FormHelperText, SxProps, Theme } from "@mui/material"
import TextFieldMui from "@mui/material/TextField"
import { memo, useEffect, useMemo, useState } from "react"
import { onChangeType } from "../../types/types"
import { Buffer as BufferPackage } from "buffer"

export type FileType =
  | undefined
  | {
      name: string
      buffer: number[]
    }

export interface FileUploadProps {
  onChange: (data: onChangeType<FileType>) => void
  name: string
  hasError?: boolean
  errorMsg?: string
  helperMsg?: string
  label: string
  value?: FileType | string
}
const FileUpload = ({
  value,
  onChange,
  name,
  errorMsg = "",
  hasError = false,
  helperMsg = "",
  label
}: FileUploadProps) => {
  const [file, setFile] = useState<File>()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const _file = e.target.files?.[0]

    _file && setFile(_file)

    if (!_file) {
      onChange({
        name,
        value: undefined
      })
      return
    }

    try {
      const fileReader = new FileReader()
      fileReader.onload = async () => {
        const arrayBuffer = fileReader.result as ArrayBuffer
        const buffer = BufferPackage.from(arrayBuffer)
        const arrayFromBuffer = Array.from(buffer)
        const fileName = _file.name
        _file &&
          onChange({
            name,
            value: {
              name: fileName,
              buffer: arrayFromBuffer
            }
          })
      }
      fileReader.readAsArrayBuffer(_file)
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload file")
    }
  }

  const sx = useMemo(
    (): SxProps<Theme> => ({
      borderRadius: 6
    }),
    []
  )

  const slotProps = useMemo(
    () => ({
      inputLabel: {
        shrink: true
      }
    }),
    []
  )

  return (
    <FormControl fullWidth sx={{ borderRadius: 6 }}>
      {typeof value === "string" && value ? (
        <img src={value} className="w-full" />
      ) : (
        <TextFieldMui
          // value={file ?? defaultValue}
          onChange={handleFileChange}
          fullWidth
          error={hasError}
          label={label}
          className="bg-white"
          sx={sx}
          type="file"
          slotProps={slotProps}
        />
      )}
      <FormHelperText error={hasError}>
        {hasError ? errorMsg : helperMsg}
      </FormHelperText>
    </FormControl>
  )
}

export default memo(FileUpload)
