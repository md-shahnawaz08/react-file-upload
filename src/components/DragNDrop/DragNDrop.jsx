import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './DragNDrop.css'


export default function DragNDrop() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(files => [...files, ...acceptedFiles.map(file => ({
      name: file.name,
      size: file.size
    }))])

    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
 
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  
  return (
    <div>
      <div {...getRootProps()} className='drag-box'>
          <input {...getInputProps()} />
          {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag n' drop some files here, or click to select files</p>
          }
      </div>
      <ul>
        {
          files.map((file, i) =>
            <li key={i}>{ file.name} - { file.size } bytes</li>
          )
        }
      </ul>
    </div>
  )
}
