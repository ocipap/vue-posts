var BASE_URL = "http://192.168.3.250:9998"

export default {
  BASE_URL,
  POSTS: BASE_URL + "/posts",
  POST_REPLY: BASE_URL + "/posts/${postIndex}/replies",
  POST_ONE: BASE_URL + '/posts/${postIndex}',
  SIGN_IN: BASE_URL + "/users/signIn",
  SIGN_UP: BASE_URL + "/users/signUp",
  USER_AUTH: BASE_URL + "/users/information",
  //FILES: BASE_URL + "/posts/${postIndex}/files/${fileIndex}"
}
