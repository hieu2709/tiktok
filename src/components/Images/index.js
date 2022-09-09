import { useState, forwardRef } from "react";
import images from "~/assets/images";

const Image = forwardRef(({ src, alt, ...props }, ref) => {
  const [fallBack, setFallBack] = useState("");
  if (src === "https://files.fullstack.edu.vn/f8-tiktok/") {
    src = "";
  }
  const handleError = () => {
    setFallBack(images.noImage);
  };
  return (
    <img
      ref={ref}
      src={src || fallBack}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
});

export default Image;
