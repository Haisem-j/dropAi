import React from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import {
  DASHBOARD,
  LANDING_TAGLINE,
  PRODUCT_DESCRIPTION,
  SOCIAL_MEDIA_GENERATOR,
} from "../../navigation/constants";

const Home = () => {
  return (
    <main className="min-h-full bg-slate-100 ">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <Banner
          header="Good afternoon, Haisem 👋"
          subHeading=" Choose from one of the tools below and start creating content today!"
        />
        <div className="grid grid-cols-12 gap-6">
          <Card
            title="Product Description"
            subHeader="Generate accurate product descriptions that is sure to convert!"
            link={DASHBOARD + PRODUCT_DESCRIPTION}
          />
          <Card
            title="Landing Page Generator"
            subHeader="Generate the text that will be seen on the landing page!"
            link={DASHBOARD + LANDING_TAGLINE}
          />
          <Card
            title="Social Media Ad Generator"
            subHeader="Generate descriptions/text for your ad(Facebook, Instagram, TikTok)!"
            link={DASHBOARD + SOCIAL_MEDIA_GENERATOR}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
