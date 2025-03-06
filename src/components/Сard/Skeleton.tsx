import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={450}
    viewBox="0 0 280 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="147" cy="96" r="90" />
    <rect x="-2" y="199" rx="10" ry="10" width="280" height="24" />
    <rect x="-2" y="244" rx="10" ry="10" width="280" height="84" />
    <rect x="3" y="352" rx="10" ry="10" width="90" height="27" />
    <rect x="119" y="337" rx="30" ry="30" width="151" height="44" />
  </ContentLoader>
);
