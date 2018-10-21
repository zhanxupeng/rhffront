<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>
      <span>{{userName}} </span>
      <span>{{password}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName:'',
      password:''
    }
  },
  mounted(){
    let that=this
    that.API.userLogin.getInfo().then(res =>{
      if(res.code ==='0'){
        let data=res.data
        that.userName=data.userName
        that.password=data.password
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
