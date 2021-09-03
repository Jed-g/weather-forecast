import React, { useEffect, useRef } from "react";
import { Sunrise } from "@styled-icons/feather/Sunrise";
import { Sunset } from "@styled-icons/feather/Sunset";
import { Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core";

function resizeFunction(canvas, canvasContainer, upscaleRes) {
  canvas.width = upscaleRes * canvasContainer.offsetWidth;
  canvas.height = canvas.width * 0.4;
  canvas.style.width = `${canvas.width / upscaleRes}px`;
  canvas.style.height = `${canvas.height / upscaleRes}px`;
}

function draw(canvas, sunriseUnix, sunsetUnix, currentTime, theme) {
  if (canvas) {
    const c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.lineCap = "round";
    c.lineWidth = canvas.width / 20;

    c.beginPath();
    c.arc(
      canvas.width / 2,
      (canvas.height * 23) / 24,
      canvas.width / 3,
      -Math.PI,
      0
    );
    c.strokeStyle =
      theme.palette.type === "dark"
        ? "rgba(255,255,255,0.2)"
        : "rgba(0,0,0,0.2)";
    c.stroke();

    const range = sunsetUnix - sunriseUnix;
    let percentOfDay = (currentTime - sunriseUnix) / range;
    percentOfDay = percentOfDay > 1 ? 1 : percentOfDay;

    c.lineWidth = canvas.width / 40;
    c.beginPath();
    percentOfDay > 1 / 90 &&
      c.arc(
        canvas.width / 2,
        (canvas.height * 23) / 24,
        canvas.width / 3,
        -Math.PI + Math.PI / 180,
        -Math.PI + Math.PI * percentOfDay - Math.PI / 180
      );

    const gradient = c.createLinearGradient(
      0,
      0,
      (Math.PI * canvas.width) / 3,
      0
    );
    gradient.addColorStop(0, "rgba(238,118,0, 0.8)");
    gradient.addColorStop(0.5, "rgba(255,244,79, 0.8)");
    gradient.addColorStop(1, "rgba(0,33,71, 0.8)");

    c.strokeStyle = gradient;
    c.stroke();
  }
}

function SunriseSunset({
  sunriseInUnix,
  sunsetInUnix,
  timezone_offset,
  currentTime,
}) {
  const canvasContainerRef = useRef();
  const canvasRef = useRef();
  const sunriseRef = useRef();
  const sunsetRef = useRef();

  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));
  const themePersist = useRef(theme);
  themePersist.current = theme;

  useEffect(() => {
    const upscaleRes = 2;
    resizeFunction(canvasRef.current, canvasContainerRef.current, upscaleRes);

    sunriseRef.current.style.width = canvasContainerRef.current.offsetWidth / 6;
    sunsetRef.current.style.width = canvasContainerRef.current.offsetWidth / 6;
  }, [breakpointMatches]);

  const rerender = useRef(true);

  function render() {
    draw(
      canvasRef.current,
      sunriseInUnix,
      sunsetInUnix,
      currentTime,
      themePersist.current
    );
    rerender.current && requestAnimationFrame(render);
  }

  useEffect(() => {
    render();
    return () => {
      rerender.current = false;
    };
  }, []);

  const dateSunrise = new Date((sunriseInUnix + timezone_offset) * 1000);
  const timeSunrise = dateSunrise.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
    timeZone: "UTC",
  });

  const dateSunset = new Date((sunsetInUnix + timezone_offset) * 1000);
  const timeSunset = dateSunset.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
    timeZone: "UTC",
  });

  return (
    <Paper
      variant="outlined"
      style={{
        padding: theme.spacing(1),
        width: breakpointMatches ? 137 : 150,
        height: breakpointMatches ? 110 : 120,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div ref={canvasContainerRef}>
        <canvas ref={canvasRef} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: breakpointMatches ? 0 : 2,
          }}
        >
          <Sunrise ref={sunriseRef} />
          <Typography>{timeSunrise}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: breakpointMatches ? 0 : 2,
          }}
        >
          <Sunset ref={sunsetRef} />
          <Typography>{timeSunset}</Typography>
        </div>
      </div>
    </Paper>
  );
}

export default SunriseSunset;
