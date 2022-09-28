import React from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import {
  DASHBOARD,
  LANDING_TAGLINE,
  PRODUCT_BENEFITS_GENERATOR,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME_GENERATOR,
  SOCIAL_MEDIA_GENERATOR,
} from "../../navigation/constants";

const Home = () => {
  return (
    <main className="min-h-full bg-slate-100 ">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-slate-100">
        <Banner
          header="Dashboard"
          subHeading=" Choose from one of the tools below and start creating content today!"
        />
        <div className="grid grid-cols-12 gap-6">
          <Card
            title="Product Description"
            subHeader="Generate accurate product descriptions that is sure to convert!"
            link={PRODUCT_DESCRIPTION}
          />
          <Card
            title="Product Benefits"
            subHeader="Generate creative product benefits in a list format!"
            link={PRODUCT_BENEFITS_GENERATOR}
          />
          <Card
            title="Name Generator"
            subHeader="Generate trendy/unique names for you product!"
            link={PRODUCT_NAME_GENERATOR}
          />
          <Card
            title="Taglines Generator"
            subHeader="Generate interesting taglines to be shown throughout your website!"
            link={LANDING_TAGLINE}
          />
          <Card
            title="Social Media Ad Generator"
            subHeader="Generate descriptions/text for your ad(Facebook, Instagram, TikTok)!"
            link={SOCIAL_MEDIA_GENERATOR}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
