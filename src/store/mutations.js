import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    // 在模型里加checked属性
    payload.checked = true
    state.cartList.push(payload)
  }
}
