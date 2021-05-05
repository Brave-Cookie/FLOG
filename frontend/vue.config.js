
// url중 '/api' 로 시작하는 url 앞에 기본적으로 3000포트 주소를 붙여줌.
module.exports = { 
    devServer: {
      proxy: { 
        '/api': { 
          target: 'http://localhost:3000/api',
          changeOrigin: true, 
          pathRewrite: { 
            '^/api': ''
          } 
        } 
      } 
    },
  }