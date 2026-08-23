import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Moses Cheruiyot - Software Developer",
  description = "Moses Cheruiyot - Software Developer specializing in Full Stack Web Applications based in Nairobi, Kenya.",
  image = "https://vision-to-versions.onrender.com/og-image.jpg",
  url = "https://vision-to-versions.onrender.com",
  keywords = "software developer, full stack, web applications, React, Node.js, Nairobi, Kenya",
  author = "Moses Cheruiyot"
}) => {
  const siteTitle = "Moses Cheruiyot - Software Developer";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;