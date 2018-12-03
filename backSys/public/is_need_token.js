var is_need_token=function (url,method) {

  //无需token验证的接口
  let not_token_url=[
    {"url":"/api/loginS","method":"POST"},
    {"url":"/api/loginT","method":"POST"},
    {"url":"/api/loginM","method":"POST"}
  ]

  for(let i=0;i<not_token_url.length;i++){
    if(url==not_token_url[i].url&&method==not_token_url[i].method){
      return false;
    }
  }
  return true;

}

module.exports=is_need_token;