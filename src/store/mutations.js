import CONSTANT from '../constant'

export default {
  [CONSTANT.SET_LOGIN_STATUS](state, payload) {
    state.isLogin = payload.isLogin
  },
  [CONSTANT.GET_USER_INFO](state, payload) {
    state.user = payload;
  },
  [CONSTANT.LOAD_POSTS](state, payload) {
    state.postLists = payload;
  },
  [CONSTANT.LOAD_POST_ONE](state, payload) {
    state.postOne = payload
  },
  [CONSTANT.LOAD_REPLYS](state, payload) {
    state.replyList = payload;
  },
  [CONSTANT.LOAD_REPLY_ONE](state, payload) {
    state.replyList = payload;
  }
}
