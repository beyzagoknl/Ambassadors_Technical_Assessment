import { useCallback, useEffect, useRef, useState } from "react";

export const useWebcamCapture = (stickers, title) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [picture, setPicture] = useState();
  const [selectedSticker, setSelectedSticker] = useState(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Couldn't start webcam: ", err);
      }
    };
    startWebcam();
  }, []);

  // Render döngüsünü ayarlama
  useEffect(() => {
    const renderFrame = () => {
      if (!canvasRef.current || !videoRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (
        selectedSticker?.img?.complete &&
        selectedSticker.img.naturalHeight !== 0
      ) {
        const { x, y } = mousePos.current;
        ctx.drawImage(selectedSticker.img, x - 50, y - 50, 100, 100);
      }
      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  }, [selectedSticker]);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      mousePos.current = { x: ev.clientX, y: ev.clientY };
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const onCapture = useCallback(() => {
    if (canvasRef.current) {
      const data = canvasRef.current.toDataURL("image/png");
      setPicture({ dataUri: data, title });
    }
  }, [canvasRef, title]);

  return { videoRef, canvasRef, onCapture, picture, setSelectedSticker };
};
