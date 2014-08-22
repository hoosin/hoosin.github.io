var airpubConfigs = {
  // blog name
  name: '给力的Airpub',
  // just a little description
  description: '轻如蝉翼的写作工具',
  // blog uri
  url: 'http://hoosin.github.io/airpub',
  // blog theme
  // theme: 'my-theme',
  // for images upload
  upyun: {
    bucket: 'hoosin',
    uri: 'http://{{hoosin}}.b0.upaiyun.com',
    endpoint: 'http://v0.api.upyun.com/{{bucketName}}',
    form_api_secret: 'xxxxxx'
  }
}

// for backend service
var duoshuoQuery = {
  short_name: '{{hoosin}}'
};
