import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Check, FileCheck, RefreshCw } from 'lucide-react';
import { processImageFile } from '../services/imageUploadHelper';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  presets?: { label: string; img: string }[];
  helperText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'portrait',
  presets,
  helperText
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setErrorMsg(null);
    setIsProcessing(true);
    setUploadedFileName(file.name);
    try {
      const maxWidth = aspectRatio === 'landscape' ? 1200 : aspectRatio === 'square' ? 600 : 800;
      const maxHeight = aspectRatio === 'landscape' ? 700 : aspectRatio === 'square' ? 600 : 1050;
      const dataUrl = await processImageFile(file, maxWidth, maxHeight, 0.82);
      onChange(dataUrl);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to process image file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setUploadedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDataUrl = value?.startsWith('data:image/');

  return (
    <div className="space-y-2">
      {/* Label and mode switch */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#006B5B]" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              mode === 'upload' 
                ? 'bg-white text-[#006B5B] shadow-xs font-bold' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Upload from PC
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              mode === 'url' 
                ? 'bg-white text-[#006B5B] shadow-xs font-bold' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            URL
          </button>
        </div>
      </div>

      {/* Main Upload Zone */}
      {mode === 'upload' ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-3 sm:p-4 transition-all cursor-pointer flex flex-col sm:flex-row items-center gap-3 relative group ${
            isDragging 
              ? 'border-[#006B5B] bg-emerald-50/70 scale-[1.01]' 
              : 'border-neutral-300 hover:border-[#006B5B] bg-[#FAF7F0]/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Current Preview Thumbnail */}
          <div className={`shrink-0 rounded overflow-hidden bg-neutral-200 border border-neutral-300 relative shadow-inner flex items-center justify-center ${
            aspectRatio === 'landscape' ? 'w-24 h-14 sm:w-28 sm:h-16' : aspectRatio === 'square' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-14 h-18 sm:w-16 sm:h-20'
          }`}>
            {value ? (
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-bold">
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              </div>
            )}
          </div>

          {/* Action text */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-[#006B5B]">
              <Upload className="w-4 h-4 shrink-0" />
              <span>{value ? 'Click or drag to replace photo from PC' : 'Click to select photo from PC / Computer'}</span>
            </div>
            {uploadedFileName ? (
              <p className="text-[11px] text-emerald-800 font-medium flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                <FileCheck className="w-3 h-3 text-[#006B5B]" />
                <span className="truncate">{uploadedFileName}</span>
                {isDataUrl && <span className="text-[10px] text-neutral-400">(Auto-optimized)</span>}
              </p>
            ) : (
              <p className="text-[11px] text-neutral-500 mt-0.5">
                JPEG, PNG, WebP supported. Direct upload stored in Firebase.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              className="px-3 py-1.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-[11px] font-bold rounded uppercase tracking-wider shadow-xs pointer-events-none"
            >
              Browse PC
            </button>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Direct URL input fallback */
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <LinkIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-3" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... or /src/assets/..."
              className="w-full pl-8 pr-2.5 py-2 text-xs border border-neutral-300 rounded font-mono bg-white focus:outline-none focus:border-[#006B5B]"
            />
          </div>
          {value && (
            <div className="w-10 h-10 rounded border bg-neutral-100 overflow-hidden shrink-0 shadow-inner relative">
              <img src={value} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-0 right-0 bg-black/60 text-white p-0.5 rounded-bl hover:bg-rose-600"
                title="Clear"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error notification */}
      {errorMsg && (
        <div className="text-[11px] text-rose-600 bg-rose-50 p-1.5 rounded border border-rose-200">
          {errorMsg}
        </div>
      )}

      {/* Preset options if provided */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold mr-1">
            Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                onChange(preset.img);
                setUploadedFileName(preset.label);
              }}
              className={`px-2 py-0.5 text-[10px] rounded border transition-colors flex items-center gap-1 ${
                value === preset.img
                  ? 'bg-[#006B5B] text-white border-[#006B5B] font-bold'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border-neutral-200'
              }`}
            >
              {value === preset.img && <Check className="w-2.5 h-2.5" />}
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      )}

      {helperText && (
        <span className="text-[10px] text-neutral-500 block leading-tight">
          {helperText}
        </span>
      )}
    </div>
  );
};
