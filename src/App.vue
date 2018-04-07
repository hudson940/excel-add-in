<template>
  <div id="app">
    <div id="content">
      <div id="content-header">
        <div class="padding">
          <h1>Complemento</h1>
        </div>
      </div>
      <div id="content-main">
        <div class="padding">
          <p>Seleccione un rago </p>
          <br/>
          <h3>Enviar</h3>

          <button @click="getValues">Obtener valores</button>

          <button @click="onSetColor">cambiar color</button>
          <button @click="test">click</button>

        </div>
      </div>

      <table>
        <td v-for="(range, index) in range" :key="index">{{range}}</td>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      range: {},
      test: []
    };
  },
  methods: {
    onSetColor() {
      window.Excel.run(async context => {
        this.range = context.workbook.getSelectedRange();
        this.range.format.fill.color = 'green';

        await context.sync();
      });
    },
    test() {
      console.log(this.test, this.range);
    },
    send() {
      let n = [];
      window.Excel.run(async context => {
        this.range.push(context.workbook.getSelectedRange());
        await context.sync();
      });
    },
    getValues(args) {
      let self = this;
      let range
      window.Excel.run(async context => {
        let sheet = context.workbook.worksheets.getItem('Hoja1');
        //let range = sheet.getRange('B2:E6');
        range = context.workbook.getSelectedRange();
        range.load('values');

        return context.sync().then(function() {
          Object.assign(self.range,JSON.stringify(range.values, null, 4));
          console.log(self.range);
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style>
#content-header {
  background: #2a8dd4;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  overflow: hidden;
}

#content-main {
  background: #fff;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}

.padding {
  padding: 15px;
}
</style>