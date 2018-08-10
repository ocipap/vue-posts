import constant from '../../constant'
import CONFIG from '../../config'
import router from '@/router'
import axios from 'axios'
const state = {
  isLogin: false
}

const getters = {
  isLogin: state => state.isLogin
}

const mutations = {
  [constant.SET_LOGIN_STATUS](state, payload) {
    state.isLogin = payload.isLogin
  }
}

const actions = {
  signin(store, payload) {
    if (!store.getters.isLogin) {
      let signin = JSON.stringify(payload)
      this._vm.$http.post(CONFIG.SINGIN, signin, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if (res.status === 200) {
          this._vm.$cookie.setCookie('infranics', res.headers['infranics']);
          store.commit(constant.SET_LOGIN_STATUS, {
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
  logout(store, payload) {
    if (getters.isLogin) {
      this._vm.$cookie.deleteCookie("infranics");
      store.commit(constant.SET_LOGIN_STATUS, {
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
  userInfo(store, payload) {
    let jwt = this._vm.$cookie.getCookie("infranics");
    if (jwt !== '') {
      this._vm.$http.get(CONFIG.USER_AUTH, {
        headers: {
          "infranics": jwt
        }
      }).then(res => {
        if (res.status === 200) {
          store.commit(constant.SET_LOGIN_STATUS, {
            isLogin: true
          });
          payload(true);
        }

      }).catch(err => {
        alert("로그인이 필요한 페이지 입니다.")
        store.commit(constant.SET_LOGIN_STATUS, {
          isLogin: false
        });
        payload(false);
      })
    } else {
      store.commit(constant.SET_LOGIN_STATUS, {
        isLogin: false
      });
      payload(false)
    }
  },
  signup(store, payload) {
    let user = JSON.stringify(payload);
    this._vm.$http.post(CONFIG.SINGUP, user, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status === 200) {
        alert("회원가입에 성공하였습니다.");
        store.dispatch('signin', {
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

export default {
  state,
  getters,
  actions,
  mutations
}
