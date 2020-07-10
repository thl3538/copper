<template>
  <table id="list">
    <tr>
      <td colspan="2">{{modal.title}}</td>
    </tr>
    <tr>
      <td>{{modal.firstRow[0]}}</td>
      <td>{{modal.firstRow[1]}}</td>
    </tr>
    <tr>
      <td>{{modal.firstRow[0]}}</td>
      <td>{{modal.firstRow[1]}}</td>
    </tr>
    <tr>
      <td>{{modal.firstRow[0]}}</td>
      <td>{{modal.firstRow[1]}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "tableCard",
  props: {
    modal: Object
  },
  data() {
      return{
          
      }
  }
};
</script>

<style scoped>
#list {
  width: 300px;
  border-collapse: collapse;
  font-size: 12px;
  margin: 0 10px;
  color: #00E3FE;
}

#list td,
#list th {
  font-size: 1em;
  border: 1px solid #00E3FE;
  padding: 0 10px;
  text-align: center;
}
</style>
