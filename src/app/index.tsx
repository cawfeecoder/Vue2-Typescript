import Vue from 'vue';
import HelloWorld from '../hello-world/index'
import { Component, Inject } from 'vue-property-decorator';
import WithRender from './template.html?style=./style.styl';

@WithRender
@Component({
    components: { HelloWorld }
})

export default class App extends Vue {
  @Inject()
  message: string = "Hello, World!"
}
