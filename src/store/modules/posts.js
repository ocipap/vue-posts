import constant from '../../constant'
import CONFIG from '../../config'
import router from '@/router'

const state = {
  postLists: [],
  postOne: {},
  replyList: []
}

const getters = {
  postLists: state => state.postLists,
  postOne: state => state.postOne,
  replyList: state => state.replyList
}

const mutations = {
  [constant.LOAD_POSTS](state, payload) {
    state.postLists = payload;
  },
  [constant.LOAD_POST_ONE](state, payload) {
    state.postOne = payload
  },
  [constant.LOAD_REPLYS](state, payload) {
    state.replyList = payload;
  },
  [constant.LOAD_REPLY_ONE](state, payload) {
    state.replyList = payload;
  }
}

const actions = {
  [constant.LOAD_POSTS](store, payload) {
    this._vm.$http.get(CONFIG.POSTS).then(res => {
      if (res.status === 200) {
        store.commit(constant.LOAD_POSTS, res.data);
      }
    }).catch(err => {
      alert("정보를 받아오던 중 오류가 발생했습니다.");
    })
  },
  [constant.LOAD_POST_ONE](store, payload) {
    let jwt= this._vm.$cookie.getCookie("infranics");
    let postIndex = payload.postIndex;
    this._vm.$http.get(CONFIG.POST_ONE.replace("${postIndex}", postIndex),{
      headers: {
        "infranics": jwt
      }
    }).then(res => {
      if (res.status === 200) {
        store.commit(constant.LOAD_POST_ONE, res.data);
        store.commit(constant.LOAD_REPLYS, res.data.replies);
      }
    }).catch(err => {
      alert("정보를 받아오던 중 오류가 발생했습니다.");
    })
  },
  [constant.WRITE_REPLY](store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    let postIndex = payload.postIndex;
    let reply = JSON.stringify(payload);
    console.log(reply);
    this._vm.$http.post(CONFIG.POST_REPLY.replace("${postIndex}", postIndex), reply, {
      headers: {
        'Content-Type': 'application/json',
        "infranics": jwt
      }
    }).then(res => {
      if (res.status === 200) {
        alert("댓글 작성에 성공하였습니다.")
        store.dispatch(constant.LOAD_POST_ONE, {
          postIndex
        });
        router.push({
          name: 'View',
          params: {
            id: postIndex
          }
        });
      }
    }).catch(err => {
      alert("댓글 작성 중 오류가 발생했습니다.");
    })
  },
  [constant.WRITE_POST](store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    let post = JSON.stringify(payload);
    this._vm.$http.post(CONFIG.POSTS, post, {
      headers: {
        'Content-Type': 'application/json',
        "infranics": jwt
      }
    }).then(res => {
      if (res.status === 200) {
        alert("게시물 작성에 성공하였습니다.");
        console.log(res);
        router.push({
          name: 'Board'
        });
      }
    }).catch(err => {
      alert("글 작성 중 오류가 발생했습니다.");
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
