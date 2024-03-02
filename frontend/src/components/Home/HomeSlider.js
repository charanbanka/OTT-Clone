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
    let resp = await getImagesByTypeApi({ type: "homeslider" });
    setImages(resp?.data || []);
  };
  useEffect(() => {
    getImages();
  }, []);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((item) => {
        return (
          <div style={{ height: "500px" }}>
            <img width="100%" src={getImageUrl(item.id)} height="500px" />
          </div>
        );
      })}
    </Slider>
  );
}
