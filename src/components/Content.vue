<template>
  <div class="Content">

    <div class="header holder">
      <div class="container row between-xs middle-xs">
        <div class="col-xs start-xs">
          <h1 class="pageTitle">Vitta To-Do</h1>
        </div>
        <div class="col-xs end-xs">
          <md-button class="gBtn md-raised md-primary"
            @click.native="openDialog('dialogNewTask')">
            <span class="callNewTask md-hide-xsmall">Criar tarefa</span>
            <md-icon class="">date_range</md-icon>
          </md-button>
        </div>
      </div>

      <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialogNewTask">
        <md-dialog-title>Nova Tarefa</md-dialog-title>

        <md-dialog-content>
          <form>
            <md-input-container>
              <label>Descrição</label>
              <md-textarea required v-model="newTask.desc"></md-textarea>
            </md-input-container>
            <md-input-container>
              <label>Adicionar Tag</label>
              <md-input required v-model="newTask.tag"></md-input>
            </md-input-container>
            <!-- <datepicker lang="pt-br" format="DD/MM/YYYY"></datepicker> -->
            <!-- <datepicker format="DD/MM/YYYY"></datepicker> -->
            <!-- <date-picker :date="date" :limit="limit"></date-picker> -->
            <input required type="date" v-model="newTask.date" />
          </form>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary"
            @click.native="closeDialog('dialogNewTask')"
          >Cancelar<span class="md-hide-xsmall"> criação</span></md-button>
          <md-button md-theme="green" class="md-raised gBtn md-primary"
            @click.native="saveTask()"
          >Criar evento</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <div class="nav holder">
      <div class="container row between-xs middle-xs">
        <md-button class="md-raised md-primary">
          <md-icon class="">chevron_left</md-icon>
        </md-button>
        <h2 class="selectedDate only-mob">
          {{ selectedDateSmall }}
        </h2>
        <h2 class="selectedDate md-hide-xsmall">
          {{ selectedDate }}
        </h2>
        <md-button class="md-raised md-primary">
          <md-icon class="">chevron_right</md-icon>
        </md-button>
      </div>
    </div>

    <div class="body holder">
      <div class="container row between-xs">
        <div v-if="(tags.length > 0)" class="filter col-xs-12">
          <md-input-container class="col-xs-12 col-sm-4 col-md-3">
              <label for="tagFilter">Filtro por tag</label>
              <md-select name="tagFilter" id="tagFilter"
                v-model="tagFilter"
              >
                <md-option value=""></md-option>
                <md-option
                  v-for="tag in tags"
                  v-bind:value="tag"
                >#{{tag}}</md-option>
              </md-select>
            </md-input-container>
        </div>

        <md-whiteframe class="task col-xs-12"
          v-for="(task, index) in filterByTag(tasks)"
          v-bind:class="{ done: task.done }"
          @click.native="checkTask(task)">
          <div class="row between-xs middle-xs">
            <div class="data col-xs-8 col-sm-8 start-xs middle-xs">
              <span class="checkTask">
                <i class="material-icons icon">done</i>
              </span>
              <p class="descriptionTask">{{task.desc}}</p>
            </div>
            <div class="date col-xs-4 col-sm-4 end-xs middle-xs">
              <span class="label md-hide-xsmall">Vencimento:</span>
              <md-button class="value md-raised md-primary">
                {{friendlyDay(task.date)}}
              </md-button>
            </div>
          </div>
        </md-whiteframe>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import storeTasks from '../utils/storeTasks';
import storeTags from '../utils/storeTags';

moment.locale('pt-br');

export default {
  name: 'content',
  data() {
    return {
      selectedDateSmall: moment(new Date()).format('DD[/]MM[/]YYYY'),
      selectedDate: moment(new Date()).format('dddd, DD [de] MMMM [de] YYYY'),
      newTask: { done: false },
      tags: storeTags.get(),
      tasks: storeTasks.get(),
      allTasks: storeTasks.get(),
      tagFilter: '',
    };
  },
  methods: {
    filterByTag(array) {
      if (!this.tagFilter) return array;
      console.log(this.tagFilter);
      return array.filter(item =>
        item.tag.toLowerCase() === this.tagFilter.toLowerCase()
      );
    },
    friendlyDay(date) {
      const doDate = moment(new Date(date));
      if (doDate.format('DD') === moment(new Date()).format('DD')) return 'Hoje';
      if (doDate.format('DD') === moment(new Date()).add(1, 'days').format('DD')) return 'Amanhã';
      if (doDate.format('DD') === moment(new Date()).subtract(1, 'days').format('DD')) return 'Ontem';
      return doDate.format('DD[/]MM[/]YYYY');
    },
    openDialog(ref) {
      this.$refs[ref].open();
      console.log(this.tasks);
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    checkTask(item) {
      const task = item;
      this.newTask.updated = moment(new Date());

      task.done = !task.done;
      storeTasks.save(this.tasks);
    },
    saveTask() {
      this.newTask.created = moment(new Date());
      this.tasks.push(this.newTask);
      storeTasks.save(this.tasks);
      this.tags = storeTags.save(this.newTask.tag);
      this.closeDialog('dialogNewTask');
      this.newTask = this.clearTask();
    },
    clearTask() {
      return {
        desc: '',
        tag: '',
        date: '',
        done: false,
        updated: null,
      };
    },
    removeAllTasks() {
      storeTasks.remove();
      storeTags.remove();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}

.md-button.md-raised {
  min-width: 38px;
  padding: 0 8px;
}

.holder > .container {
  margin: 0 15px;
}

.header {
  padding: 8px 0;
  background-color: #2478ae;
}

.gBtn {
  background-color: rgb(39, 212, 158) !important;
  color: #fff;
}

.header .col-xs {
  padding: 0;
}

.header .md-button {
  margin-right: 0;
}

.callNewTask{
  font-size: 0.9em;
  text-transform: none;
  font-weight: 600;
}

.pageTitle {
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  font-size: 1.2em;
  font-weight: 700;
}

.nav {
  padding: 8px 0;
  background-color: rgb(234, 235, 238);
}

.selectedDate {
  font-size: 1.1em;
  font-weight: normal;
  color: rgb(118, 121, 138);
}

.nav .md-button {
  margin: 6px 0;
  background-color: #fff !important;
  color: rgb(118, 121, 138) !important;
}

.body {
  padding: calc(10px + 3%) 0;
}

.task {
  margin-bottom: 20px;
}

.checkTask {
  box-sizing: border-box;
  padding: 2px;
  vertical-align: middle;
  background-color: rgb(216, 216, 216);
  border-radius: 50%;
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 3.5%;
}

.checkTask .icon {
  color: #fff;
  font-size: 16px;
  display: none;
}

.done {
  background-color: rgb(231, 253, 246);
}

.done .checkTask {
  background-color: rgb(39, 212, 158);
}

.done .checkTask .icon {
  display: inline-block;;
}

.descriptionTask {
  color: rgb(118, 121, 138);
  display: inline-block;
  font-size: 14px;
  padding-left: 36px;
}

.task .data {
  box-sizing: border-box;
  font-size: 0;
  position: relative;
}

.task .date{
  position: relative;
}

.task .date .label {
  vertical-align: middle;
  color: rgb(118, 121, 138);
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 125px;
}

.date .md-button {
  min-width: 90px;
  text-transform: none;
  background-color: rgb(247, 96, 96) !important;
}

@media (min-width: 600px) {
  .only-mob {
    display: none;
  }

  .holder > .container {
    margin: auto;
  }
}
@media (max-width: 600px) {
  .task div.data {
    padding: 0;
  }
  .checkTask{
    margin: 0 6px;
  }
  .task div.date {
    padding: 0;
  }
  .descriptionTask {
    padding-left: 40px;
  }
  .date .md-button {
    margin-left: -10px;
  }
}
</style>
