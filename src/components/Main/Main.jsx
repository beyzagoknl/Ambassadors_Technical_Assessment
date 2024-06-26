import React from "react";

function Main({ classes, handleVideoRef, handleCanvasRef, handleCapture }) {
  return (
    <section className={classes.Main}>
      <video ref={handleVideoRef} />
      <canvas
        ref={handleCanvasRef}
        width={2}
        height={2}
        onClick={handleCapture}
      />
    </section>
  );
}

export default Main;
