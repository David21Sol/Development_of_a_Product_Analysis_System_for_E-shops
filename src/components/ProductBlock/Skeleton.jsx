import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
    <ContentLoader 
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="57" y="27" rx="13" ry="13" width="170" height="230" /> 
    <rect x="5" y="265" rx="13" ry="13" width="274" height="47" /> 
    <rect x="71" y="334" rx="13" ry="13" width="156" height="20" /> 
    <rect x="71" y="362" rx="13" ry="13" width="156" height="20" /> 
    <rect x="1" y="401" rx="13" ry="13" width="75" height="38" /> 
    <rect x="155" y="397" rx="13" ry="13" width="125" height="42" />
  </ContentLoader>
)


export default Skeleton;