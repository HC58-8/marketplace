import React from 'react';
import TextSlider from '../componentsHome/TextSlider';
import ImageCarousel from '../componentsHome/ImageCarousel';
import InfoGenerale from '../componentsHome/InfoGenerale';
import ProductShowercase from '../componentsHome/ProductShowercase';
import TitleWithLines from '../componentsHome/TitleWithLines';
import Links from '../componentsHome/Links';
import AnimatedBrand from '../componentsHome/AnimatedBrand'
import Footer  from '../componentsHome/Footer'
const Home = () => {
  return (
    <div className="  p-0 m-0" style={{ backgroundColor: 'white' }}>
  <TextSlider />

  <ImageCarousel></ImageCarousel>
  <InfoGenerale></InfoGenerale>
  <Links></Links> 
  <AnimatedBrand></AnimatedBrand>

  <TitleWithLines></TitleWithLines>
  <ProductShowercase></ProductShowercase>
  <Footer></Footer>
 
</div>

  );
};

export default Home;
