import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

// Convert bytes to a human readable string (KB, MB, GB)
const formatFileSize = (bytes: number): string => {
  if (!bytes && bytes !== 0) return ''
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(2)} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(2)} MB`
  const gb = mb / 1024
  return `${gb.toFixed(2)} GB`
}

const UploadFile = ({onFileSelect}) => {
      const onDrop = useCallback((acceptedFiles: File[]) => {
        // pick first file; Dropzone will enforce file constraints
        const file = acceptedFiles[0] || null;
        onFileSelect(file);
        // currently we only display the selected file locally via acceptedFiles from useDropzone
        // If you need to lift the file up, pass a prop like onFileSelect and wire it here.
      }, [onFileSelect])
  const {getRootProps, getInputProps, isDragActive , acceptedFiles} = useDropzone({
    onDrop,
    multiple: false,
    accept: {'application/pdf': ['.pdf']},
    maxSize: 20 * 1024 * 1024, // 20 MB
})
  const file = acceptedFiles[0] || null;
  return (
    <div className='w-full gradient-border'>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='space-y-4 cursor-pointer '>
        
    {file ? (
    <div className='flex uploader-file-select' onClick={(e) => e.stopPropagation()}>
        <img src="/images/pdf.png" className='size-10' alt="pdf" />
      <div className='flex items-center space-x-3 text-center'>
        <p className='font-semibold'>{file.name}</p>
        <p className='text-sm text-gray-500'>{formatFileSize(file.size)}</p>
      </div>
      <button className='cursor-pointer p-2' onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onFileSelect(null);
      }}>
        <img src="/icons/cross.svg" alt="close Icon" className='w-6 h-6'/>
      </button>
    </div>
    ) : (
            <div>
                <div className='mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full'>
            <img src="/icons/info.svg" alt="Upload Icon" className='w-8 h-8'/>
        </div>
                <p className='text-lg text-gray-500'>
                    <span className='font-semibold'>Click to Upload</span>
                    , or drag and drop your resume here
                </p>
                <p className='text-lg text-gray-400'>Supported format: PDF. Max size: 20MB</p>
                
            </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default UploadFile