
<template>
  <div id="app">
    <img height="100px" width="100px" src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <p>Выберите период и загрузите календарь</p>
    <datepicker v-model="dateStart" placeholder="Выберите начало периода" wrapper-class="datepicker"></datepicker>
    <datepicker v-model="dateEnd" placeholder="Выберите конец периода" wrapper-class="datepicker"></datepicker>
    <button v-on:click="mounted()">Загрузить календарь</button>
    <el-table :data="tableData">
      <el-table-column prop="Week" label="Номер недели">
      </el-table-column>
      <el-table-column prop="Monday" label="Понедельник">
      </el-table-column>
      <el-table-column prop="Tuesday" label="Вторник">
      </el-table-column>
      <el-table-column prop="Wednesday" label="Среда">
      </el-table-column>
      <el-table-column prop="Thursday" label="Четверг">
      </el-table-column>
      <el-table-column prop="Friday" label="Пятница">
      </el-table-column>
      <el-table-column prop="Saturday" label="Суббота">
      </el-table-column>
      <el-table-column prop="Sunday" label="Воскресенье">
      </el-table-column>
    </el-table>
  </div>



</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      message: '1',
      msg: 'Тестовый сайт для задачи с календарем',
      dateStart: '',
      dateEnd: '',
      tableData: [{}]
    }
  },
  methods: {
    formatDate: function (date) {
      const dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      return dateStr
    }, 
    mounted: function () {
      if(!this.dateStart || !this.dateEnd) {
        alert('Не заполнен период')
        return
      }
      if(this.dateStart > this.dateEnd) {
        alert('Дата начала периода не может быть позже даты конца периода')
        return
      }
      console.log(this.dateStart.getDay()+'-'+this.dateStart.getMonth()+'-'+this.dateStart.getFullYear())
      const start = this.formatDate(this.dateStart)
      const end = this.formatDate(this.dateEnd)
      this.$axios.post(
        "http://localhost:3333/calendar", 
        {startDate: start, endDate: end},
        { headers: { } }
        )
        .then(response => {
          console.log(response.data.response)
          this.tableData = response.data.response
        });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.datepicker {
  display: flex;
  justify-content: center;
  margin: 10px;
}

button {
  margin: 10px;
}

</style>
