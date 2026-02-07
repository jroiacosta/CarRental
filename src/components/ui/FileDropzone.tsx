import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../common/utils";

interface FileDropzoneProps {
    onFileSelect?: (file: File | null) => void;
    onFilesSelect?: (files: File[]) => void;
    label?: string;
    accept?: Record<string, string[]>;
    maxSize?: number; // in bytes
    multiple?: boolean;
    showPreview?: boolean;
}

export function FileDropzone({
    onFileSelect,
    onFilesSelect,
    label = "Upload File",
    accept = {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
        'application/pdf': ['.pdf']
    },
    maxSize = 10 * 1024 * 1024, // 10MB default
    multiple = false,
    showPreview = true
}: FileDropzoneProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    // Remove unused uploadComplete
    // const [uploadComplete, setUploadComplete] = useState(false);

    // Cleanup previews to avoid memory leaks
    useEffect(() => {
        return () => {
            // Only cleanup on unmount - specific removes are handled in removeFile
            previews.forEach(url => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setUploading(true);
            setProgress(0);

            // Simulate upload progress
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setUploading(false);
                        // setUploadComplete(true);

                        if (multiple) {
                            const newFiles = [...files, ...acceptedFiles];
                            setFiles(newFiles);

                            const newPreviews = acceptedFiles.map(f =>
                                f.type.startsWith('image/') ? URL.createObjectURL(f) : ""
                            );

                            setPreviews(prevPrevs => [...prevPrevs, ...newPreviews]);
                            onFilesSelect?.(newFiles);
                        } else {
                            const selectedFile = acceptedFiles[0];
                            if (selectedFile) {
                                // Revoke old single preview if it exists
                                if (previews[0]) URL.revokeObjectURL(previews[0]);

                                setFiles([selectedFile]);
                                const previewUrl = selectedFile.type.startsWith('image/') ? URL.createObjectURL(selectedFile) : "";
                                setPreviews([previewUrl]);
                                onFileSelect?.(selectedFile);
                            }
                        }

                        return 100;
                    }
                    return prev + 10;
                });
            }, 100);
        }
    }, [onFileSelect, onFilesSelect, multiple, files]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept,
        maxSize,
        multiple
    });

    const removeFile = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        if (multiple) {
            const newFiles = files.filter((_, i) => i !== index);
            setFiles(newFiles);

            // Revoke url for the removed preview
            if (previews[index]) {
                URL.revokeObjectURL(previews[index]);
            }
            const newPreviews = previews.filter((_, i) => i !== index);
            setPreviews(newPreviews);

            onFilesSelect?.(newFiles);
        } else {
            setFiles([]);
            setPreviews([]);
            // setUploadComplete(false);
            setProgress(0);
            onFileSelect?.(null);
        }
    };

    return (
        <div className="w-full">
            {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">{label}</label>}

            <div
                {...getRootProps()}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ease-in-out cursor-pointer group min-h-[160px] flex flex-col items-center justify-center overflow-hidden",
                    isDragActive ? "border-red-500 bg-red-500/10" : "border-slate-700 bg-slate-950/50 hover:border-slate-500 hover:bg-slate-900",
                    isDragReject && "border-red-500 bg-red-900/20",
                    files.length > 0 && !uploading && "border-solid border-slate-700 bg-slate-950"
                )}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="popLayout">
                    {files.length === 0 && !uploading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center text-center space-y-3"
                        >
                            <div className={cn(
                                "p-3 rounded-full bg-slate-800 transition-colors group-hover:bg-slate-700",
                                isDragActive && "bg-red-500/20 text-red-500"
                            )}>
                                <Upload size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-300">
                                    {isDragActive ? "Drop files here" : multiple ? "Click to upload multiple files" : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-xs text-slate-500">
                                    PDF, PNG, JPG, or SVG (max. 10MB)
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {uploading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-[200px] flex flex-col items-center space-y-3"
                        >
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-red-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs font-medium text-slate-400 animate-pulse">Uploading... {progress}%</p>
                        </motion.div>
                    )}

                    {!uploading && showPreview && files.length > 0 && (
                        <div className={cn(
                            "w-full grid gap-4",
                            multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"
                        )}>
                            {files.map((file, idx) => (
                                <motion.div
                                    key={`${file.name}-${idx}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative group/item"
                                    onClick={(e) => e.stopPropagation()} // Prevent opening dropzone when clicking preview
                                >
                                    {previews[idx] ? (
                                        <div className="aspect-square rounded-lg overflow-hidden relative shadow-md border border-slate-700">
                                            <img src={previews[idx]} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="aspect-square rounded-lg bg-slate-900/80 border border-white/10 flex flex-col items-center justify-center p-4 text-center group-hover/item:border-red-500/50 transition-colors">
                                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-3 shadow-inner">
                                                <File size={24} className={cn("text-slate-400", file.type === 'application/pdf' && "text-red-400")} />
                                            </div>
                                            <p className="text-xs text-white font-bold truncate w-full mb-1">{file.name}</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={(e) => removeFile(e, idx)}
                                        className="absolute top-1 right-1 p-1.5 bg-slate-900/90 hover:bg-red-500 border border-white/10 hover:border-red-500 text-slate-300 hover:text-white rounded-full shadow-lg transition-all hover:scale-110 z-10"
                                        aria-label="Remove file"
                                    >
                                        <X size={12} />
                                    </button>
                                    <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1 shadow-lg pointer-events-none z-10 animate-in zoom-in duration-300">
                                        <CheckCircle size={14} />
                                    </div>
                                </motion.div>
                            ))}
                            {multiple && (
                                <div className="aspect-square rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/30 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-slate-500 transition-colors">
                                    <Upload size={20} />
                                    <span className="text-xs mt-1">Add More</span>
                                </div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
