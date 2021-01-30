import React, { useEffect, useRef, useState } from "react";
import { CardMedia } from "@material-ui/core";
import SearchImageFullRes from "./search_image.jpg";
import SearchImageLowRes from "./search_image_low_res.jpg";

function SearchImage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullResCardMedia = useRef();

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = SearchImageFullRes;
  }, []);

  useEffect(() => {
    if (fullResCardMedia.current) {
      fullResCardMedia.current.style.filter = "";
    }
  }, [imageLoaded]);

  return !imageLoaded ? (
    <CardMedia
      style={{ filter: "blur(4px)" }}
      height={200}
      image={SearchImageLowRes}
      component="img"
      alt="Nature Image"
    />
  ) : (
    <CardMedia
      ref={fullResCardMedia}
      style={{ transition: "filter 1500ms ease-in-out", filter: "blur(4px)" }}
      height={200}
      image={SearchImageFullRes}
      component="img"
      alt="Nature Image"
    />
  );
}

export default SearchImage;
