export const replaceMixins = {
  data () {},
  methods: {
    // 过滤特殊字符
    replaceStr (name, event) {
      let arr = name.split('.')
      if (arr[2]) {
        this[arr[0]][arr[1]][arr[2]] = event.target.value.replace(/[><) (]/g, '')
      } else {
        this[arr[0]][arr[1]] = event.target.value.replace(/[><) (]/g, '')
      }
    },
    // 只能输入数字
    replaceNum (name, event) {
      let arr = name.split('.')
      if (arr[2]) {
        this[arr[0]][arr[1]][arr[2]] = event.target.value.replace(/\D/g, '')
      } else {
        this[arr[0]][arr[1]] = event.target.value.replace(/\D/g, '')
      }
    },
    // 只能输入电话  手机--座机
    replacePhone (name, event) {
      let arr = name.split('.')
      if (arr[2]) {
        // eslint-disable-next-line
        this[arr[0]][arr[1]][arr[2]] = event.target.value.replace(/[^\d\-]/g, '')
      } else {
        // eslint-disable-next-line
        this[arr[0]][arr[1]] = event.target.value.replace(/[^\d\-]/g, '')
      }
    }
  }
}
