import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import WithRender from './template.html?style=./style.styl';

@WithRender
@Component({
})

export default class HelloWorld extends Vue {
  @Prop()
  message: String
}
