var BASE_URL = "http://192.168.1.22:9999"

export default {
  BASE_URL,
  POSTS: BASE_URL + "/posts",
  POST_REPLY: BASE_URL + "/posts/${postIndex}/replies",
  POST_ONE: BASE_URL + '/posts/${postIndex}',
  SINGIN: BASE_URL + "/users/signIn",
  SINGUP: BASE_URL + "/users/signUp",
  USER_AUTH: BASE_URL + "/users/information"
}
