/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export"
    reactStrictMode: false,
};

export default nextConfig;

// module.exports = {
//     // другие настройки
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.scss$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'sass-loader',
//         ],
//       });
  
//       return config;
//     },
//   };