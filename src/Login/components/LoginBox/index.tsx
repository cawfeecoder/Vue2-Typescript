import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import WithRender from './template.html?style=./style.styl';

@WithRender
@Component({
})

export default class LoginPage extends Vue {
  @Prop()
  userLogin: Function
}
