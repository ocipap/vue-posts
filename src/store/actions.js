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
    let fd = new FormData();
    fd.append("postIndex", payload.postIndex);
    fd.append("content", payload.content);
    api.addPostReply(postIndex, fd, jwt).then(res => {
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
    let fd = new FormData();
    fd.append("type", payload.type);
    fd.append("title", payload.title);
    fd.append("content", payload.content);
    console.log(payload.files);
    for (let i = 0; i < payload.files.length; i++) {
      let file = payload.files[i];
      fd.append('files', file);
    }
    api.addPost(fd, jwt).then(res => {
      if (res.status === 200) {
        store.dispatch(CONSTANT.LOAD_POSTS);
        alert("게시물 작성에 성공하였습니다.");
        router.push({
          name: 'Board'
        });
      }
    }).catch(err => {
      alert("글 작성 중 오류가 발생했습니다.");
    })
  },
  [CONSTANT.SIGN_IN](store, payload) {
    if (!store.getters.isLogin) {
      let fd = new FormData();
      fd.append('identification', payload.identification);
      fd.append('password', payload.password);
      api.signIn(fd).then(res => {
        if (res.status === 200) {
          this._vm.$cookie.setCookie('infranics', res.data);
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
    if (store.getters.isLogin) {
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
    let fd = new FormData();
    fd.append("identification", payload.identification);
    fd.append("password", payload.password);
    fd.append("name", payload.name);
    api.signUp(fd).then(res => {
      if (res.status === 200) {
        alert("회원가입에 성공하였습니다.");
        store.dispatch(CONSTANT.SIGN_IN, {
          identification: payload.identification,
          password: payload.password
        })
      }
    }).catch(err => {
      console.log(err);
      alert("회원가입에 실패하였습니다.");
      return;
    })
  },
  /*[CONSTANT.GET_FILE](store, payload){
    let postIndex = payload.postIndex;
    let fileIndex = payload.fileIndex;
    let jwt = this._vm.$cookie.getCookie("infranics");
    api.getFile(postIndex, fileIndex, jwt).then(res => {
      let url = window.URL.createObjectURL(new Blob([res.data]));
      console.log(url);
      return url;
    }).catch(err => {
      console.log(err);
      alert("파일 다운에 실패하였습니다.");
    })
  }*/
}
