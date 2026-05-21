'use client';
import { useRef, useState, useEffect } from 'react';

interface CameraUIProps {
    onCapture: (base64Image: string) => void;
    isProcessing: boolean;
}

export default function CameraUI({ onCapture, isProcessing }: CameraUIProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        async function startCamera() {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(s);
                if (videoRef.current) videoRef.current.srcObject = s;
            } catch (err) {
                console.error("Camera error:", err);
            }
        }
        startCamera();
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    const capture = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const data = canvasRef.current.toDataURL('image/jpeg');
                onCapture(data);
            }
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-xl bg-black">
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button onClick={capture} disabled={isProcessing} className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg hover:bg-gray-200 disabled:opacity-50">
                    {isProcessing ? 'Verifying...' : 'Capture & Verify'}
                </button>
            </div>
        </div>
    );
}
