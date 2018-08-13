import CONSTANT from '../constant'
import api from '../api/api'
import router from '../router'

export default {
  [CONSTANT.LOAD_POSTS](store, payload) {
    api.loadPostList().then(res => {
      if (res.status === 200) {
        store.commit(CONSTANT.LOAD_POSTS, res.data);
      }
    }).catch(err => {
      alert("정보를 받아오던 중 오류가 발생했습니다.");
    })
  },
  [CONSTANT.LOAD_POST_ONE](store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    let postIndex = payload.postIndex;
    api.loadPostInfo(postIndex, jwt).then(res => {
      if (res.status === 200) {
        store.commit(CONSTANT.LOAD_POST_ONE, res.data);
        store.commit(CONSTANT.LOAD_REPLYS, res.data.replies);
      }
    }).catch(err => {
      alert("정보를 받아오던 중 오류가 발생했습니다.");
    })
  },
  [CONSTANT.WRITE_REPLY](store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    let postIndex = payload.postIndex;
    let reply = JSON.stringify(payload);
    api.addPostReply(postIndex, reply, jwt).then(res => {
      if (res.status === 200) {
        alert("댓글 작성에 성공하였습니다.")
        store.dispatch(CONSTANT.LOAD_POST_ONE, {
          postIndex
        });
        router.push({
          name: 'Show',
          params: {
            id: postIndex
          }
        });
      }
    }).catch(err => {
      alert("댓글 작성 중 오류가 발생했습니다.");
    })
  },
  [CONSTANT.WRITE_POST](store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    let post = JSON.stringify(payload);
    api.addPost(post, jwt).then(res => {
      if (res.status === 200) {
        alert("게시물 작성에 성공하였습니다.");
        router.push({
          name: 'Board'
        });
      }
    }).catch(err => {
      alert("글 작성 중 오류가 발생했습니다.");
    })
  },
  [CONSTANT.SING_IN](store, payload) {
    if (!store.getters.isLogin) {
      let signin = JSON.stringify(payload)
      api.signIn(signin).then(res => {
        if (res.status === 200) {
          this._vm.$cookie.setCookie('infranics', res.headers['infranics']);
          store.commit(CONSTANT.SET_LOGIN_STATUS, {
            isLogin: true
          });
          router.push({
            name: 'Board'
          });
        }
      }).catch(err => {
        alert("로그인에 실패하였습니다.");
        router.push({
          name: 'Login'
        });
      })
    }
  },
  [CONSTANT.LOGOUT](store, payload) {
    if (getters.isLogin) {
      this._vm.$cookie.deleteCookie("infranics");
      store.commit(CONSTANT.SET_LOGIN_STATUS, {
        isLogin: false
      });
      alert("로그아웃에 성공하였습니다.");
      router.push({
        name: 'Board'
      });
    } else {
      alert('로그아웃에 실패하였습니다.');
    }
  },
  [CONSTANT.TOKEN_CHECK](store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    if (jwt !== '') {
      api.userInfo(jwt).then(res => {
        if (res.status === 200) {
          store.commit(CONSTANT.SET_LOGIN_STATUS, {
            isLogin: true
          });
          payload(true);
        }
      }).catch(err => {
        store.commit(CONSTANT.SET_LOGIN_STATUS, {
          isLogin: false
        });
        payload(false);
      })
    } else {
      store.commit(CONSTANT.SET_LOGIN_STATUS, {
        isLogin: false
      });
      payload(false)
    }
  },
  [CONSTANT.GET_USER_INFO](store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    if (jwt !== '') {
      api.userInfo(jwt).then(res => {
        if (res.status === 200) {
          store.commit(CONSTANT.SET_LOGIN_STATUS, {
            isLogin: true
          });
        }

      }).catch(err => {
        store.commit(CONSTANT.SET_LOGIN_STATUS, {
          isLogin: false
        });
      })
    } else {
      store.commit(CONSTANT.SET_LOGIN_STATUS, {
        isLogin: false
      });
    }
  },
  [CONSTANT.SIGN_UP](store, payload) {
    let signUp = JSON.stringify(payload);
    api.signUp(signUp).then(res => {
      if (res.status === 200) {
        alert("회원가입에 성공하였습니다.");
        store.dispatch(CONSTANT.SIGN_UP, {
          identification: payload.identification,
          password: payload.password
        });
      }
    }).catch(err => {
      alert("회원가입에 실패하였습니다.");
      return;
    })
  }
}