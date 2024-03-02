import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getImageUrl,
  getImagesApi,
  getImagesByTypeApi,
} from "../services/image-services";

export default function HomeSlider() {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      let resp = await getImagesByTypeApi({ type: "homeslider" });
      setImages(resp?.data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="mx-auto w-full">
      {images.map((item) => {
        return <img width="100%" src={getImageUrl(item.id)} height="100%" />;
      })}
    </Slider>
  );
}
