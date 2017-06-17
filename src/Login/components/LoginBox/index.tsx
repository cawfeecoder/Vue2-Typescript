import Vue from 'vue';
import { Component, Provide, Prop } from 'vue-property-decorator';
import WithRender from './template.html?style=./style.styl';

@WithRender
@Component({
})

export default class LoginPage extends Vue {
  @Prop()
  userLogin: Function

  @Provide()
  userBoxActive: Boolean = false

  @Provide()
  passwordBoxActive: Boolean = false

  @Provide()
  loginPending: Boolean = false

  @Provide()
  user: any = false

  inputFocus(box: String): void {
    console.log("Input event");
        box == 'username' ? this.userBoxActive = true : this.passwordBoxActive = true
  }

  inputBlur(box: String): void {
        console.log("Blur event");
        box == 'username' ? this.userBoxActive = false : this.passwordBoxActive = false
  }

  logIn(): void {
    this.loginPending = !this.loginPending;
    setTimeout(() => {
      this.user = "John"
      this.loginPending = false
    }, 5000)
  }

}
