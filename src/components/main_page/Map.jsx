import React, { useEffect, useRef, useContext } from "react";
import { useTheme } from "@material-ui/core";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ApiKeysContext } from "../../App";

function rotateCamera(timestamp, offset, playAnimation, map, iteration) {
  if (iteration === 2) {
    offset = timestamp;
  }
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.current.rotateTo(((timestamp - offset) / 450) % 360, { duration: 0 });

  playAnimation.current &&
    requestAnimationFrame((timestamp) =>
      rotateCamera(timestamp, offset, playAnimation, map, iteration + 1)
    );
}

function Map({ coords }) {
  const theme = useTheme();
  const map = useRef();
  const locationMarker = useRef();

  const playAnimation = useRef(true);

  const API_KEY_MAPBOX = useContext(ApiKeysContext).API_KEY_MAPBOX;

  useEffect(() => {
    if (!map.current) {
      mapboxgl.accessToken = API_KEY_MAPBOX;

      map.current = new mapboxgl.Map({
        container: "map",
        style:
          theme.palette.type === "dark"
            ? "mapbox://styles/mapbox/dark-v10"
            : "mapbox://styles/mapbox/light-v10",
        center: [coords.lon, coords.lat],
        zoom: 10,
        pitch: 45,
        bearing: 0,
        attributionControl: false,
      });

      map.current.on("load", () => {
        // Start the animation.
        rotateCamera(0, 0, playAnimation, map, 1);
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        })
      );
    } else {
      map.current.setStyle(
        theme.palette.type === "dark"
          ? "mapbox://styles/mapbox/dark-v10"
          : "mapbox://styles/mapbox/light-v10"
      );
    }

    locationMarker.current?.remove();
    locationMarker.current = new mapboxgl.Marker({
      color: theme.palette.primary.main,
    })
      .setLngLat([coords.lon, coords.lat])
      .addTo(map.current);
  }, [theme]);

  useEffect(() => () => (playAnimation.current = false), []);

  return (
    <div
      id="map"
      style={{ width: "100vw", height: "70vh" }}
      onMouseDown={() => (playAnimation.current = false)}
    ></div>
  );
}

export default Map;
