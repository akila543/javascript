var config = {
   entry: './js/main.js',

   output: {
      path:'./js/',
      publicPath: '/js/',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 8080
   },

   node: {
     fs: "empty",
     net: "empty",
     tls: "empty",
     dns: "empty"
  },

   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
               presets: ['es2015', 'react']
            }
         },
<<<<<<< HEAD
	 {
	    test: /\.css$/,
  	    loader: 'style!css?modules',
  	    include: /flexboxgrid/,
	 }
=======
         {
           test: /\.css$/,
           loader: 'style!css?modules',
           include: /flexboxgrid/
         }
>>>>>>> 0f4e5f2a026860cedb0b63b06c045f963a1f8e51
      ]
   },
   resolve:{
     extensions:['','.js','.jsx','/index.js','/index','/index.jsx']
   }
}

module.exports = config;
