import axios from 'axios'

if (process.env.NODE_ENV == 'devlopment') {
    axios.defaults.baseURL='http://118.178.184.69:8887/'
}

export default {
    get (url, params) {
        return new Promise((resolve, reject) => {
          axios.get(url, {
            params: params
          }).then(res => {
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      },
      /**
       * post方法，对应post请求
       * @param {String} url [请求的url地址]
       * @param {Object} params [请求时携带的参数]
       */
      post (url, params) {
        return new Promise((resolve, reject) => {
          axios.post(url, params)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      /**
       * postFormData方法，对应post请求，用来提交文件+数据
       * @param {String} url [请求的url地址]
       * @param {Object} params [请求时携带的参数]
       */
      postFormData (url, params) {
        return new Promise((resolve, reject) => {
          axios({
            headers: {
              'Content-Type': 'multipart/form-data'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
            },
            transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
              const formData = new FormData()
              Object.keys(data).forEach(key => {
                formData.append(key, data[key])
              })
              return formData
            }],
            url,
            method: 'post',
            data: params
          }).then(res => {
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      }
}