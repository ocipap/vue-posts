var BASE_URL = "http://192.168.1.20:9999"

export default {
  BASE_URL,
  POSTS: BASE_URL + "/posts",
  POST_REPLY: BASE_URL + "/posts/${postIndex}/replies",
  POST_ONE: BASE_URL + '/posts/${postIndex}',
  SING_IN: BASE_URL + "/users/signIn",
  SING_UP: BASE_URL + "/users/signUp",
  USER_AUTH: BASE_URL + "/users/information"
}
